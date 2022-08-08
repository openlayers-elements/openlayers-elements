import Feature from 'ol/Feature'
import { LitElement } from 'lit'
import AttachableMixin from './mixins/Attachable'
import { forwardEvents } from './lib/events'

/**
 * Base class for feature elements which attach themselves to vector layers
 *
 * @appliesMixin AttachableMixin
 */
export default abstract class OlFeature extends AttachableMixin(LitElement, 'vector') {
  protected get _forwardedEvents(): string[] {
    return []
  }

  public abstract createFeature(): Feature

  protected async _attach({ vector }: any) {
    if (vector) {
      const feature = this.createFeature()
      const { source } = await vector
      source.addFeature(feature)
      forwardEvents(this._forwardedEvents, this, feature)

      return () => {
        source.removeFeature(feature)
      }
    }

    return null
  }
}
