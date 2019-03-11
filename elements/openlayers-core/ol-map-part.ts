import {LitElement} from 'lit-element'
import Map from 'ol/Map'
import AttachableMixin from "./mixins/Attachable";

/**
 * Abstract base class used to create map objects such as layers and interactions
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

  protected abstract _addToMap(map: Map, part: T)

  protected abstract _removeFromMap(map: Map, part: T)

  protected async _attach(map) {
    if (map) {
      const olMap = map.map;
      const part = await this.createPart();
      this._addToMap(olMap, part);

      return () => {
        this._removeFromMap(olMap, part)
      }
    }
  }
}
