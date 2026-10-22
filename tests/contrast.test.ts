import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { defaultDarkTheme, defaultLightTheme } from '../src/components/Themes/defaultTheme';
import { palettes } from '../src/components/Themes/palettes';
import type { ColorMode, ThemeColors } from '../src/components/Themes/types';

type SemanticColor = Exclude<keyof ThemeColors, 'chart'>;

const SEMANTIC_PAIRS = [
  ['foreground', 'background'],
  ['cardForeground', 'card'],
  ['popoverForeground', 'popover'],
  ['primaryForeground', 'primary'],
  ['secondaryForeground', 'secondary'],
  ['mutedForeground', 'muted'],
  ['accentForeground', 'accent'],
  ['destructiveForeground', 'destructive'],
  ['warningForeground', 'warning'],
  ['successForeground', 'success'],
  ['infoForeground', 'info'],
  ['neutralForeground', 'neutral'],
] as const satisfies ReadonlyArray<readonly [SemanticColor, SemanticColor]>;

const CSS_VARIABLES: Record<SemanticColor, string> = {
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  cardForeground: '--card-foreground',
  popover: '--popover',
  popoverForeground: '--popover-foreground',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  accent: '--accent',
  accentForeground: '--accent-foreground',
  destructive: '--destructive',
  destructiveForeground: '--destructive-foreground',
  warning: '--warning',
  warningForeground: '--warning-foreground',
  success: '--success',
  successForeground: '--success-foreground',
  info: '--info',
  infoForeground: '--info-foreground',
  neutral: '--neutral',
  neutralForeground: '--neutral-foreground',
  border: '--border',
  input: '--input',
  ring: '--ring',
};

