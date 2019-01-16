import {customElement, html, LitElement} from 'lit-element';
import cantons from '../queryResults'

import './ol-map'
import './ol-wkt-layer'

@customElement('ol-swiss-cantons')
export default class OlSwissCantons extends LitElement {
    render() {
        return html`
<ol-map zoom="7" lat="46.7985" lon="8.2318">
    ${cantons.results.bindings.map(b => html`<ol-wkt-layer .wkt=${b.cantonShape.value}></ol-wkt-layer>`)}
</ol-map>`
    }
}
