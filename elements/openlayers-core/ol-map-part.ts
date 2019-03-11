import {LitElement} from 'lit-element'
import Map from 'ol/Map'

/**
 * Abstract base class used to create map objects such as layers and interactions
 */
export abstract class OlMapPart<T> extends LitElement {
  protected _part: T

  protected _map: Map

  /**
   * Called when adding layers to the map.
   * Implement to create the OpenLayers object
   *
   * @abstract
   * @returns {Promise<T>}
   */
  public abstract createPart(): Promise<T>

  protected abstract _addToMap(map: Map, part: T)

  protected abstract _removeFromMap(map: Map, part: T)

  public connectedCallback() {
    super.connectedCallback()
    setTimeout(this.__attach.bind(this), 0)
  }

  public disconnectedCallback() {
    super.disconnectedCallback()
    if (this._map) {
      this._removeFromMap(this._map, this._part)
    }
  }

  private __attach() {
    const detail: any = {}
    this.dispatchEvent(new CustomEvent('attaching', {detail, bubbles: true}))

    if (detail.map) {
      detail.map
        .then((map) => {
          this._map = map.map

          return this.createPart()
        })
        .then((part) => {
          this._part = part

          this._addToMap(this._map, this._part)

          this.dispatchEvent(new Event('attached', {bubbles: true}))
        })
    }
  }
}
