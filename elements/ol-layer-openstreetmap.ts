import OlLayerBase from './ol-layer-base'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Base from 'ol/layer/Base'
import {customElement} from 'lit-element'

@customElement('ol-layer-openstreetmap')
export default class OlLayerOpenstreetmap extends OlLayerBase {
    createLayer(): Base {
        return new TileLayer({
            source: new OSM()
        });
    }
}
