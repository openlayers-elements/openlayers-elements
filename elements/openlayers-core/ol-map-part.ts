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
    const partPromise = this.createPart()

    const detail: any = {}
    this.dispatchEvent(new CustomEvent('child-attaching', {detail, bubbles: true}))

    if (detail.map) {
      let mapPromise: Promise<Map>

      if (!detail.map.map) {
        mapPromise = new Promise((resolve) => {
          detail.map.addEventListener('map-ready', (e) => {
            resolve(e.target.map)
          })
        })
      } else {
        mapPromise = Promise.resolve(detail.map.map)
      }

      Promise.all([partPromise, mapPromise]).then(([part, map]) => {
        this._part = part
        this._map = map

        this._addToMap(this._map, this._part)

        this.dispatchEvent(new Event('child-attached', {bubbles: true}))
      })
    }
  }

  public disconnectedCallback() {
    super.disconnectedCallback()

    if (this._map) {
      this._removeFromMap(this._map, this._part)
    }
  }
}
