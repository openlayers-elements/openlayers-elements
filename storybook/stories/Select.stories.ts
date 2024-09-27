import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'
import { spread } from '@open-wc/lit-helpers'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-select.js'
import '@openlayers-elements/maps/ol-layer-geojson.js'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijk', 4)

const defaults: Meta = {
  title: 'Core/ol-select',
  component: 'ol-select',
  tags: ['autodocs'],
  args: {
    map: {
      lat: 46.7985,
      lon: 8.2318,
      zoom: 4,
    },
  },
}

export default defaults

export const Popup: Story = {
  name: 'Simple overlay popup',
  render: ({ map, id = nanoid(), featureSpan = nanoid() }) => html`
<ol-map id="${id}" ${spread(map)}>
  <ol-layer-geojson url="/countries.geojson"></ol-layer-geojson>
  <ol-select></ol-select>
</ol-map>

<p>Selected: <span id="${featureSpan}">nothing</span></p>

<script>
  (() => {
    const map = document.getElementById('${id}')

    const span = document.getElementById('${featureSpan}')
    map.querySelector('ol-select')
      .addEventListener('feature-selected', e => {

        span.textContent = e.detail.feature.get('name')
      })

    map.querySelector('ol-select')
      .addEventListener('feature-unselected', e => {
        span.textContent = 'nothing'
      })
  })()
</script>`,
}

export const FeatureStyle: Story = {
  name: 'Setting feature styles',
  render: ({ map, id = nanoid() }) => html`
<ol-map id="${id}" ${spread(map)}>
  <ol-layer-geojson url="/countries.geojson"></ol-layer-geojson>
  <ol-select></ol-select>
</ol-map>

<script>
  (() => {
    const map = document.getElementById('${id}')

    map.querySelector('ol-select')
      .featureStyle = new Style({
      fill: new Fill({
        color: 'rgba(255,255,255,0.4)',
      }),
      stroke: new Stroke({
        color: '#ffb15e',
        width: 5,
      }),
    })
  })()
</script>`,
}

export const FeatureStyleAttribute: Story = {
  name: 'Setting feature styles from attribute',
  render: ({ map }) => html`
<ol-map ${spread(map)}>
  <ol-layer-geojson url="/countries.geojson"></ol-layer-geojson>
  <ol-select feature-style='{ "Style": {
    "fill": { "Fill": {
      "color": "rgba(255,255,255,0.4)"
    }},
    "stroke": { "Stroke": {
      "color": "#ffb15e",
      "width": 5
    }}
  }}'></ol-select>
</ol-map>`,
}
