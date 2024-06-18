/* eslint-disable max-len */
import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'

import '../lib/styled-map.js'

const main: Meta = {
  title: 'Layers/ol-layer-geojson',
  component: 'ol-layer-geojson',
  tags: ['autodocs'],
}

export default main

/**
 * This demo is quite verbose, hence it was moved to its own element. You can check out its source [here](https://github.com/openlayers-elements/openlayers-elements/blob/master/storybook/lib/styled-map.ts).
 *
 * It replicates the original [demo from OpenLayers docs](https://openlayers.org/en/latest/examples/canvas-gradient-pattern.html)
 *
 * Bottom line, the <code>featureStyle</code> property of a vector layer is used to control the styling of individual
 * features by providing a Style object or a function which returns it.
 */
export const Basic: Story = {
  render: () => html`<styled-map></styled-map>`,
}
