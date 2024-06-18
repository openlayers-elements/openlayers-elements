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

/**
 * Vector layers have a `fit` method which aligns the map view to show its entirety.
 */
export const ZoomToLayer: Story = {
  name: 'Zoom to entire layer',
  args: {
    zoom: 4,
    lat: 39.828175,
    lon: -98.5795,
  },
  render: args => html`
<style>
  ol-map {
    --zoom-control-top: 10px;
    --zoom-control-right: 10px;
  }
</style>

<ol-map ${spread(args)}>
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-layer-geojson url="/europe.geojson"></ol-layer-geojson>
  <ol-control id="zoom">
    <button onclick="goToEurope()">Go to Europe</button>
  </ol-control>
</ol-map>

<script>
  function goToEurope() {
    document.querySelector('ol-layer-geoJson').fit()
  }
</script>
  `,
}

/**
 * To zoom to a single feature you need a reference to the map element and pass the
 * geometry's extent. In this example the selected feature's shape is used.
 *
 * The `fit` method also accepts a second parameter which allows for customizing the behavior
 * using the [`FitOptions` object](https://openlayers.org/en/latest/apidoc/module-ol_View.html#~FitOptions)
 */
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
