import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '../src/components/Themes';
import type { ColorMode, PaletteName } from '../src/components/Themes';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff',
        },

        dark: {
          name: 'dark',
          value: '#1a1a1a',
        },
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
  },

  globalTypes: {
    colorMode: {
      name: 'Color Mode',
      description: 'Switch between light and dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        showName: true,
      },
    },
    palette: {
      name: 'Palette',
      description: 'Color palette for the theme',
      defaultValue: 'neutral',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'neutral', title: 'Neutral' },
          { value: 'stone', title: 'Stone' },
          { value: 'zinc', title: 'Zinc' },
          { value: 'slate', title: 'Slate' },
          { value: 'violet', title: 'Violet' },
          { value: 'rose', title: 'Rose' },
          { value: 'orange', title: 'Orange' },
          { value: 'emerald', title: 'Emerald' },
          { value: 'blue', title: 'Blue' },
          { value: 'red', title: 'Red' },
          { value: 'indigo', title: 'Indigo' },
          { value: 'amber', title: 'Amber' },
          { value: 'cyan', title: 'Cyan' },
        ],
        showName: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const colorMode = (context.globals.colorMode || 'light') as ColorMode;
      const palette = (context.globals.palette || 'neutral') as PaletteName;
      const isFullscreen = context.parameters.layout === 'fullscreen';

      return (
        <ThemeProvider colorMode={colorMode} defaultPalette={palette}>
          <div
            className={
              isFullscreen
                ? 'min-h-dvh bg-background text-foreground'
                : `${colorMode} min-h-screen bg-background p-4 text-foreground`
            }
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],

  initialGlobals: {
    viewport: {
      value: 'responsive',
      isRotated: false,
    },

    backgrounds: {
      value: 'light',
    },
  },
};

export default preview;
