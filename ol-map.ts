import {customElement, html, LitElement, property, query} from 'lit-element'
import Base from 'ol/layer/base'
import OpenLayersMap from 'ol/Map'
import {fromLonLat} from 'ol/proj.js'
import View from 'ol/View'
import ResizeObserver from 'resize-observer-polyfill'
import OlLayerBase from './ol-layer-base'

function addPart(this: OlMap, node) {
    const part = node.createPart()
    node.constructor.addToMap(part, this.map)
    this.parts.set(node, part)
}

function updateParts(this: OlMap, mutationList: MutationRecord[]) {
    mutationList
        .filter((m) => m.type === 'childList')
        .forEach((mutation) => {
            mutation.removedNodes.forEach((node: any) => {
                if (this.parts.has(node)) {
                    node.constructor.removeFromMap(this.parts.get(node), this.map)
                    this.parts.delete(node)
                }
            })
            const addedNodes = [...mutation.addedNodes]
            addedNodes
                .filter((n) => 'createPart' in n)
                .forEach(addPart.bind(this))
        })
}

/**
 * The main map element. On its own it does not do anything. Has to be combined with layers
 * which are added as [Light DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom#lightdom)
 * children
 *
 * ```html
 * <ol-map>
 *     <ol-layer-openstreetmap></ol-layer-openstreetmap>
 * </ol-map>
 * ```
 *
 * @demo demo/index.html
 * @customElement
 */
@customElement('ol-map')
export default class OlMap extends LitElement {
    /**
     * Zoom level
     * @type {Number}
     */
    @property({ type: Number })
    public zoom: number = 1

    /**
     * Longitude
     * @type {Number}
     */
    @property({ type: Number })
    public lon: number = 0

    /**
     * Latitude
     * @type {Number}
     */
    @property({ type: Number })
    public lat: number = 0

    @query('div')
    public mapElement: HTMLDivElement

    /**
     * The underlying OpenLayers map instance
     * @type {Object}
     */
    public map: OpenLayersMap = null

    public parts: Map<Node, any> = new Map<OlLayerBase<Base>, Base>()
    public partObserver: MutationObserver
    public sizeObserver: ResizeObserver

    constructor() {
        super()
        this.partObserver = new MutationObserver(updateParts.bind(this))
        this.sizeObserver = new ResizeObserver(() => {
            if (this.map) {
                this.map.updateSize()
            }
        })
    }

    public connectedCallback() {
        super.connectedCallback()
        this.partObserver.observe(this, { childList: true })
        this.sizeObserver.observe(this)
    }

    public disconnectedCallback() {
        super.disconnectedCallback()
        this.partObserver.disconnect()
        this.sizeObserver.disconnect()
    }

    public firstUpdated() {
        this.map = new OpenLayersMap({
            target: this.mapElement,
            view: new View({
                center: fromLonLat([this.lon, this.lat]),
                zoom: this.zoom,
            }),
        })

        const children = [...this.querySelectorAll('*')]

        children
            .filter((n) => 'createPart' in n)
            .forEach(addPart.bind(this))
    }

    public render() {
        return html`
<link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
<style>
  :host { display: block; }
</style>
<div id="map"></div>`
    }
}
