import {customElement, html, LitElement, property, query} from 'lit-element'
import {render} from 'lit-html'
import OpenLayersMap from 'ol/Map'
import View from 'ol/View'
import Control from 'ol/control/Control'
import {fromLonLat} from 'ol/proj.js';
import OlLayerBase from './ol-layer-base'
import Base from 'ol/layer/base'
import Select from 'ol/interaction/Select'

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

    @query('slot#layers')
    layerSlot: HTMLSlotElement

    @query('slot[name=control]')
    controlsSlot: HTMLSlotElement

    map: OpenLayersMap

    layers: Map<OlLayerBase, Base>

    updateControls() {
        const position = this.map.getView().getCenter();

        this.controlsSlot.assignedNodes()
            .filter((node: HTMLElement) => node.id)
            .forEach((node: HTMLElement) => {
                const tempDiv = document.createElement('div')
                render(html`
<div id="${node.id}" class="ol-control">
    <style>
    #${node.id} {
        top: var(--${node.id}-control-top);
        bottom: var(--${node.id}-control-bottom);
        left: var(--${node.id}-control-left);
        right: var(--${node.id}-control-right);
    }
    </style>
    <slot name="${node.id}"></slot>
</div>`, tempDiv)

                node.setAttribute('slot', node.id)

                this.map.addControl(new Control({
                    element: tempDiv.firstElementChild,
                }))
            })
    }

    updateLayers() {
        setTimeout( () => {
            for (let el of this.layers.keys()) {
                if (this.layerSlot.assignedNodes().includes(el) === false) {
                    this.map.removeLayer(this.layers.get(el))
                    this.layers.delete(el)
                }
            }

            this.layerSlot.assignedNodes()
                .filter((el) => 'layer' in el)
                .filter((el:OlLayerBase) => !this.layers.has(el))
                .forEach((el:OlLayerBase) => {
                    const layer = el.layer
                    this.layers.set(el, layer)
                    this.map.addLayer(layer)
                })
        } , 0 );
    }

    firstUpdated() {
        this.layerSlot.addEventListener('slotchange', this.updateLayers.bind(this));
        this.controlsSlot.addEventListener('slotchange', this.updateControls.bind(this))

        this.layers = this._getLayerMap()
        const layers = [...this.layers.values()]

        this.map = new OpenLayersMap({
            layers,
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

        this.updateControls()
    }

    _getLayerMap() {
        return this.layerSlot.assignedNodes()
            .filter((el:any) => 'layer' in el)
            .reduce((map, el: OlLayerBase) => {
                map.set(el, el.layer)
                return map
            }, new Map<OlLayerBase, Base>())
    }

    render() {
        return html`
<link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
<style>
  :host { display: block; }
  .top::slotted(*) {
    display: none;
  }
</style>
<slot id="layers" class="top"></slot>
<slot name="overlay" class="top"></slot>
<slot name="control" class="top"></slot>
<div></div>`
    }
}
