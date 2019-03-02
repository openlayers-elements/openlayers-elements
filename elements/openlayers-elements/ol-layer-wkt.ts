import {property} from 'lit-element'
import WKT from 'ol/format/WKT'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

const format = new WKT()

interface Feature {
  wkt: string
  id: string
  props?: {[key: string]: string}
}

/**
 * Adds a layer with features defined as [WKT strings][wkt]
 *
 * To populate the layer `featureData` property must be set with an array of objects.
 *
 * ```js
 * const layer = document.querySelector('ol-layer-wkt')
 *
 * layer.featureData = [
 *   {
 *     id: 'Feature 1',
 *     wkt: 'POLYGON(...)'
 *   }
 * ]
 * ```
 *
 * `id` and `wkt` props are required. Any additional keys will be stored added to feature's props.
 *
 * [wkt]: https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry
 *
 * @customElement
 */
export default class OlLayerWkt extends OlLayerBase<VectorLayer> {
  /**
   * The features to be placed on the layer
   *
   * @type {Array}
   */
  @property({type: String})
  public featureData: Feature[] = []

  public async _createLayer() {
    const features = this.featureData.map((data) => {
      const feature = format.readFeature(data.wkt, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      })

      feature.setId(data.id)
      const props = data.props || []
      for (const propsKey in props) {
        if (props.hasOwnProperty(propsKey)) {
          feature.set(propsKey, props[propsKey])
        }
      }

      return feature
    })

    return new VectorLayer({
      source: new VectorSource({
        features,
      }),
    })
  }
}

customElements.define('ol-layer-wkt', OlLayerWkt)
