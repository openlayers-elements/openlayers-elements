import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'
import { spread } from '@open-wc/lit-helpers'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-select.js'
import '@openlayers-elements/maps/ol-layer-geojson.js'

import './Map.css'

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
  render: ({ map }) => html`
<ol-map ${spread(map)}>
  <ol-layer-geojson url="/countries.geojson"></ol-layer-geojson>
  <ol-select></ol-select>
</ol-map>

<p>Selected: <span id="feature">nothing</span></p>

<script>
  const span = document.querySelector('#feature')
  document.querySelector('ol-select')
    .addEventListener('feature-selected', e => {
      span.textContent = e.detail.feature.get('name')
    })

  document.querySelector('ol-select')
    .addEventListener('feature-unselected', e => {
      span.textContent = 'nothing'
    })
</script>`,
}
