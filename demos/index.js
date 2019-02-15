import '@polymer/iron-demo-helpers/demo-snippet'
import '@polymer/iron-demo-helpers/demo-pages-shared-styles'
import '@polymer/iron-component-page/iron-component-page'
import 'open-layers-elements/ol-map'
import 'open-layers-elements/ol-layer-openstreetmap'
import 'open-layers-elements/ol-layer-wkt'
import '@zazuko/swiss-topo-elements/swiss-topo-wmts'
import '@zazuko/swiss-topo-elements/swiss-topo-reprojected'

import {html} from '@polymer/polymer/lib/utils/html-tag'
const template = html`
    <custom-style>
      <style include="demo-pages-shared-styles">
        .vertical-section-container {
          max-width: 800px;
        }
      </style>
    </custom-style>`;
window.setTimeout(() => document.body.appendChild(template.content), 1000)
