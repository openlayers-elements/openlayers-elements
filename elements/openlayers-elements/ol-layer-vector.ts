import ChildObserverMixin from '@openlayers-elements/core/mixins/ChildObserver'
import OlFeature from '@openlayers-elements/core/ol-feature'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

export default class OlLayerVector
    extends ChildObserverMixin(OlLayerBase as new (...args: any[]) => OlLayerBase<VectorLayer>) {

    get childFeatures() {
        return [...this.childNodes]
            .filter((node) => 'createFeature' in node)
            .map((node: OlFeature) => node.createFeature())
    }

    public source: VectorSource
    public features: Map<Node, Feature> = new Map<Node, Feature>()

    protected async createLayer() {
        this.source = new VectorSource()
        this.childNodes.forEach(this.handleAddedChildNode.bind(this))

        return new VectorLayer({
            source: this.source,
        })
    }

    protected handleRemovedChildNode(node: Node) {
        if (this.features.has(node)) {
            this.source.removeFeature(this.features.get(node))
            this.features.delete(node)
        }
    }

    protected handleAddedChildNode(node: OlFeature) {
        if ('createFeature' in node) {
            const feature = node.createFeature()
            this.features.set(node, feature)
            this.source.addFeature(feature)
        }
    }

    protected notifyMutationComplete() {
        this.dispatchEvent(new CustomEvent('ol-updated'))
    }
}

customElements.define('ol-layer-vector', OlLayerVector)
