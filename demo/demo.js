import '@polymer/iron-demo-helpers/demo-snippet'
import '@polymer/iron-demo-helpers/demo-pages-shared-styles'

import {html} from '@polymer/polymer/lib/utils/html-tag'
const template = html`
    <custom-style>
      <style include="demo-pages-shared-styles">
        .vertical-section-container {
          max-width: 500px;
        }
      </style>
    </custom-style>`;
window.setTimeout(() => document.body.appendChild(template.content), 100)
