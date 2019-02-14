var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, property } from 'lit-element';
import TileLayer from 'ol/layer/Tile';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
import OlLayerBase from './ol-layer-base';
import { getWidth, getTopLeft } from 'ol/extent.js';
import { get as getProjection } from 'ol/proj.js';
/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 */
let SwissTopoLayer = class SwissTopoLayer extends OlLayerBase {
    createLayer() {
        var projection = getProjection('EPSG:3857');
        var projectionExtent = projection.getExtent();
        var size = getWidth(projectionExtent) / 256;
        var resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            // generate resolutions and matrixIds arrays for this WMTS
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }
        return new TileLayer({
            source: new WMTS({
                opacity: 1,
                url: 'https://services.arcgisonline.com/arcgis/rest/' +
                    'services/Demographics/USA_Population_Density/MapServer/WMTS/',
                layer: '0',
                matrixSet: 'EPSG:3857',
                format: 'image/png',
                //  projection: projection,
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds
                }),
                style: 'default',
                wrapX: true
            })
        });
    }
};
__decorate([
    property({ type: String, attribute: 'source-name' })
], SwissTopoLayer.prototype, "sourceName", void 0);
SwissTopoLayer = __decorate([
    customElement('swiss-topo-layer')
], SwissTopoLayer);
export default SwissTopoLayer;
