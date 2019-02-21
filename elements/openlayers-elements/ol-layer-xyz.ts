import {property} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import OlLayerBase from './ol-layer-base'

export default class OlLayerXyz extends OlLayerBase<TileLayer> {
    @property({ type: String })
    public url: string

    protected async createLayer() {
        return new TileLayer({
            source: new XYZ({
                url: this.url,
            }),
        })
    }
}

customElements.define('ol-layer-xyz', OlLayerXyz)
