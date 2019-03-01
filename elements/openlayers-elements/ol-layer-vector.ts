import OlFeature from '@openlayers-elements/core/ol-feature'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

function updateFeatures(this: OlLayerVector, mutationList: MutationRecord[]) {
    mutationList
        .forEach((mutation) => {
            mutation.removedNodes.forEach((node: any) => {
                if (this.features.has(node)) {
                    this.source.removeFeature(this.features.get(node))
                    this.features.delete(node)
                }
            })

            addFeatures(this, mutation.addedNodes)

            this.dispatchEvent(new CustomEvent('ol-updated'))
        })
}

function addFeatures(element, addedNodes: NodeList) {
    element.source.addFeatures([...addedNodes]
        .filter((n) => 'createFeature' in n)
        .map((n: OlFeature) => {
            const feature = n.createFeature()
            element.features.set(n, feature)
            return feature
        }))
}

export default class OlLayerVector extends OlLayerBase<VectorLayer> {
    get childFeatures() {
        return [...this.childNodes]
            .filter((node) => 'createFeature' in node)
            .map((node: OlFeature) => node.createFeature())
    }

    public source: VectorSource
    public features: Map<Node, Feature> = new Map<Node, Feature>()
    private partObserver: MutationObserver

    constructor() {
        super()
        this.partObserver = new MutationObserver(updateFeatures.bind(this))
    }

    public connectedCallback() {
        super.connectedCallback()
        if (window['ShadyDOM']) {
            window['ShadyDOM'].observeChildren(this, updateFeatures.bind(this))
        } else {
            this.partObserver.observe(this, { childList: true })
        }
    }

    public disconnectedCallback() {
        super.disconnectedCallback()
        this.partObserver.disconnect()
    }

    protected async createLayer() {
        this.source = new VectorSource()
        addFeatures(this, this.childNodes)

        return new VectorLayer({
            source: this.source,
        })
    }
}

customElements.define('ol-layer-vector', OlLayerVector)
