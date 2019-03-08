import OlLayerBase from '@openlayers-elements/core/ol-layer-base'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import TileLayer from 'ol/layer/Tile'
// @ts-ignore
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS'
import './projections'
import SwisstopoElement from './swisstopo-element'

const parser = new WMTSCapabilities()

/**
 * Layer which loads official Swiss maps from [WMTS capabilities document][wmts-list]
 *
 * [wmts-list]: http://api3.geo.admin.ch/services/sdiservices.html#supported-projections
 *
 * @demo https://openlayers-elements.netlify.com/demo/swiss-topo.html
 * @appliesMixin SwisstopoElementMixin
 * @customElement
 */
export class SwisstopoWmts extends SwisstopoElement(OlLayerBase as new (...args: any[]) => OlLayerBase<TileLayer>) {
  protected async _createLayer() {
    const projection = this._map.getView().getProjection()
    const projectionSegments = projection.getCode().replace(/:/, '/')
    const response = await fetch(`https://wmts.geo.admin.ch/${projectionSegments}/1.0.0/WMTSCapabilities.xml`)
    const capabilities = parser.read(await response.text())

    const options = optionsFromCapabilities(capabilities, {
      layer: this.layerName,
      matrixSet: projection,
    })

    return new TileLayer({
      source: new WMTS(options),
    })
  }
}

customElements.define('swisstopo-wmts', SwisstopoWmts)
