import {customElement, property} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ.js'
import OlLayerBase from 'open-layers-elements/ol-layer-base'

/**
 * ### <swiss-topo-reprojected>
 *
 * A simpler form SwissTopo layers projects as Mercator.
 *
 * They will work nicely with standard layers such as OpenStreetMap and Bing
 *
 * #### Gotcha
 *
 * Apparently this style of layer source does not work with every one of Swiss layers. If you get 404s (blank map),
 * use the [`swiss-topo-wmts` layer](#/elements/SwissTopoWMTS)
 *
 * @demo demo/swiss-reprojected.html
 * @customElement
 */
@customElement('swiss-topo-reprojected')
export class SwissTopoReprojected extends OlLayerBase<TileLayer> {
    @property({ type: String, attribute: 'layer-name' })
    public layerName: string

    public async createLayer() {
        return new TileLayer({
            source: new XYZ({
                url: 'https://wmts10.geo.admin.ch/1.0.0/' + this.layerName + '/default/current/3857/{z}/{x}/{y}.jpeg',
            }),
        })
    }
}
