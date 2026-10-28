import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.tsx', '../stories/docs/*.mdx'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-mcp',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async config => {
    return {
      ...config,
      css: {
        postcss: './postcss.config.cjs',
      },
    };
  },
};

export default config;
