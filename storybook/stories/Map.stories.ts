import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'
import { spread } from '@open-wc/lit-helpers'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-layer-openstreetmap.js'

import './Map.css'

const main: Meta = {
  title: 'ol-map',
  component: 'ol-map',
  tags: ['autodocs'],
  args: {
    lat: 46.7985,
    lon: 8.2318,
  },
  argTypes: {
    zoom: {
      control: 'number',
    },
  },
}

export default main

export const Basic: Story = {
  name: 'OpenStreetMap Layer',
  args: {
    zoom: 7,
  },
  render: args => html`
<ol-map ${spread(args)}>
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
</ol-map>`,
}

export const ZoomToExtent: Story = {
  name: 'Zooming to the extent of a feature',
  args: {
    zoom: 4,
    zoomDuration: 400,
  },
  render: ({ zoomDuration, ...args }) => html`
<ol-map ${spread(args)}>
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-layer-geojson
    url="/countries.geojson"
  ></ol-layer-geojson>
  <ol-select @feature-selected="${(e) => {
    e.target._map.fit(e.detail.feature.getGeometry().getExtent(), {
      duration: zoomDuration,
    })
  }}"></ol-select>
</ol-map>`,
  beforeEach: async () => {
    await import('@openlayers-elements/maps/ol-layer-geojson.js')
    await import('@openlayers-elements/maps/ol-select.js')
  },
}
