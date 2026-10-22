import * as React from 'react';
import type { ThemeProviderProps, ColorMode, ThemeContextValue, Theme, DeepPartial } from './types';
import { getTheme } from './defaultTheme';
import { getPalette } from './palettes';
import { PortalContainerProvider } from './PortalContainer';

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const mergeTheme = <T,>(base: T, override?: DeepPartial<T>): T => {
  if (!override) return base;
  if (!isRecord(base) || !isRecord(override)) return override as unknown as T;

  const result: UnknownRecord = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;
    const current = result[key];
    result[key] = isRecord(current) && isRecord(value) ? mergeTheme(current, value) : value;
  }

  return result as T;
};

const stripHsl = (value: string): string => {
  return value.replace(/^hsl\(([^)]+)\)$/, '$1').trim();
};

const getThemeVariables = (theme: Theme): Record<string, string> => {
  const variables: Record<string, string> = {};

  Object.entries(theme.colors).forEach(([key, value]) => {
    if (key === 'chart') {
      Object.entries(value).forEach(([chartKey, chartValue]) => {
        variables[`--chart-${chartKey}`] = stripHsl(String(chartValue));
      });
    } else {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      variables[`--${cssKey}`] = stripHsl(String(value));
    }
  });

  Object.entries(theme.typography.fonts).forEach(([key, value]) => {
    variables[`--font-${key}`] = value;
  });

  Object.entries(theme.typography.fontSizes).forEach(([key, value]) => {
    variables[`--text-${key}`] = value;
  });

  Object.entries(theme.typography.fontWeights).forEach(([key, value]) => {
    variables[`--font-weight-${key}`] = String(value);
  });

  Object.entries(theme.radii).forEach(([key, value]) => {
    variables[`--radius-${key}`] = value;
  });

  Object.entries(theme.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });

  variables['--radius'] = theme.radius;

  return variables;
};

const serializeThemeVariables = (variables: Record<string, string>): string =>
  Object.entries(variables)
    .map(([name, value]) => `${name}: ${value};`)
    .join(' ');

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  colorMode: initialColorMode = 'light',
  defaultPalette = 'neutral',
  defaultTheme: customTheme,
  children,
  storageKey = 'theme-color-mode',
  disableTransitionOnChange = false,
  applyToRoot = false,
}) => {
  const [colorMode, setColorModeState] = React.useState<ColorMode>(initialColorMode);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = typeof window !== 'undefined' ? window.localStorage?.getItem(storageKey) : null;
    if (stored === 'light' || stored === 'dark') {
      setColorModeState(stored);
    }
  }, [storageKey]);

  const [themeOverride, setThemeOverride] = React.useState<DeepPartial<Theme>>({});

  const theme: Theme = React.useMemo(() => {
    const mode = mounted ? colorMode : initialColorMode;
    const baseTheme = getTheme(mode);
    const paletteColors = getPalette(defaultPalette, mode);
    const themeWithPalette: Theme = { ...baseTheme, colors: paletteColors };
    return mergeTheme(mergeTheme(themeWithPalette, customTheme), themeOverride);
  }, [mounted, colorMode, defaultPalette, customTheme, themeOverride, initialColorMode]);

  React.useEffect(() => {
    const variables = getThemeVariables(theme);
    const selector = `.${colorMode}.theme-${defaultPalette}`;
    let styleEl = document.getElementById('theme-provider-style') as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-provider-style';
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `${selector} { ${serializeThemeVariables(variables)} }`;

    return () => {
      styleEl?.remove();
    };
  }, [theme, colorMode, defaultPalette]);

  React.useEffect(() => {
    if (!applyToRoot) return;

    const root = document.documentElement;
    const previousClassName = root.className;
    const previousStyle = root.getAttribute('style');
    const variables = getThemeVariables(theme);

    root.classList.remove('light', 'dark');
    Array.from(root.classList)
      .filter(className => className.startsWith('theme-'))
      .forEach(className => root.classList.remove(className));
    root.classList.add(colorMode, `theme-${defaultPalette}`);

    Object.entries(variables).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    return () => {
      root.className = previousClassName;
      if (previousStyle === null) {
        root.removeAttribute('style');
      } else {
        root.setAttribute('style', previousStyle);
      }
    };
  }, [applyToRoot, theme, colorMode, defaultPalette]);

  const setTheme = React.useCallback((newTheme: DeepPartial<Theme>) => {
    setThemeOverride(prev => mergeTheme(prev, newTheme));
  }, []);

  const setColorMode = React.useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      try {
        window.localStorage?.setItem(storageKey, mode);
      } catch {
        // localStorage not available
      }

      if (!disableTransitionOnChange) {
        const css = document.createElement('style');
        css.textContent = '*, *::before, *::after { transition: none !important; }';
        document.head.appendChild(css);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            css.remove();
          });
        });
      }
    },
    [storageKey, disableTransitionOnChange]
  );

  const toggleColorMode = React.useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorMode,
      setColorMode,
      toggleColorMode,
      setTheme,
    }),
    [theme, colorMode, setColorMode, toggleColorMode, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${colorMode} theme-${defaultPalette}`}>
        <PortalContainerProvider colorMode={colorMode} palette={defaultPalette}>
          {children}
        </PortalContainerProvider>
      </div>
    </ThemeContext.Provider>
  );
};
ThemeProvider.displayName = 'ThemeProvider';
