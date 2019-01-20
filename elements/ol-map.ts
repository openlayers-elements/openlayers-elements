import {customElement, html, LitElement, property, query} from 'lit-element'
import {render} from 'lit-html'
import OpenLayersMap from 'ol/Map'
import View from 'ol/View'
import Control from 'ol/control/Control'
import {fromLonLat} from 'ol/proj.js';
import OlLayerBase from './ol-layer-base'
import Base from 'ol/layer/base'
import Select from 'ol/interaction/Select'

function removeControl(this: OlMap, node: Element) {
    if (!node.classList || node.classList.contains('control') === false) return

    if (this.controls.has(node)) {
        this.map.removeControl(this.controls.get(node))
        this.controls.delete(node)
    }
}

function addControl(this: OlMap, node: Element) {
    if (!node.classList || node.classList.contains('control') === false) return

    const tempDiv = document.createElement('div')
    const slot = node.id
    node.slot = slot

    render(html`
<div id="${slot}" class="ol-control">
    <style>
    #${slot} {
        top: var(--${slot}-control-top);
        bottom: var(--${slot}-control-bottom);
        left: var(--${slot}-control-left);
        right: var(--${slot}-control-right);
    }
    </style>
    <slot name="${slot}"></slot>
</div>`, tempDiv)

    const control = new Control({
        element: tempDiv.firstElementChild,
    })
    this.controls.set(node, control)
    this.map.addControl(control)
}

function addLayer(this: OlMap, node: OlLayerBase<Base>) {
    if (!node.classList || node.classList.contains('layer') === false) return

    if ('layer' in node) {
        const layer = node.layer
        this.layers.set(node, layer)
        this.map.addLayer(layer)
    }
}

function removeLayer(this: OlMap, node: OlLayerBase<Base>) {
    if (!node.classList || node.classList.contains('layer') === false) return

    if (this.layers.has(node)) {
        this.map.removeLayer(this.layers.get(node))
        this.layers.delete(node)
    }
}

function updateControls(this: OlMap, mutationList: MutationRecord[]) {
    mutationList
        .filter(m => m.type === 'childList')
        .forEach(mutation => {
            mutation.removedNodes.forEach(removeControl.bind(this))
            mutation.addedNodes.forEach(addControl.bind(this))
        })
}

function updateLayers(this: OlMap, mutationList: MutationRecord[]) {
    mutationList
        .filter(m => m.type === 'childList')
        .forEach(mutation => {
            mutation.removedNodes.forEach(removeLayer.bind(this))
            mutation.addedNodes.forEach(addLayer.bind(this))
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

    layers: Map<OlLayerBase<Base>, Base> = new Map<OlLayerBase<Base>, Base>()
    controls: Map<Node, Control> = new Map<Node, Control>()
    observers: MutationObserver[]

    constructor() {
        super()

        this.observers = [
            new MutationObserver(updateControls.bind(this)),
            new MutationObserver(updateLayers.bind(this))
        ]
    }

    connectedCallback() {
        super.connectedCallback()
        this.observers.forEach(o => o.observe(this, { childList: true }))
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.observers.forEach(o => o.disconnect())
    }

    firstUpdated() {
        this.map = new OpenLayersMap({
            target: this.mapElement,
            view: new View({
                center: fromLonLat([this.lon, this.lat]),
                zoom: this.zoom
            })
        })

        const select = new Select();
        this.map.addInteraction(select);
        const selectedFeatures = select.getFeatures();

        select.on(['select'], (e) => {
            this.dispatchEvent(new CustomEvent('feature-selected', {
                detail: {
                    value: e.target.getFeatures().item(0)
                }
            }))
        })

        this.querySelectorAll('.layer').forEach(addLayer.bind(this))
        this.querySelectorAll('.control').forEach(addControl.bind(this))
    }

    render() {
        return html`
<link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
<style>
  :host { display: block; }
  :host > ::slotted(*) {
    display: none;
  }
</style>
<slot></slot>
<div></div>`
    }
}
