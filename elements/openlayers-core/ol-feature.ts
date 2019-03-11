import Feature from 'ol/Feature'
import {LitElement} from 'lit-element'
import AttachableMixin from "./mixins/Attachable"

export default abstract class OlFeature extends AttachableMixin(LitElement) {
  public abstract createFeature(): Feature

  protected async _attach({ vector }) {
    if (vector) {
      const feature = this.createFeature();
      const source = (await vector).source;
      source.addFeature(feature);
      return () => {
        source.removeFeature(feature);
      };
    }
  }
}
