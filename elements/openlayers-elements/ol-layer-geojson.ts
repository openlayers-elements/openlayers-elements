import { property } from 'lit/decorators.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import VectorSource from 'ol/source/Vector.js'
import OlLayerVector from '@openlayers-elements/core/ol-layer-vector.js'

/**
 * A layer which loads features from a GeoJSON input
 *
 * @customElement
 */
export default class OlLayerGeoJson extends OlLayerVector {
  /**
   * The URL to fetch the GeoJSON. It can be relative or absolute
   *
   * @type {String}
   */
  @property({ type: String })
  public url?: string = undefined

  protected _createSource() {
    return new VectorSource({
      format: new GeoJSON(),
      url: this.url,
    })
  }
}

customElements.define('ol-layer-geojson', OlLayerGeoJson)
