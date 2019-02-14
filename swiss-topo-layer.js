var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import OlLayerBase from './ol-layer-base';
import TileLayer from 'ol/layer/tile';
import { customElement, property } from 'lit-element';
/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 */
let SwissTopoLayer = class SwissTopoLayer extends OlLayerBase {
    createLayer() {
        const x = ga.layer.create(this.sourceName);
        debugger;
        return new TileLayer({
            source: x.getSource()
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
