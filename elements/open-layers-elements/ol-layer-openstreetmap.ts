import {customElement} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import OlLayerBase from './ol-layer-base'

/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 */
@customElement('ol-layer-openstreetmap')
export default class OlLayerOpenstreetmap extends OlLayerBase<TileLayer> {
    protected async createLayer() {
        return new TileLayer({
            source: new OSM(),
        })
    }
}
