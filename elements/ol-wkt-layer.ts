import OlLayerBase from './ol-layer-base'
import Layer from 'ol/layer/layer'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import WKT from 'ol/format/WKT'
import {customElement, property} from 'lit-element'

const format = new WKT();

@customElement('ol-wkt-layer')
export default class OlWktLayer extends OlLayerBase {
    @property({ type: String })
    wkt: string

    createLayer() : Layer {
        const feature = format.readFeature(this.wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857',
        })

        feature.setId(this.id)
        feature.set('name', this.getAttribute('feature-name'))

        return new VectorLayer({
            source: new VectorSource({
                features: [feature]
            })
        });
    }
}
