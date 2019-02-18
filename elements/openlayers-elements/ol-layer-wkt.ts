import {customElement, property} from 'lit-element'
import WKT from 'ol/format/WKT'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

const format = new WKT()

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
    public featureData: IFeature[] = []

    public async createLayer() {
        const features = this.featureData.map((data) => {
            const feature = format.readFeature(data.wkt, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857',
            })

            feature.setId(data.id)
            for (const propsKey in data.props) {
                if (data.props.hasOwnProperty(propsKey)) {
                    feature.set(propsKey, data.props[propsKey])
                }
            }

            return feature
        })

        return new VectorLayer({
            source: new VectorSource({
                features,
            }),
        })
    }
}
