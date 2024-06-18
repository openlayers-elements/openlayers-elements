import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-layer-xyz.js'

import './Map.css'

const main: Meta = {
  title: 'Layers/ol-layer-xyz',
  component: 'ol-layer-xyz',
  tags: ['autodocs'],
}

export default main

export const Basic: Story = {
  render: () => html`
<ol-map zoom="7" lat="46.7985" lon="8.2318">
  <ol-layer-xyz url="https://a.tile.openstreetmap.de/{z}/{x}/{y}.png "></ol-layer-xyz>
  <ol-layer-xyz url="https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png"></ol-layer-xyz>
</ol-map>`,
}
