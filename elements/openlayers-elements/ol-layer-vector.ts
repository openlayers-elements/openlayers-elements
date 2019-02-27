import OlFeature from '@openlayers-elements/core/ol-feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

export default class OlLayerVector extends OlLayerBase<VectorLayer> {
    get childFeatures() {
        return [...this.childNodes]
            .filter((node) => 'createFeature' in node)
            .map((node: OlFeature) => node.createFeature())
    }

    protected async createLayer() {
        const source = new VectorSource({
            features: this.childFeatures,
        })

        return new VectorLayer({
            source,
        })
    }
}

customElements.define('ol-layer-vector', OlLayerVector)
