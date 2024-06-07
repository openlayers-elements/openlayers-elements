import OlLayerBase from '@openlayers-elements/core/ol-layer-base.js'
import { property } from 'lit/decorators.js'
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js'
import TileLayer from 'ol/layer/Tile.js'
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS.js'
import './projections.js'
import SwisstopoElement from './swisstopo-element.js'

const parser = new WMTSCapabilities()

type Projections = 'EPSG:3857' | 'EPSG:21718' | 'EPSG:2056' | 'EPSG:4329'

/**
 * Layer which loads official Swiss maps from [WMTS capabilities document][wmts-list]
 *
 * [wmts-list]: http://api3.geo.admin.ch/services/sdiservices.html#supported-projections
 *
 * @demo demo/swiss-topo/
 * @appliesMixin SwisstopoElementMixin
 * @customElement
 */
export class SwisstopoWmts extends SwisstopoElement(OlLayerBase as new (...args: any[]) => OlLayerBase<TileLayer<any>>) {
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
    const url = `https://wmts.geo.admin.ch/${projectionSegments}/1.0.0/WMTSCapabilities.xml`
    const response = await fetch(url)
    const capabilities = parser.read(await response.text())

    const options = optionsFromCapabilities(capabilities, {
      layer: this.layerName,
      matrixSet: this.projection,
    })

    if (!options) {
      throw new Error(`Source options not found in capabilities document ${url}`)
    }

    return new TileLayer({
      source: new WMTS(options),
    })
  }
}

customElements.define('swisstopo-wmts', SwisstopoWmts)
