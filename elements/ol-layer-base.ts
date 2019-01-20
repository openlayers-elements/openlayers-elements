import {property} from 'lit-element'
import Layer from 'ol/layer/base'
import {OlMapPart} from './ol-map-part'

export default abstract class OlLayerBase<L extends Layer> extends OlMapPart<L> {
    @property({ type: Number, attribute: 'z-index'})
    zIndex = 0

    createPart() {
        const layer = this.createLayer()
        layer.setZIndex(this.zIndex)

        return layer
    }

    static addToMap(layer, map) {
        map.addLayer(layer)
    }

    static removeFromMap(layer, map) {
        map.removeLayer(layer)
    }

    abstract createLayer(): L
}
