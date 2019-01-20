import {customElement, html, LitElement, property, query} from 'lit-element'
import {until} from 'lit-html/directives/until'
import Sparql from 'sparql-http-client'

import OlMap from './ol-map'
import './ol-map'
import OlWktLayer from './ol-wkt-layer'
import './ol-wkt-layer'
import './ol-layer-openstreetmap'
import './ol-control'
import './ol-select'

Sparql.fetch = (a,b) => {
    return window.fetch(a, b)
}
const endpoint = new Sparql({endpointUrl: 'https://ld.geo.admin.ch/query'})

const sparql = `
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

    @property({ type: Number, attribute: 'fit-animation-ms' })
    fitAnimationMs: number = 500

    @query('ol-map')
    mapElement: OlMap

    @query('ol-wkt-layer')
    layerElement: OlWktLayer

    cantonLayers = endpoint.selectQuery(sparql)
        .then(r => r.json())
        .then(json => json.results.bindings)
        .then(bindings => bindings.map(b => ({
            wkt: b.cantonShape.value,
            id: b.canton.value,
            props: { name: b.cantonShapeLabel.value },
        })))
        .then(features => {
            return html`<ol-wkt-layer class="layer" z-index="1" .featureData="${features}"></ol-wkt-layer>`
        })

    updateSelection(e: CustomEvent) {
        if (!e.detail.value) {
            this.selected = null
        } else {
            this.selected = e.detail.value.getId()
        }

        this.dispatchEvent(new CustomEvent('selected-changed', {
            detail: {
                value: this.selected
            }
        }))
    }

    firstUpdated() {
        this.cantonLayers
            .then(() => this.updateComplete)
            .then(() => {
                setTimeout(() =>{
                    const map = this.mapElement.map
                    const layer = this.mapElement.parts.get(this.layerElement)
                    const extent = layer.getSource().getExtent()

                    map.getView().fit(extent, {
                        size: map.getSize(),
                        constrainResolution: false,
                        nearest: false,
                        duration: this.fitAnimationMs
                    })
                }, 0)
            })
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
<ol-map zoom="7" lat="46.7985" lon="8.2318">
    <ol-select @feature-selected="${this.updateSelection}"></ol-select>
    ${this.noMap ? '' : html`<ol-layer-openstreetmap></ol-layer-openstreetmap>`}
    ${until(this.cantonLayers, html`<ol-control id="canton-loading">Loading cantons...</ol-control>`)}
</ol-map>`
    }
}
