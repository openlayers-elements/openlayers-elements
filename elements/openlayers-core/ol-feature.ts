import Feature from 'ol/Feature'
import { LitElement } from 'lit'
import AttachableMixin from './mixins/Attachable'
import { forwardEvents } from './lib/events'
import OlLayerVector from './ol-layer-vector'
import OlMap from './ol-map'

/**
 * Base class for feature elements which attach themselves to vector layers
 *
 * @appliesMixin AttachableMixin
 */
export default abstract class OlFeature extends AttachableMixin(LitElement, 'vector') {
  protected get _forwardedEvents(): string[] {
    return []
  }

  public abstract createFeature(map: OlMap): Feature

  protected async _attach(arg: { map: Promise<OlMap | undefined>; vector: Promise<OlLayerVector | undefined> }) {
    const map = await arg.map
    const vector = await arg.vector

    if (vector && map) {
      const feature = this.createFeature(map)
      const { source } = vector
      source?.addFeature(feature)
      forwardEvents(this._forwardedEvents, this, feature)

      return () => {
        source?.removeFeature(feature)
      }
    }

    return null
  }
}
