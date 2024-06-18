import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'
import { spread } from '@open-wc/lit-helpers'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-overlay.js'
import '@openlayers-elements/maps/ol-layer-openstreetmap.js'
import '@openlayers-elements/maps/ol-select.js'
import '@openlayers-elements/maps/ol-layer-geojson.js'

import './Map.css'

const defaults: Meta = {
  title: 'Core/ol-overlay',
  component: 'ol-overlay',
  tags: ['autodocs'],
  args: {
    'auto-pan': true,
    'auto-pan-animation-duration': 250,
    map: {
      lat: 46.7985,
      lon: 8.2318,
      zoom: 4,
    },
  },
  argTypes: {
    'auto-pan': {
      control: 'boolean',
    },
    'auto-pan-animation-duration': {
      control: 'number',
    },
  },
}

export default defaults

/**
 * This demo, inspired by the [official one from OpenLayers](https://openlayers.org/en/latest/examples/popup.html),
 * creates a popup with coordinates of where the map was clicked.
 */
export const Popup: Story = {
  name: 'Simple overlay popup',
  render: ({ map, 'auto-pan': autoPan, ...args }) => html`
<style>
  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "✖";
  }
</style>

<script>
  const mapEl = document.querySelector('ol-map')
  const content = document.querySelector('#popup-content')
  const overlay = document.querySelector('ol-overlay')

  mapEl.updateComplete.then(() => {
    mapEl.map.on('singleclick', function (evt) {
      const coordinate = evt.coordinate

      content.innerHTML = '<p>You clicked here:</p><code>' + coordinate + '</code>'
      overlay.setPosition(coordinate)
    })
  })

  document.querySelector('#popup-closer')
    .addEventListener('click', function (e) {
      overlay.hide()
    })
</script>

<ol-map ${spread(map)}>
  <ol-layer-openstreetmap></ol-layer-openstreetmap>
  <ol-overlay id="popup" class="ol-popup" ?auto-pan="${autoPan}" ${spread(args)}>
    <button id="popup-closer" class="ol-popup-closer"></button>
    <div id="popup-content"></div>
  </ol-overlay>
</ol-map>`,
}

/**
 * Very similar to basic example of `<ol-overlay>` where the popup contents are filled with the name of selected country.
 *
 *  Note that separate event handler is used to position the popup where clicked. It could be easily done by calculating
 *  geographic center of each country, thus requiring only the `feature-selected` event. However, oversea
 *  territories of certain countries position the center outside of its main surface. For example in the case of this
 *  GeoJSON, Alaska pulls the center of the United States into western Canada.
 */
export const GeoJSON: Story = {
  name: 'Popup over GeoJSON layer',
  render: ({ map, 'auto-pan': autoPan, ...args }) => html`
<style>
  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 70px
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
</style>

<script>
  const mapEl = document.querySelector('ol-map')
  const content = document.querySelector('#popup-content')
  const overlay = document.querySelector('ol-overlay')

  mapEl.updateComplete.then(() => {
    mapEl.map.on('singleclick', function (selected) {
      overlay.setPosition(selected.coordinate)
    })
  })

  document.querySelector('ol-select')
    .addEventListener('feature-selected', e => {
      content.textContent = e.detail.feature.get('name')
    })

  document.querySelector('ol-select')
    .addEventListener('feature-unselected', e => {
      overlay.hide()
    })
</script>

<ol-map ${spread(map)}>
  <ol-layer-geojson url="/countries.geojson"></ol-layer-geojson>
  <ol-select></ol-select>
  <ol-overlay id="popup" class="ol-popup" ?auto-pan="${autoPan}" ${spread(args)}>
    <div id="popup-content"></div>
  </ol-overlay>
</ol-map>`,
}
