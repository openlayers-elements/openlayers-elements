import { LitElement } from 'lit'
import Map from 'ol/Map.js'
import BaseObject from 'ol/Object.js'
import AttachableMixin from './mixins/Attachable.js'
import OlMap from './ol-map.js'
import { forwardEvents } from './lib/events.js'

/**
 * Abstract base class used to create map objects such as layers and interactions
 *
 * @appliesMixin AttachableMixin
 */
export abstract class OlMapPart<T extends BaseObject> extends AttachableMixin(LitElement, 'map') {
  /**
   * Called when adding layers to the map.
   * Implement to create the OpenLayers object
   *
   * @abstract
   * @returns {Promise<T>}
   */
  public abstract createPart(): Promise<T>

  public _map: OlMap

  protected get _forwardedEvents(): string[] {
    return []
  }

  protected abstract _addToMap(map: Map, part: T): void

  protected abstract _removeFromMap(map: Map, part: T): void

  protected async _attach({ map }: { map: OlMap }): Promise<(() => void) | null> {
    if (map) {
      this._map = await map
      const olMap = this._map.map!
      const part = await this.createPart()
      this._addToMap(olMap, part)

      forwardEvents(this._forwardedEvents, this, part)

      return () => {
        this._removeFromMap(olMap, part)
      }
    }

    return null
  }
}
