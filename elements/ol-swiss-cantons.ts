import {customElement, html, LitElement, property} from 'lit-element'
import {until} from 'lit-html/directives/until'
import {repeat} from 'lit-html/directives/repeat'
import Sparql from 'sparql-http-client'

import './ol-map'
import './ol-wkt-layer'
import './ol-layer-openstreetmap'

Sparql.fetch = (a,b) => {
    return window.fetch(a, b)
}
const endpoint = new Sparql({endpointUrl: 'https://ld.geo.admin.ch/query'})

const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <http://schema.org/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>

SELECT ?canton ?cantonShape ?cantonShapeLabel WHERE {
    ?canton a <http://www.geonames.org/ontology#A.ADM1> ;
  	    dct:hasVersion ?version .
 
    ?version schema:validUntil "2018-12-31"^^xsd:date ;
        geo:hasGeometry/geo:asWKT ?cantonShape ;
        schema:name ?cantonShapeLabel .                                        
}`

@customElement('ol-swiss-cantons')
export default class OlSwissCantons extends LitElement {
    @property({ type: Boolean, attribute: 'no-map', reflect: true })
    noMap: boolean = false

    @property({ type: String, attribute: false })
    selected: string

    cantonLayers = endpoint.selectQuery(query)
        .then(r => r.json())
        .then(json => json.results.bindings)
        .then(bindings => {
            return html`${repeat(bindings, (b:any) => html`<ol-wkt-layer .wkt=${b.cantonShape.value} feature-name="${b.cantonShapeLabel.value}" id="${b.canton.value}"></ol-wkt-layer>`)}`
        })

    updateSelection(e: CustomEvent) {
        this.selected = e.detail.value.getId()
        this.dispatchEvent(new CustomEvent('selected-changed', {
            detail: {
                value: this.selected
            }
        }))
    }

    render() {
        return html`
<style>
    :host {
        --canton-loading-control-bottom: 20px;
        --canton-loading-control-left: 10px;
    }

    #canton-loading { color: red }
</style>
<ol-map zoom="7" lat="46.7985" lon="8.2318" @feature-selected="${this.updateSelection}">
    ${this.noMap ? '' : html`<ol-layer-openstreetmap></ol-layer-openstreetmap>`}
    ${until(this.cantonLayers, html`<div id="canton-loading" slot="control">Loading cantons...</div>`)}
</ol-map>`
    }
}
