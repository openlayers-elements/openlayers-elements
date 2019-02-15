import {customElement, property} from 'lit-element'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import TileLayer from 'ol/layer/Tile'
import {register} from 'ol/proj/proj4.js'
// @ts-ignore
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS'
import OlLayerBase from 'open-layers-elements/ol-layer-base'
import './projections'

const parser = new WMTSCapabilities()

/**
 * A basic OpenStreetMap tile layer
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
@customElement('swiss-topo-wmts')
export class SwissTopoWMTS extends OlLayerBase<TileLayer> {
    @property({ type: String, attribute: 'source-name' })
    public sourceName: string

    public async createLayer() {
        const response = await fetch('https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml')
        const capabilities = parser.read(await response.text())

        const options = optionsFromCapabilities(capabilities, {
            layer: this.sourceName,
            matrixSet: 'EPSG:3857',
        })

        return new TileLayer({
            opacity: 1,
            source: new WMTS(options),
        })
    }
}
