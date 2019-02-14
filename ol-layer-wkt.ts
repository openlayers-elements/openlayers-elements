import OlLayerBase from './ol-layer-base'
import VectorLayer from 'ol/layer/vector'
import VectorSource from 'ol/source/vector'
import WKT from 'ol/format/wkt'
import {customElement, property} from 'lit-element'

const format = new WKT();

interface IFeature {
    wkt: string
    id: string
    props?: { [key: string]: string }
}

/**
 *
 *
 * @customElement
 */
@customElement('ol-layer-wkt')
export default class OlLayerWkt extends OlLayerBase<VectorLayer> {
    /**
     * The features to be placed on the layer
     *
     * @type {Array}
     */
    @property({ type: String })
    featureData: Array<IFeature> = []

    createLayer() : VectorLayer {
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
