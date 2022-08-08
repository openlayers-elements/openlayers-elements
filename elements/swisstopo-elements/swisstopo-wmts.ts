import OlLayerBase from '@openlayers-elements/core/ol-layer-base'
import { property } from 'lit/decorators.js'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import TileLayer from 'ol/layer/Tile'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'
import './projections'
import SwisstopoElement from './swisstopo-element'

const parser = new WMTSCapabilities()

type Projections = 'EPSG:3857' | 'EPSG:21718' | 'EPSG:2056' | 'EPSG:4329'

/**
 * Layer which loads official Swiss maps from [WMTS capabilities document][wmts-list]
 *
 * [wmts-list]: http://api3.geo.admin.ch/services/sdiservices.html#supported-projections
 *
 * @demo https://openlayers-elements.netlify.com/demo/swiss-topo/
 * @appliesMixin SwisstopoElementMixin
 * @customElement
 */
export class SwisstopoWmts extends SwisstopoElement(OlLayerBase as new (...args: any[]) => OlLayerBase<TileLayer>) {
  /**
   * One of projections supported by swisstopo maps:
   *
   * 1. EPSG:3857 (Mercator) (default)
   * 1. EPSG:2056
   * 1. EPSG:21718
   * 1. EPSG:4329
   *
   * @type {string}
   */
  @property({ type: String })
  public projection: Projections = 'EPSG:3857'

  protected async _attach(detail: any) {
    const { projection } = await detail.map

    if (projection) {
      this.projection = projection as Projections
    }

    return super._attach(detail)
  }

  protected async _createLayer() {
    const projectionSegments = this.projection.replace(/:/, '/')
    const response = await fetch(`https://wmts.geo.admin.ch/${projectionSegments}/1.0.0/WMTSCapabilities.xml`)
    const capabilities = parser.read(await response.text())

    const options = optionsFromCapabilities(capabilities, {
      layer: this.layerName,
      matrixSet: this.projection,
    })

    return new TileLayer({
      source: new WMTS(options),
    })
  }
}

customElements.define('swisstopo-wmts', SwisstopoWmts)
