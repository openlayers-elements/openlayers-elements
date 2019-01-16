import {customElement, html, LitElement} from 'lit-element';
import {until} from 'lit-html/directives/until'
import Sparql from 'sparql-http-client'

import './ol-map'
import './ol-wkt-layer'

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
    render() {
        const cantonLayers = endpoint.selectQuery(query)
            .then(r => r.json())
            .then(json => {
                return json.results.bindings.map(b => html`<ol-wkt-layer .wkt=${b.cantonShape.value}></ol-wkt-layer>`)
            })

        return html`
<ol-map zoom="7" lat="46.7985" lon="8.2318">
    ${until(cantonLayers, '')}
</ol-map>`
    }
}
