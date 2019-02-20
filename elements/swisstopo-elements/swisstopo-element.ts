import OlLayerBase from '@openlayers-elements/maps/ol-layer-base'
import { property } from 'lit-element'
import TileLayer from 'ol/layer/Tile'

/**
 * Base class for swisstopo elements
 */
export default abstract class SwisstopoElement extends OlLayerBase<TileLayer> {
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
