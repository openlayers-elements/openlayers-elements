import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'
import { spread } from '@open-wc/lit-helpers'
import { styleMap } from 'lit/directives/style-map.js'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-control.js'
import '@openlayers-elements/maps/ol-layer-openstreetmap.js'

const defaults: Meta = {
  title: 'Core/ol-control',
  component: 'ol-control',
  tags: ['autodocs'],
  args: {
    lat: 46.7985,
    lon: 8.2318,
  },
}

export default defaults

export const Buttons: Story = {
  name: 'Adding buttons to the map',
  args: {
    zoom: 4,
    style: {
      ...defaults.args!.style,
      '--top-right-control-top': '10px',
      '--top-right-control-right': '10px',
      '--bottom-left-control-bottom': '10px',
      '--bottom-left-control-left': '10px',
    },
  },
  render: ({ style, ...args }) => html`
<ol-map ${spread(args)} style="${styleMap(style)}">
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-control id="top-right">
    <button>Top right button</button>
  </ol-control>
  <ol-control id="bottom-left">
    <button>Bottom left button</button>
  </ol-control>
</ol-map>`,
}

export const Styling: Story = {
  name: 'Styling controls from Light DOM',
  args: {
    zoom: 4,
    style: {
      ...defaults.args!.style,
      '--text-label-control-bottom': '10px',
      '--text-label-control-left': '10px',
    },
  },
  render: ({ style, ...args }) => html`
<style>
  #text-label {
    color: #95e62a;
    padding: 3px;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>

<ol-map ${spread(args)} style="${styleMap(style)}">
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-control id="text-label">
      Some static text
  </ol-control>
</ol-map>`,
}
