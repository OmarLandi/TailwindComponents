import type { Preview } from '@storybook/react';
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
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
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

      return (
        <ThemeProvider defaultColorMode={colorMode} defaultPalette={palette}>
          <div
            className={colorMode}
            style={{
              minHeight: '100vh',
              padding: '1rem',
              backgroundColor: colorMode === 'dark' ? '#1a1a1a' : '#ffffff',
              color: colorMode === 'dark' ? '#ffffff' : '#000000',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
