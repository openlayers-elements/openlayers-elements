import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'
import { spread } from '@open-wc/lit-helpers'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-control.js'
import '@openlayers-elements/maps/ol-layer-openstreetmap.js'
import '@openlayers-elements/maps/ol-layer-geojson.js'
import '@openlayers-elements/core/ol-layer-vector.js'
import '@openlayers-elements/maps/ol-marker-icon.js'

import './Map.css'

const defaultMap = {
  lat: 46.7985,
  lon: 8.2318,
  zoom: 4,
}

const defaults: Meta = {
  title: 'Core/ol-marker-icon',
  component: 'ol-marker-icon',
  tags: ['autodocs'],
  args: {
    map: {
      ...defaultMap,
    },
  },
}

export default defaults

export const Anchor: Story = {
  name: 'Marker icon with adjusted anchor',
  args: {
    lat: 40.4,
    lon: -3.683333,
    'anchor-y': 46,
    'anchor-y-units': 'pixels',
  },
  render: ({ map, ...args }) => html`
<ol-map ${spread(map)} >
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-layer-vector z-index="1">
    <ol-marker-icon id="Madrid" src="/icon.png" ${spread(args)}></ol-marker-icon>
  </ol-layer-vector>
</ol-map>`,
}

export const Opacity: Story = {
  name: 'Marker icon opacity',
  args: {
    opacity: 0.3,
    map: {
      zoom: 4,
    },
  },
  render: ({ map, ...args }) => html`
<ol-map ${spread(map)}>
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-layer-vector z-index="1">
    <ol-marker-icon src="/icon.png" ${spread(args)}></ol-marker-icon>
  </ol-layer-vector>
</ol-map>`,
}

export const GeoJSON: Story = {
  name: 'Markers on a GeoJSON layer',
  render: ({ map }) => html`
<ol-map ${spread(map)}">
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-layer-geojson z-index="1" url="/countries.geojson">
    <ol-marker-icon src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/320px-Flag_of_Germany.svg.png"
                    lat="51.163375" lon="10.447683" scale="0.1"></ol-marker-icon>
    <ol-marker-icon src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/320px-Flag_of_Poland.svg.png"
                    lat="52.069167" lon="19.480556" scale="0.1"></ol-marker-icon>
    <ol-marker-icon src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png"
                    lat="46.7594" lon="2.4011" scale="0.1"></ol-marker-icon>
    <ol-marker-icon src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/320px-Flag_of_Italy.svg.png"
                    lat="42.516667" lon="12.516667" scale="0.1"></ol-marker-icon>
    <ol-marker-icon src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/320px-Flag_of_Spain.svg.png"
                    lat="40.416944" lon="-3.703611" scale="0.1"></ol-marker-icon>
  </ol-layer-geojson>
</ol-map>`,
}
