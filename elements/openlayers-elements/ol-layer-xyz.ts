import {property} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import OlLayerBase from './ol-layer-base'

/**
 * A simple layer element, sourcing from a raster tile server using X/Y/Z coordinates
 *
 * @demo demo/xyz.html
 * @customElement
 */
export default class OlLayerXyz extends OlLayerBase<TileLayer> {
    /**
     * The url template for the source tiles. The `x`, `y`, `z` parameters must be provided wrapped in
     * curly brackets (not using ES6 interpolation syntax)
     *
     * @type {String}
     */
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
