import OlLayerBase from './ol-layer-base'
import Layer from 'ol/layer/layer'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import WKT from 'ol/format/WKT'
import {customElement, property} from 'lit-element'

const format = new WKT();

interface IFeature {
    wkt: string
    id: string
    props: { [key: string]: string }
}

@customElement('ol-wkt-layer')
export default class OlWktLayer extends OlLayerBase {
    @property({ type: String })
    featureData: Array<IFeature> = []

    createLayer() : Layer {
        const features = this.featureData.map(data => {
            const feature = format.readFeature(data.wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            })

            feature.setId(data.id)
            for (let propsKey in data.props) {
                feature.set(propsKey, data.props[propsKey])
            }

            return feature
        })

        return new VectorLayer({
            source: new VectorSource({
                features
            })
        });
    }
}
