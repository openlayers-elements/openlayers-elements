import { property } from 'lit/decorators.js'
import Layer from 'ol/layer/Base'
import Map from 'ol/Map'
import { OlMapPart } from './ol-map-part.js'

/**
 * Base class used to create layers
 */
export default class OlLayerBase<L extends Layer> extends OlMapPart<L> {
  /**
   * Forwards `change` event from OpenLayers object
   *
   * @event change
   * @param {detail} the event itself
   */

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
  @property({ type: Number, attribute: 'z-index' })
  public zIndex = 0

  protected get _forwardedEvents() {
    return ['change']
  }

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
