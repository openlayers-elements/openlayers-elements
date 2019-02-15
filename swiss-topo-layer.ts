import {customElement, property} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ.js'
import WMTS, {optionsFromCapabilities}  from 'ol/source/WMTS'
import OlLayerBase from './ol-layer-base'
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4.js';
import WMTSCapabilities from 'ol/format/WMTSCapabilities'

var parser = new WMTSCapabilities()

/**
 * A basic OpenStreetMap tile layer
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
@customElement('swiss-topo-reprojected')
export class SwissTopoReprojected extends OlLayerBase<TileLayer> {
    @property({ type: String, attribute: 'source-name' })
    public sourceName: string

    public async createLayer() {
        return new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/' + this.sourceName + '/default/current/3857/{z}/{x}/{y}.jpeg'
            })
        })
    }
}

proj4.defs('EPSG:21781',
    '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs');
proj4.defs("EPSG:2056","+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs");

register(proj4);

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

        var options = optionsFromCapabilities(capabilities, {
            layer: this.sourceName,
            matrixSet: 'EPSG:3857'
        })

        return new TileLayer({
            opacity: 1,
            source: new WMTS(options)
        })
    }
}
