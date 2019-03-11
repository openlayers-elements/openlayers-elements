import Feature from 'ol/Feature'
import {LitElement} from 'lit-element'
import VectorSource from 'ol/source/vector'
import OlLayerVector from './ol-layer-vector'

export default abstract class OlFeature extends LitElement {
  protected _feature: Feature

  protected _source: VectorSource

  public abstract createFeature(): Feature

  public connectedCallback() {
    super.connectedCallback()
    setTimeout(this.__attach.bind(this), 0)
  }

  public disconnectedCallback() {
    super.disconnectedCallback()

    if (this._source) {
      this._source.removeFeature(this._feature)
    }
  }

  private __attach() {
    const detail: any = {}
    this.dispatchEvent(new CustomEvent('attaching', {detail, bubbles: true}))

    if (detail.layer) {
      detail.layer.then((layer: OlLayerVector) => {
        this._feature = this.createFeature()
        this._source = layer.source

        this._source.addFeature(this._feature)

        this.dispatchEvent(new Event('attached', {bubbles: true}))
      })
    }
  }
}
