import {customElement, html, LitElement, property, query} from 'lit-element'
import OpenLayersMap from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import OlLayerBase from './ol-layer-base'
import Base from 'ol/layer/base'

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
    layerSlot: HTMLSlotElement

    map: OpenLayersMap

    layers: Map<OlLayerBase, Base>

    connectedCallback() {
        super.connectedCallback()

        this.updateComplete.then(() => {
            this.layerSlot.addEventListener('slotchange', this.updateLayers.bind(this));
        })
    }

    updateLayers() {
        const newLayers = this._getLayerMap()

        for (let el of this.layers.keys()) {
            if (this.layerSlot.assignedNodes().includes(el) === false) {
                this.map.removeLayer(this.layers.get(el))
            }
        }

        for (let el of newLayers.keys()) {
            if(this.layers.has(el) === false) {
                this.map.addLayer(newLayers.get(el))
            }
        }

        this.layers = newLayers
    }

    firstUpdated() {
        this.layers = this._getLayerMap()
        const layers = [...this.layers.values()]

        layers.splice(0,0, new TileLayer({
            source: new OSM()
        }))

        this.map = new OpenLayersMap({
            layers,
            target: this.mapElement,
            view: new View({
                center: fromLonLat([this.lon, this.lat]),
                zoom: this.zoom
            })
        })
    }

    _getLayerMap() {
        return this.layerSlot.assignedNodes()
            .filter((el:any) => el.createLayer && typeof el.createLayer === 'function')
            .reduce((map, el: OlLayerBase) => {
                map.set(el, el.createLayer())
                return map
            }, new Map<OlLayerBase, Base>())
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
