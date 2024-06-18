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

/**
 * For other layers you can check [OSM wiki](https://wiki.openstreetmap.org/wiki/Raster_tile_providers).
 *
 * (Note the different style of interpolating x/y/z parameters)
 */
export const Basic: Story = {
  name: 'Stadia Map overlayed with horse riding routes',
  args: {
    layer1: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
    layer2: 'https://tile.waymarkedtrails.org/riding/{z}/{x}/{y}.png',
  },
  render: ({ layer1, layer2 }) => html`
<ol-map zoom="6" lat="46.7985" lon="8.2318">
  <ol-layer-xyz url="${layer1}"></ol-layer-xyz>
  <ol-layer-xyz url="${layer2}"></ol-layer-xyz>
</ol-map>`,
}
