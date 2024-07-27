import type { Preview } from '@storybook/vue3';
import './index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['*'],
      },
    },
  },
};

export default preview;
