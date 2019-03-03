import {property} from 'lit-element'
import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import OlLayerVector from './ol-layer-vector'

/**
 * A layer which loads features from a GeoJSON input
 *
 * @demo demo/select.html
 * @demo demo/markers.html Combined with markers
 * @customElement
 */
export default class OlLayerGeoJson extends OlLayerVector {
  /**
   * The URL to fetch the GeoJSON. It can be relative or absolute
   *
   * @type {String}
   */
  @property({type: String})
  public url?: string = undefined

  protected _createSource() {
    return new VectorSource({
      format: new GeoJSON(),
      url: this.url,
    })
  }
}

customElements.define('ol-layer-geojson', OlLayerGeoJson)
