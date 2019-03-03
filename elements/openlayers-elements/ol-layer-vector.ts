import ChildObserverMixin from '@openlayers-elements/core/mixins/ChildObserver'
import OlFeature from '@openlayers-elements/core/ol-feature'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OlLayerBase from './ol-layer-base'

/**
 * An "empty" vector layer. It is a base class to other vector layers.
 *
 * It can also be used alone to add markers to the map.
 *
 * ### Usage
 *
 * ```html
 * <ol-map>
 *     <ol-layer-vector>
 *         <!-- markers go here -->
 *     </ol-layer-vector>
 * </ol-map>
 * ```
 *
 * @appliesMixin ChildObserverMixin
 * @customElement
 */
export default class OlLayerVector extends ChildObserverMixin(OlLayerBase as new (...args: any[]) => OlLayerBase<
  VectorLayer
>) {
  /**
   * The Openlayers vector source, containing the features
   *
   * @type {VectorSource}
   */
  public source: VectorSource

  /**
   * The individual features
   */
  public features: Map<Node, Feature> = new Map<Node, Feature>()

  protected async _createLayer() {
    this.source = new VectorSource()
    this._initializeChildren()

    return new VectorLayer({
      source: this.source,
    })
  }

  protected _handleRemovedChildNode(node: Node) {
    if (this.features.has(node)) {
      this.source.removeFeature(this.features.get(node))
      this.features.delete(node)
    }
  }

  protected _handleAddedChildNode(node: OlFeature) {
    if ('createFeature' in node) {
      const feature = node.createFeature()
      this.features.set(node, feature)
      this.source.addFeature(feature)
    }
  }

  /**
   * Called when the child elements changed and those changes have been reflected on the map
   */
  protected _notifyMutationComplete() {
    this.dispatchEvent(new CustomEvent('ol-updated'))
  }
}

customElements.define('ol-layer-vector', OlLayerVector)
