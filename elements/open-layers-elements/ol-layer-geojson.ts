import {customElement, property} from 'lit-element'
import GeoJSON from 'ol/format/geojson'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

/**
 * A layer which loads features from a GeoJSON input
 *
 * @demo demo/select.html
 * @customElement
 */
@customElement('ol-layer-geojson')
export default class OlLayerGeoJson extends OlLayerBase<VectorLayer> {
    /**
     * The URL to fetch the GeoJSON. It can be relative or absolute
     *
     * @type {String}
     */
    @property({ type: String })
    public url: string

    protected async createLayer() {
        return new VectorLayer({
            source: new VectorSource({
                format: new GeoJSON(),
                url: this.url,
            }),
        })
    }

}
