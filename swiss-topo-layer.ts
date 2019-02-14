import OlLayerBase from './ol-layer-base'
import TileLayer from 'ol/layer/tile'
import {customElement, property} from 'lit-element'

/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 */
@customElement('swiss-topo-layer')
export default class SwissTopoLayer extends OlLayerBase<TileLayer> {
    @property({ type: String, attribute: 'source-name' })
    sourceName: string

    createLayer(): TileLayer {
        const x = ga.layer.create(this.sourceName)
        debugger
        return new TileLayer({
            source: x.getSource()
        })
    }
}