const normalizeHsl = (value: string) =>
  value
    .replace(/^hsl\((.*)\)$/, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const parseHsl = (value: string): [number, number, number] => {
  const match = value.match(/(?:hsl\()?\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)?$/);
  if (!match) {
    throw new Error(`Unsupported HSL color: ${value}`);
  }

  return [Number(match[1]), Number(match[2]) / 100, Number(match[3]) / 100];
};

const toRgb = (value: string): [number, number, number] => {
  const [hue, saturation, lightness] = parseHsl(value);
  const normalizedHue = ((hue % 360) + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs((normalizedHue % 2) - 1));
  const offset = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (normalizedHue < 1) {
    [red, green, blue] = [chroma, x, 0];
  } else if (normalizedHue < 2) {
    [red, green, blue] = [x, chroma, 0];
  } else if (normalizedHue < 3) {
    [red, green, blue] = [0, chroma, x];
  } else if (normalizedHue < 4) {
    [red, green, blue] = [0, x, chroma];
  } else if (normalizedHue < 5) {
    [red, green, blue] = [x, 0, chroma];
  } else {
    [red, green, blue] = [chroma, 0, x];
  }

  return [red + offset, green + offset, blue + offset];
};

const relativeLuminance = (value: string): number => {
  const [red, green, blue] = toRgb(value).map(channel =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground: string, background: string): number => {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
};

const findContrastFailures = (
  label: string,
  colors: ThemeColors,
  pairs: ReadonlyArray<readonly [SemanticColor, SemanticColor]> = SEMANTIC_PAIRS
): string[] => {
  const failures: string[] = [];

  for (const [foregroundKey, backgroundKey] of pairs) {
    const ratio = contrastRatio(colors[foregroundKey], colors[backgroundKey]);

    if (ratio < 4.5) {
      failures.push(
        `${label}: ${foregroundKey} on ${backgroundKey} is ${ratio.toFixed(2)}:1 (${colors[foregroundKey]} on ${colors[backgroundKey]})`
      );
    }
  }

  return failures;
};

const css = readFileSync('src/index.css', 'utf8');

const parseCssVariables = (body: string): Record<string, string> => {
  const variables: Record<string, string> = {};

  for (const match of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    variables[`--${match[1]}`] = match[2].trim();
  }

  return variables;
};

const readCssBlock = (selector: string): Record<string, string> => {
  const selectorIndex = css.indexOf(selector);
  if (selectorIndex === -1) {
    return {};
  }

  const openBraceIndex = css.indexOf('{', selectorIndex);
  const closeBraceIndex = css.indexOf('}', openBraceIndex);

  return parseCssVariables(css.slice(openBraceIndex + 1, closeBraceIndex));
};

const cssBlocks: Record<string, Record<string, string>> = {
  'neutral.light': readCssBlock(':root'),
  'neutral.dark': readCssBlock('.dark'),
};

for (const paletteName of Object.keys(palettes)) {
  if (paletteName === 'neutral') {
    continue;
  }

  cssBlocks[`${paletteName}.light`] = readCssBlock(`.theme-${paletteName}`);
  cssBlocks[`${paletteName}.dark`] = readCssBlock(`.dark .theme-${paletteName}`);
}

describe('Theme contrast', () => {
  it.each(Object.entries(palettes))('%s meets WCAG AA in both modes', (_name, palette) => {
    const failures = (['light', 'dark'] as ColorMode[]).flatMap(mode =>
      findContrastFailures(`${palette.name}.${mode}`, palette.colors[mode])
    );

    expect(failures).toEqual([]);
  });

  it('default themes meet WCAG AA in both modes', () => {
    const failures = [
      ...findContrastFailures('default.light', defaultLightTheme.colors),
      ...findContrastFailures('default.dark', defaultDarkTheme.colors),
    ];

    expect(failures).toEqual([]);
  });

  it('CSS palette blocks meet WCAG AA in both modes', () => {
    const failures: string[] = [];

    for (const [label, block] of Object.entries(cssBlocks)) {
      for (const [foregroundKey, backgroundKey] of SEMANTIC_PAIRS) {
        const foreground = block[CSS_VARIABLES[foregroundKey]];
        const background = block[CSS_VARIABLES[backgroundKey]];

        if (!foreground || !background) {
          failures.push(`${label}: missing ${foregroundKey} or ${backgroundKey}`);
          continue;
        }

        const ratio = contrastRatio(foreground, background);

        if (ratio < 4.5) {
          failures.push(
            `${label}: ${foregroundKey} on ${backgroundKey} is ${ratio.toFixed(2)}:1`
          );
        }
      }
    }

    expect(failures).toEqual([]);
  });
});

describe('Theme CSS parity', () => {
  it.each(Object.entries(palettes))('%s CSS tokens match the palette source', (name, palette) => {
    const failures: string[] = [];

    for (const mode of ['light', 'dark'] as ColorMode[]) {
      const block = cssBlocks[`${name}.${mode}`];

      expect(block).toBeDefined();

      for (const [token, variable] of Object.entries(CSS_VARIABLES)) {
        const expected = normalizeHsl(palette.colors[mode][token as SemanticColor]);
        const actual = normalizeHsl(block[variable] ?? '');

        if (expected !== actual) {
          failures.push(`${name}.${mode} ${variable}: expected ${expected}, received ${actual}`);
        }
      }
    }

    expect(failures).toEqual([]);
  });

  it('default CSS tokens match the default themes', () => {
    const failures: string[] = [];
    const defaults = {
      light: defaultLightTheme.colors,
      dark: defaultDarkTheme.colors,
    } as const;

    for (const mode of ['light', 'dark'] as ColorMode[]) {
      const block = cssBlocks[`neutral.${mode}`];

      for (const [token, variable] of Object.entries(CSS_VARIABLES)) {
        const expected = normalizeHsl(defaults[mode][token as SemanticColor]);
        const actual = normalizeHsl(block[variable] ?? '');

        if (expected !== actual) {
          failures.push(`${mode} ${variable}: expected ${expected}, received ${actual}`);
        }
      }
    }

    expect(failures).toEqual([]);
  });
});
