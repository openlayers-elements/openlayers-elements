import { setCustomElementsManifest, Preview } from '@storybook/web-components'
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
      // story: { inline: false },
    }
  },

  tags: ['autodocs']
}

export default preview
