import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-control.js'
import '@openlayers-elements/maps/ol-select.js'
import '@openlayers-elements/maps/ol-layer-wkt.js'

const main: Meta = {
  title: 'Layers/ol-layer-wkt',
  component: 'ol-layer-wkt',
  tags: ['autodocs'],
}

export default main

export const Basic: Story = {
  render: () => html`
<style>
  ol-map {
    --remove-countries-control-bottom: 10px;
    --remove-countries-control-left: 10px;
  }
</style>

<ol-map zoom="7" lat="46.7985" lon="8.2318">
  <ol-layer-wkt id="wkt_manual"></ol-layer-wkt>
  <ol-control id="remove-countries">
    <button>Remove random canton</button>
  </ol-control>
</ol-map>

<script>
  const wktLayer = document.querySelector('#wkt_manual')
  const removeButton = document.querySelector('#remove-countries button')

  removeButton.addEventListener('click', () => {
    const randomCountryIndex = Math.floor(Math.random() * wktLayer.featureData.length)
    wktLayer.featureData.splice(randomCountryIndex, 1)
    wktLayer.resetFeatures()
  })

  fetch('/europe.wkt')
    .then(res => res.json())
    .then(data => {
      wktLayer.featureData = data
    })
</script>`,
}
