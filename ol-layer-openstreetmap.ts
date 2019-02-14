import OlLayerBase from './ol-layer-base'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {customElement} from 'lit-element'

/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 */
@customElement('ol-layer-openstreetmap')
export default class OlLayerOpenstreetmap extends OlLayerBase<TileLayer> {
    createLayer(): TileLayer {
        return new TileLayer({
            source: new OSM()
        });
    }
}
