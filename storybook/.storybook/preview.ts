import { setCustomElementsManifest, Preview } from '@storybook/web-components'
import customElements from '../custom-elements.json'

setCustomElementsManifest(customElements)

const preview: Preview = {
  parameters: {
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
}

export default preview
