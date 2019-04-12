import {property} from 'lit-element'
import Layer from 'ol/layer/base'
import Map from 'ol/Map'
import {OlMapPart} from './ol-map-part'

/**
 * Base class used to create layers
 */
export default class OlLayerBase<L extends Layer> extends OlMapPart<L> {
  protected _addToMap(map: Map, layer: L) {
    map.addLayer(layer)
  }

  protected _removeFromMap(map: Map, layer: L) {
    map.removeLayer(layer)
  }

  /**
   * Control's the layer's z-index. In other words, controls the vertical stacking order of layers
   *
   * @type {Number}
   */
  @property({type: Number, attribute: 'z-index'})
  public zIndex = 0

  public async createPart() {
    const layer = await this._createLayer()
    layer.setZIndex(this.zIndex)

    return layer
  }

  /**
   * Called from [`createPart`](#method-createPart)
   * Implement to create the OpenLayers layer object
   */
  protected _createLayer(): Promise<L> {
    throw new Error('createLayer must be implemented in derived class')
  }
}
