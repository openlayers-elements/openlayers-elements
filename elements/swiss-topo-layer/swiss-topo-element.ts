import { property} from 'lit-element'
import TileLayer from 'ol/layer/Tile'
import OlLayerBase from 'open-layers-elements/ol-layer-base'

/**
 * Base class for swisstopo elements
 */
export default abstract class SwissTopoElement extends OlLayerBase<TileLayer> {
    /**
     * One of the official layer names provided by geo.admin.ch.
     *
     * Complete list of layers is available
     * [here](http://api3.geo.admin.ch/api/faq/index.html#which-layers-are-available)
     *
     * @type {string}
     */
    @property({ type: String, attribute: 'layer-name' })
    public layerName: string = null
}
