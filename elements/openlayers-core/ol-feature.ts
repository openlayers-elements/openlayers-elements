import Feature from 'ol/Feature'
import {LitElement} from 'lit-element'
import VectorSource from "ol/source/vector";

export default abstract class OlFeature extends LitElement {
  protected _feature: Feature

  protected _source: VectorSource

  public abstract createFeature(): Feature

  connectedCallback() {
    super.connectedCallback()
    const detail: any = {}
    this.dispatchEvent(new CustomEvent('child-attaching', { detail, bubbles: true }))

    if (detail.layer) {
      let layerPromise: Promise<VectorSource>

      if (!detail.layer.source) {
        layerPromise = new Promise(resolve => {
          detail.layer.addEventListener('child-attached', (e) => {
            resolve(e.target.source)
          })
        })
      } else {
        layerPromise = Promise.resolve(detail.layer.source)
      }

      layerPromise
        .then((source) => {
          this._feature = this.createFeature()
          this._source = source

          this._source.addFeature(this._feature)

          this.dispatchEvent(new Event('child-attached', { bubbles: true }))
        })
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if(this._source) {
      this._source.removeFeature(this._feature)
    }
  }
}
