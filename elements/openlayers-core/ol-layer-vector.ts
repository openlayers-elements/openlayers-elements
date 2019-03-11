import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'
import AttachableAwareMixin from './mixins/AttachableAware'

/**
 * An "empty" vector layer. It is a base class to other vector layers.
 *
 * It can also be used alone to add markers to the map.
 *
 * ### Usage
 *
 * ```html
 * <ol-map>
 *     <ol-layer-vector>
 *         <!-- markers go here -->
 *     </ol-layer-vector>
 * </ol-map>
 * ```
 *
 * @appliesMixin AttachableAwareMixin
 * @customElement
 */
export default class OlLayerVector extends AttachableAwareMixin(
  OlLayerBase as new (...args: any[]) => OlLayerBase<VectorLayer>,
  'vector',
) {
  /**
   * The OpenLayers vector source, containing the features
   *
   * @type {VectorSource}
   */
  public source: VectorSource = undefined

  protected _createSource() {
    return new VectorSource()
  }

  protected async _createLayer() {
    this.source = this._createSource()
    this.notifyReady()

    return new VectorLayer({
      source: this.source,
    })
  }
}

customElements.define('ol-layer-vector', OlLayerVector)
