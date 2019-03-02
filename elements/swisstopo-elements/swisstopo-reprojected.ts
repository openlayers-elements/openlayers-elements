import OlLayerXyz from '@openlayers-elements/maps/ol-layer-xyz'
import SwisstopoElement from './swisstopo-element'

/**
 * A simpler form SwissTopo layers projects as Mercator.
 *
 * They will work nicely with standard layers such as OpenStreetMap and Bing
 *
 * ### Gotcha
 *
 * Apparently this style of layer source does not work with every one of Swiss layers. If you get 404s (blank map),
 * use the [`swisstopo-wmts` layer](#/elements/SwissTopoWMTS)
 *
 * @demo demo/swiss-reprojected.html
 * @appliesMixin SwisstopoElementMixin
 * @customElement
 */
export default class SwisstopoReprojected extends SwisstopoElement(OlLayerXyz) {
  /**
   * @type {string}
   */
  public get url() {
    return `https://wmts10.geo.admin.ch/1.0.0/${
      this.layerName
    }/default/current/3857/{z}/{x}/{y}.jpeg`
  }
}

customElements.define('swisstopo-reprojected', SwisstopoReprojected)
