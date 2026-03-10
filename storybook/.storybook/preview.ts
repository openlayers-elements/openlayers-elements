import { setCustomElementsManifest, Preview } from '@storybook/web-components-vite'
import customElements from '../custom-elements.json'

setCustomElementsManifest(customElements)

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['ol-map']
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true
    }
  },

  tags: ['autodocs']
}

export default preview
