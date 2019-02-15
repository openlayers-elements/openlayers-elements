var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from 'lit-element';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
import WMTS from 'ol/source/WMTS.js';
import Attribution from 'ol/control/Attribution';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import OlLayerBase from './ol-layer-base';
import { get as getProjection } from 'ol/proj';
import layers from './layersConfig';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4.js';
/**
 * A basic OpenStreetMap tile layer
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
let SwissTopoReprojected = class SwissTopoReprojected extends OlLayerBase {
    createLayer() {
        return new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/' + this.sourceName + '/default/current/3857/{z}/{x}/{y}.jpeg'
            })
        });
    }
};
__decorate([
    property({ type: String, attribute: 'source-name' })
], SwissTopoReprojected.prototype, "sourceName", void 0);
SwissTopoReprojected = __decorate([
    customElement('swiss-topo-reprojected')
], SwissTopoReprojected);
export { SwissTopoReprojected };
var RESOLUTIONS = [
    4000,
    3750,
    3500,
    3250,
    3000,
    2750,
    2500,
    2250,
    2000,
    1750,
    1500,
    1250,
    1000,
    750,
    650,
    500,
    250,
    100,
    50,
    20,
    10,
    5,
    2.5,
    2,
    1.5,
    1,
    0.5,
    0.25,
    0.1
];
proj4.defs('EPSG:21781', '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
    '+x_0=600000 +y_0=200000 +ellps=bessel ' +
    '+towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs');
proj4.defs("EPSG:2056", "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs");
register(proj4);
var extent = [2420000, 130000, 2900000, 1350000];
var projection = getProjection("EPSG:2056");
projection.setExtent(extent);
var matrixIds = [];
for (var i = 0; i < RESOLUTIONS.length; i++) {
    matrixIds.push(i);
}
var WMTS_BASE_URL = "//wmts10.geo.admin.ch/";
var wmtsSource = function (layer, options) {
    var resolutions = options.resolutions ? options.resolutions : RESOLUTIONS;
    var tileGrid = new WMTSTileGrid({
        origin: [extent[0], extent[3]],
        resolutions: resolutions,
        matrixIds: matrixIds
    });
    var extension = options.format || "png";
    var timestamp = options.timestamp || options["timestamps"][0];
    return new WMTS({
        attributions: [
            new Attribution({
                html: '<a target="new" href="https://www.swisstopo.admin.ch/' +
                    'internet/swisstopo/en/home.html">swisstopo</a>'
            })
        ],
        url: (WMTS_BASE_URL +
            "/1.0.0/{Layer}/default/" +
            timestamp +
            "/2056/" +
            "{TileMatrix}/{TileCol}/{TileRow}.").replace("http:", location.protocol) + extension,
        tileGrid: tileGrid,
        projection: projection,
        layer: options["serverLayerName"] ? options["serverLayerName"] : layer,
        requestEncoding: "REST"
    });
};
var addLayer = function (layerId) {
    // We add the layer defined in the url
    var layerConfig = layers[layerId];
    layerConfig.timestamp = layerConfig.timestamps[0];
    return new TileLayer({
        source: wmtsSource(layerConfig.serverLayerName, layerConfig)
    });
};
/**
 * A basic OpenStreetMap tile layer
 *
 * @demo demo/swiss-topo.html
 * @customElement
 */
let SwissTopoWMTS = class SwissTopoWMTS extends OlLayerBase {
    createLayer() {
        return addLayer(this.sourceName);
    }
};
__decorate([
    property({ type: String, attribute: 'source-name' })
], SwissTopoWMTS.prototype, "sourceName", void 0);
SwissTopoWMTS = __decorate([
    customElement('swiss-topo-wmts')
], SwissTopoWMTS);
export { SwissTopoWMTS };
