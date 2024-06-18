import type { Meta, StoryObj as Story } from '@storybook/web-components'
import { html } from 'lit'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/swisstopo/swisstopo-wmts.js'
import '@openlayers-elements/swisstopo/swisstopo-reprojected.js'
import '@openlayers-elements/maps/ol-layer-openstreetmap.js'
import '@openlayers-elements/core/ol-layer-vector.js'
import '@openlayers-elements/maps/ol-marker-icon.js'

import './Map.css'

const defaults: Meta = {
  title: 'Swisstopo/swisstopo',
  component: 'swisstopo-wmts',
  subcomponents: {
    'swisstopo-wmts': 'swisstopo-wmts',
    'swisstopo-reprojected': 'swisstopo-reprojected',
  },
  tags: ['autodocs'],
  argTypes: {
    projection: {
      control: 'select',
      options: ['EPSG:3857', 'EPSG:2056', 'EPSG:21781', 'EPSG:4326'],
    },
  },
}

export default defaults

export const Basic: Story = {
  name: 'Swiss topo with changed projection',
  args: {
    projection: 'EPSG:2056',
    bottomLayer: 'ch.swisstopo.pixelkarte-grau',
    topLayer: 'ch.bafu.neophyten-gestreiftes_suessgras',
  },
  render: ({ bottomLayer, topLayer, projection }) => html`
<ol-map lat="46.7985" lon="8.2318" zoom="9" projection="${projection}">
  <swisstopo-wmts layer-name="${bottomLayer}"></swisstopo-wmts>
  <swisstopo-wmts layer-name="${topLayer}" z-index="1"></swisstopo-wmts>
</ol-map>`,
}

export const AdjustedMarker: Story = {
  name: 'Marker icon with position adjusted to projection',
  args: {
    layer: 'ch.swisstopo.pixelkarte-grau',
  },
  render: ({ layer }) => html`
<ol-map zoom="8" lat="46.7985" lon="8.2318" projection="EPSG:2056">
  <swisstopo-wmts layer-name="${layer}"></swisstopo-wmts>
  <ol-layer-vector z-index="1">
    <ol-marker-icon id="Zurich"
                    src="/icon.png"
                    lat="47.3738" lon="8.5451"
                    anchor-y="46" anchor-y-units="pixels"></ol-marker-icon>
  </ol-layer-vector>
</ol-map>`,
}

export const OSM: Story = {
  name: 'Swiss topo mixed with OSM',
  args: {
    layer: 'ch.bafu.neophyten-gestreiftes_suessgras',
  },
  render: ({ layer, projection }) => html`
<ol-map zoom="11" lat="46.7985" lon="8.2318" projection="${projection}">
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <swisstopo-wmts layer-name="${layer}" z-index="1"></swisstopo-wmts>
</ol-map>`,
}

export const Mercator: Story = {
  name: 'Swiss topo in Mercator projection',
  args: {
    layer: 'ch.swisstopo.pixelkarte-farbe',
  },
  render: ({ layer }) => html`
<ol-map zoom="7" lat="46.7985" lon="8.2318">
  <swisstopo-reprojected layer-name="${layer}"></swisstopo-reprojected>
</ol-map>
  `,
}
