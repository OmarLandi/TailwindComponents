import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, getPalette, getPaletteNames } from '../src/components/Themes';
import type { PaletteName } from '../src/components/Themes';

const meta: Meta = {
  title: 'Foundations/Palette',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Sistema de paletas de colores disponibles en la librería. Cada paleta define colores tanto para modo claro como oscuro.

## Available Paletas

| Palette | Description |
|---------|-------------|
| \`neutral\` | Classic neutral gray |
| \`stone\` | Warm earthy tones |
| \`zinc\` | Modern blue-gray |
| \`slate\` | Cool blue-gray |
| \`violet\` | Vibrant purple |
| \`rose\` | Elegant pink |
| \`orange\` | Energetic orange |
| \`emerald\` | Fresh green |
| \`blue\` | Professional blue |
| \`red\` | Intense red |
| \`indigo\` | Deep indigo |
| \`amber\` | Warm amber |
| \`cyan\` | Fresh cyan |

## Usage

\`\`\`tsx
import { ThemeProvider } from 'libreriacomponentes';

<ThemeProvider defaultPalette="violet">
  <App />
</ThemeProvider>
\`\`\`

## Programmatic access

\`\`\`tsx
import { getPalette, getPaletteNames } from 'libreriacomponentes';

const colors = getPalette('violet', 'light');
const allPalettes = getPaletteNames();
\`\`\``,
      },
    },
  },
  argTypes: {
    colorMode: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta.component>;

const PaletteSwatch = ({ name, color }: { name: string; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
    <div
      style={{
        width: '24px',
        height: '24px',
        backgroundColor: color,
        borderRadius: '4px',
        border: '1px solid #e5e7eb',
      }}
    />
    <div>
      <div style={{ fontSize: '11px', fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#6b7280' }}>{color}</div>
    </div>
  </div>
);

const PaletteCard = ({
  paletteName,
  colorMode = 'light',
}: {
  paletteName: string;
  colorMode?: 'light' | 'dark';
}) => {
  const colors = getPalette(paletteName as PaletteName, colorMode);

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '16px',
      }}
    >
      <h4 style={{ margin: '0 0 12px 0', textTransform: 'capitalize' }}>{paletteName}</h4>
      <PaletteSwatch name="Primary" color={colors.primary} />
      <PaletteSwatch name="Primary FG" color={colors.primaryForeground} />
      <PaletteSwatch name="Secondary" color={colors.secondary} />
      <PaletteSwatch name="Secondary FG" color={colors.secondaryForeground} />
      <PaletteSwatch name="Accent" color={colors.accent} />
      <PaletteSwatch name="Accent FG" color={colors.accentForeground} />
      <PaletteSwatch name="Destructive" color={colors.destructive} />
      <PaletteSwatch name="Background" color={colors.background} />
      <PaletteSwatch name="Foreground" color={colors.foreground} />
    </div>
  );
};

const AllPalettes = ({ colorMode }: { colorMode: 'light' | 'dark' }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
    }}
  >
    {getPaletteNames().map(paletteName => (
      <PaletteCard key={paletteName} paletteName={paletteName} colorMode={colorMode} />
    ))}
  </div>
);

export const Playground: Story = {
  args: {
    colorMode: 'light',
  },
  render: (args: { colorMode: 'light' | 'dark' }) => (
    <ThemeProvider colorMode={args.colorMode} storageKey="palette-storybook">
      <AllPalettes colorMode={args.colorMode} />
    </ThemeProvider>
  ),
};
