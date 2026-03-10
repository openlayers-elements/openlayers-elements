import VectorLayer from 'ol/layer/Vector.js'
import VectorSource from 'ol/source/Vector.js'
import { property } from 'lit/decorators.js'
import type { StyleFunction } from 'ol/style/Style.js'
import type Style from 'ol/style/Style.js'
import type { FlatStyle } from 'ol/style/flat.js'
import { provide } from '@lit/context'
import OlLayerBase from './ol-layer-base.js'
import { vectorSource } from './lib/context.js'
import fit from './lib/fit.js'

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
 * @slot - The markers to be placed on the map
 */
export default class OlLayerVector extends OlLayerBase<VectorLayer<any>> {
  /**
   * The OpenLayers vector source, containing the features
   *
   * @type {VectorSource}
   */
  @provide({ context: vectorSource })
  public source: VectorSource | undefined = undefined

  /**
   * The style to be applied to layer features. It can be either an `ol/Style` or `ol/style/flat`
   * array thereof, or a function which returns either.
   *
   * @type {Style | Style[] | FlatStyle | FlatStyle[] | StyleFunction}
   */
  @property({ type: Object })
  public featureStyle?: Style | Style[] | FlatStyle | FlatStyle[] | StyleFunction = undefined

  public fit() {
    if (this.source) {
      fit(this.map.value, this.source.getExtent())
    }
  }

  protected _createSource() {
    return new VectorSource()
  }

  protected async _createLayer() {
    this.source = this._createSource()

    return new VectorLayer({
      source: this.source,
      style: this.featureStyle,
    })
  }
}

customElements.define('ol-layer-vector', OlLayerVector)
