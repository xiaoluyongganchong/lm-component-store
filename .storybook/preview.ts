import type { Preview } from '@storybook/react-webpack5'
import '../src/styles/index.scss'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['00-欢迎页', 'Example', '*']
      }
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;