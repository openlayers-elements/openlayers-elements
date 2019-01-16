import {LitElement, property} from 'lit-element'
import Layer from 'ol/layer/base'

export default abstract class OlLayerBase extends LitElement {
    @property({ type: Number, attribute: 'z-index'})
    zIndex = 0

    @property({ type: Object, attribute: false, noAccessor: true })
    layer: Layer

    connectedCallback() {
        super.connectedCallback()

        const layer = this.createLayer()
        layer.setZIndex(this.zIndex)

        this.layer = layer
    }

    abstract createLayer(): Layer
}
