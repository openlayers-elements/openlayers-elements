import {property} from 'lit-element'
import Layer from 'ol/layer/base'
import {OlMapPart} from './ol-map-part'

/**
 * Base class used to create layers
 */
export default abstract class OlLayerBase<L extends Layer> extends OlMapPart<L> {
    public static addToMap(layer, map) {
        map.addLayer(layer)
    }

    public static removeFromMap(layer, map) {
        map.removeLayer(layer)
    }

    /**
     * Control's the layer's z-index. In other words, controls the vertical stacking order of layers
     *
     * @type {Number}
     */
    @property({ type: Number, attribute: 'z-index'})
    public zIndex = 0

    public async createPart() {
        const layer = await this.createLayer()
        layer.setZIndex(this.zIndex)

        return layer
    }

    /**
     * Called from [`createPart`](#method-createPart)
     * Implement to create the OpenLayers layer object
     */
    protected abstract createLayer(): Promise<L>
}
