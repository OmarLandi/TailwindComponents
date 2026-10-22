export type ColorMode = 'light' | 'dark';

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type PaletteName =
  | 'neutral'
  | 'stone'
  | 'zinc'
  | 'slate'
  | 'violet'
  | 'rose'
  | 'orange'
  | 'emerald'
  | 'blue'
  | 'red'
  | 'indigo'
  | 'amber'
  | 'cyan';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  warning: string;
  warningForeground: string;
  success: string;
  successForeground: string;
  info: string;
  infoForeground: string;
  neutral: string;
  neutralForeground: string;
  border: string;
  input: string;
  ring: string;
  chart: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
}

export interface ThemeTypography {
  fonts: {
    body: string;
    heading: string;
    monospace: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  letterSpacings: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export interface ThemeSpacing {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
}

export interface ThemeRadii {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTransition {
  duration: string;
  easing: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  transition: ThemeTransition;
  radius: string;
}

export interface ThemeContextValue {
  theme: Theme;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  setTheme: (theme: DeepPartial<Theme>) => void;
}

export interface ThemeProviderProps {
  colorMode?: ColorMode;
  defaultPalette?: PaletteName;
  defaultTheme?: DeepPartial<Theme>;
  children: React.ReactNode;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  applyToRoot?: boolean;
}
