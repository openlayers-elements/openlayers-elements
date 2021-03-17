import Feature from 'ol/Feature'
import { LitElement } from 'lit-element'
import AttachableMixin from './mixins/Attachable'

/**
 * Base class for feature elements which attach themselves to vector layers
 *
 * @appliesMixin AttachableMixin
 */
export default abstract class OlFeature extends AttachableMixin(LitElement, 'vector') {
  public abstract createFeature(): Feature

  protected async _attach({ vector }: any) {
    if (vector) {
      const feature = this.createFeature()
      const { source } = await vector
      source.addFeature(feature)
      return () => {
        source.removeFeature(feature)
      }
    }

    return null
  }
}
