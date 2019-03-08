import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

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
 * @customElement
 */
export default class OlLayerVector extends OlLayerBase<VectorLayer> {
  /**
   * The OpenLayers vector source, containing the features
   *
   * @type {VectorSource}
   */
  public source: VectorSource = undefined

  public connectedCallback() {
    super.connectedCallback()

    this.addEventListener('attaching', (e: CustomEvent) => {
      if (this.source) {
        e.detail.layer = Promise.resolve(this)
      } else {
        e.detail.layer = new Promise((resolve) => {
          this.addEventListener('attached', () => {
            resolve(this)
          })
        })
      }
    })
  }

  protected _createSource() {
    return new VectorSource()
  }

  protected async _createLayer() {
    this.source = this._createSource()

    return new VectorLayer({
      source: this.source,
    })
  }
}

customElements.define('ol-layer-vector', OlLayerVector)
