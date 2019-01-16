import {customElement, html, LitElement, property, query} from 'lit-element'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import OlLayerBase from './ol-layer-base'

@customElement('ol-map')
export default class OlSwissCantons extends LitElement {
    @property({ type: Number })
    zoom: number

    @property({ type: Number })
    lon: number = 0

    @property({ type: Number })
    lat: number = 0

    @query('div')
    mapElement: HTMLDivElement

    @query('slot')
    childSlot: HTMLSlotElement

    map: Map

    connectedCallback() {
        super.connectedCallback()

        this.updateComplete.then(() => {
            const layers = this.childSlot.assignedNodes()
                .filter((el:any) => el.createLayer && typeof el.createLayer === 'function')
                .map((el: OlLayerBase) => el.createLayer())

            layers.splice(0,0, new TileLayer({
                source: new OSM()
            }))

            this.map = new Map({
                layers,
                target: this.mapElement,
                view: new View({
                    center: fromLonLat([this.lon, this.lat]),
                    zoom: this.zoom
                })
            })
        })
    }

    render() {
        return html`
<link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
<style>
  :host { display: block; }
</style>
<slot></slot>
<div></div>`
    }
}
