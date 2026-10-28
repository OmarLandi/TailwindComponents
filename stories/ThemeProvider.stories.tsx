import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider, useTheme } from '../src/components/Themes';
import { Button } from '../src/components/Button';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Utilities/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `The ThemeProvider is the central component for managing the application theme. It injects custom CSS variables and provides the theme context to all child components.

## Basic usage

\`\`\`tsx
import { ThemeProvider } from 'libreriacomponentes';

<ThemeProvider>
  <App />
</ThemeProvider>
\`\`\`

## With custom palette and color mode

\`\`\`tsx
<ThemeProvider defaultPalette="violet" colorMode="dark">
  <App />
</ThemeProvider>
\`\`\`

## Override specific theme values

\`\`\`tsx
<ThemeProvider
  defaultTheme={{ radius: '1rem' }}
>
  <App />
</ThemeProvider>
\`\`\`

## Available palettes

\`neutral\`, \`stone\`, \`zinc\`, \`slate\`, \`violet\`, \`rose\`, \`orange\`, \`emerald\`, \`blue\`, \`red\`, \`indigo\`, \`amber\`, \`cyan\`

## useTheme hook

\`\`\`tsx
const { theme, colorMode, setColorMode, toggleColorMode, setTheme } = useTheme();
\`\`\``,
      },
    },
  },
};

export default meta;

const ThemeDemo = () => {
  const themeContext = useTheme();
  const theme = themeContext?.theme;
  const colorMode = themeContext?.colorMode || 'light';

  if (!theme?.colors) {
    return <div>Loading...</div>;
  }

  const colors = theme.colors;

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: colors.background,
        color: colors.foreground,
        borderRadius: '8px',
        border: `1px solid ${colors.border}`,
      }}
    >
      <h3 style={{ marginTop: 0 }}>ThemeProvider Demo</h3>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Color Mode</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            size="sm"
            variant={colorMode === 'light' ? 'default' : 'outline'}
            onClick={() => themeContext?.setColorMode('light')}
          >
            Light
          </Button>
          <Button
            size="sm"
            variant={colorMode === 'dark' ? 'default' : 'outline'}
            onClick={() => themeContext?.setColorMode('dark')}
          >
            Dark
          </Button>
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          backgroundColor: colors.card,
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          marginBottom: '16px',
        }}
      >
        <h4 style={{ marginTop: 0, color: colors.cardForeground }}>Card Component</h4>
        <p style={{ color: colors.cardForeground }}>Example card content</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" variant="default">
            Primary
          </Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="destructive">
            Destructive
          </Button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {['primary', 'secondary', 'accent', 'destructive', 'warning', 'success', 'info'].map(
          (color: string) => (
            <div
              key={color}
              style={{
                padding: '12px',
                backgroundColor: (colors as unknown as Record<string, string>)[color],
                color:
                  (colors as unknown as Record<string, string>)[`${color}Foreground`] || '#fff',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '12px',
                textTransform: 'capitalize',
              }}
            >
              {color}
            </div>
          )
        )}
      </div>

      <div style={{ padding: '12px', backgroundColor: colors.muted, borderRadius: '6px' }}>
        <p style={{ margin: 0, color: colors.mutedForeground, fontSize: '14px' }}>
          Mode: <strong>{colorMode}</strong>
        </p>
      </div>
    </div>
  );
};

type Story = StoryObj<typeof ThemeProvider>;

const PlaygroundWrapper = ({
  colorMode,
  defaultPalette,
}: {
  colorMode?: 'light' | 'dark';
  defaultPalette?: string;
}) => (
  <ThemeProvider
    colorMode={colorMode}
    defaultPalette={defaultPalette as 'violet' | 'neutral'}
    storageKey="storybook-theme"
  >
    <ThemeDemo />
  </ThemeProvider>
);

export const Playground: Story = {
  args: {
    colorMode: 'light' as const,
    defaultPalette: 'violet' as const,
  },
  render: args => (
    <PlaygroundWrapper colorMode={args.colorMode} defaultPalette={args.defaultPalette} />
  ),
};
