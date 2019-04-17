import { property, PropertyValues } from 'lit-element';
import WKT from 'ol/format/WKT'
import VectorSource from 'ol/source/Vector'
import OlLayerVector from '@openlayers-elements/core/ol-layer-vector'

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
 * @demo https://openlayers-elements.netlify.com/demo/wkt/
 * @customElement
 */
export default class OlLayerWkt extends OlLayerVector {
  /**
   * The features to be placed on the layer
   *
   * @type {Array}
   */
  @property({type: String})
  public featureData: Feature[] = []

  private get __features() {
    return this.featureData.map((data) => {
      const feature = format.readFeature(data.wkt, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      })

      feature.setId(data.id)
      const props = data.props || {}
      for (const propsKey in props) {
        if (props.hasOwnProperty(propsKey)) {
          feature.set(propsKey, props[propsKey])
        }
      }

      return feature
    })
  }

  protected _createSource() {
    return new VectorSource({
      features: this.__features,
    })
  }

  protected updated(changedProps: PropertyValues) {
    if(changedProps.has('featureData') && this.source) {
      this.source.clear(true)
      this.source.addFeatures(this.__features)
    }
  }
}

customElements.define('ol-layer-wkt', OlLayerWkt)
