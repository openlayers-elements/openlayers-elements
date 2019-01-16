import {LitElement, property} from 'lit-element'
import Layer from 'ol/layer/base'

export default abstract class OlLayerBase extends LitElement {
    @property({ type: Number, attribute: 'z-index'})
    zIndex = 0

    get layer() {
        const layer = this.createLayer()
        layer.setZIndex(this.zIndex)
        return layer
    }

    abstract createLayer(): Layer
}
