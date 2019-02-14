import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/geojson'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'
import {customElement, property} from 'lit-element'

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
    url: string

    createLayer(): VectorLayer {
        return new VectorLayer({
            source: new VectorSource({
                url: this.url,
                format: new GeoJSON()
            })
        })
    }

}
