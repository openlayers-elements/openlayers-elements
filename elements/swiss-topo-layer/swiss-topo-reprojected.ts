import {customElement, property} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ.js'
import OlLayerBase from 'open-layers-elements/ol-layer-base'

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
                url: 'https://wmts10.geo.admin.ch/1.0.0/' + this.sourceName + '/default/current/3857/{z}/{x}/{y}.jpeg',
            }),
        })
    }
}
