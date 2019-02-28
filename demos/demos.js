import '@polymer/iron-demo-helpers/demo-snippet'
import '@polymer/iron-demo-helpers/demo-pages-shared-styles'
import '@polymer/iron-component-page/iron-component-page'
import '@openlayers-elements/maps/ol-map'
import '@openlayers-elements/maps/ol-layer-openstreetmap'
import '@openlayers-elements/maps/ol-layer-wkt'
import '@openlayers-elements/maps/ol-layer-geojson'
import '@openlayers-elements/maps/ol-select'
import '@openlayers-elements/maps/ol-control'
import '@openlayers-elements/maps/ol-layer-xyz'
import '@openlayers-elements/maps/ol-marker-icon'
import '@openlayers-elements/swisstopo/swisstopo-wmts'
import '@openlayers-elements/swisstopo/swisstopo-reprojected'

import {html} from '@polymer/polymer/lib/utils/html-tag'
const template = html`
    <custom-style>
      <style include="demo-pages-shared-styles">
        .vertical-section-container {
          max-width: 800px;
        }
      </style>
    </custom-style>`;
window.addEventListener('DOMContentLoaded', () => document.body.appendChild(template.content))
