import {LitElement} from 'lit-element'
import Map from 'ol/Map'
import AttachableMixin from './mixins/Attachable'
import OlMap from './ol-map';

/**
 * Abstract base class used to create map objects such as layers and interactions
 *
 * @appliesMixin AttachableMixin
 */
export abstract class OlMapPart<T> extends AttachableMixin(LitElement, 'map') {
  /**
   * Called when adding layers to the map.
   * Implement to create the OpenLayers object
   *
   * @abstract
   * @returns {Promise<T>}
   */
  public abstract createPart(): Promise<T>

  protected _map: OlMap

  protected abstract _addToMap(map: Map, part: T)

  protected abstract _removeFromMap(map: Map, part: T)

  protected async _attach({map}) {
    if (map) {
      this._map = await map
      const olMap = this._map.map
      const part = await this.createPart()
      this._addToMap(olMap, part)

      return () => {
        this._removeFromMap(olMap, part)
      }
    }
  }
}
