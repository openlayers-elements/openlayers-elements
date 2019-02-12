import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'
import {customElement, property} from 'lit-element'

@customElement('ol-layer-geojson')
export default class OlLayerGeoJson extends OlLayerBase<VectorLayer> {
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
