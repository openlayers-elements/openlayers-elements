import {property} from 'lit-element'
import Layer from 'ol/layer/base'
import {OlMapPart} from './ol-map-part'

/**
 * Base class used to create layers
 */
export default abstract class OlLayerBase<L extends Layer> extends OlMapPart<L> {
    /**
     * Control's the layer's z-index. In other words, controls the vertical stacking order of layers
     *
     * @type {Number}
     */
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

    /**
     * Called from [`createPart`](#method-createPart)
     * Implement to create the OpenLayers layer object
     */
    abstract createLayer(): L
}
