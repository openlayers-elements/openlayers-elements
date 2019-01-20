import {customElement, html, LitElement, property, query} from 'lit-element'
import OpenLayersMap from 'ol/Map'
import View from 'ol/View'
import {fromLonLat} from 'ol/proj.js';
import OlLayerBase from './ol-layer-base'
import Base from 'ol/layer/base'

function addPart(this: OlMap, node) {
    const part = node.createPart()
    node.constructor.addToMap(part, this.map)
    this.parts.set(node, part)
}

function updateParts(this: OlMap, mutationList: MutationRecord[]) {
    mutationList
        .filter(m => m.type === 'childList')
        .forEach(mutation => {
            mutation.removedNodes.forEach((node: any) => {
                if (this.parts.has(node)) {
                    node.constructor.removeFromMap(this.parts.get(node), this.map)
                    this.parts.delete(node)
                }
            })
            const addedNodes = [...mutation.addedNodes]
            addedNodes
                .filter(n => 'createPart' in n)
                .forEach(addPart.bind(this))
        })
}

@customElement('ol-map')
export default class OlMap extends LitElement {
    @property({ type: Number })
    zoom: number

    @property({ type: Number })
    lon: number = 0

    @property({ type: Number })
    lat: number = 0

    @query('div')
    mapElement: HTMLDivElement

    map: OpenLayersMap

    parts: Map<Node, any> = new Map<OlLayerBase<Base>, Base>()
    partObserver: MutationObserver

    constructor() {
        super()
        this.partObserver = new MutationObserver(updateParts.bind(this))
    }

    connectedCallback() {
        super.connectedCallback()
        this.partObserver.observe(this, { childList: true })
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.partObserver.disconnect()
    }

    firstUpdated() {
        this.map = new OpenLayersMap({
            target: this.mapElement,
            view: new View({
                center: fromLonLat([this.lon, this.lat]),
                zoom: this.zoom
            })
        })

        const query = [...this.querySelectorAll('*')]

        query
            .filter(n => 'createPart' in n)
            .forEach(addPart.bind(this))
    }

    render() {
        return html`
<link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
<style>
  :host { display: block; }
</style>
<div></div>`
    }
}
