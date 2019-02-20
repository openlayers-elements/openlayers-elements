import '@polymer/iron-demo-helpers/demo-snippet'
import '@polymer/iron-demo-helpers/demo-pages-shared-styles'
import '@polymer/iron-component-page/iron-component-page'
import 'openlayers-elements/ol-map'
import 'openlayers-elements/ol-layer-openstreetmap'
import 'openlayers-elements/ol-layer-wkt'
import 'openlayers-elements/ol-layer-geojson'
import 'openlayers-elements/ol-select'
import 'openlayers-elements/ol-control'
import 'openlayers-elements-swisstopo/swisstopo-wmts'
import 'openlayers-elements-swisstopo/swisstopo-reprojected'

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