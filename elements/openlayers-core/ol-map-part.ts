import { LitElement } from 'lit'
import type Map from 'ol/Map.js'
import type BaseObject from 'ol/Object.js'
import { ContextConsumer } from '@lit/context'
import { forwardEvents } from './lib/events.js'
import { map } from './lib/context.js'

/**
 * Abstract base class used to create map objects such as layers and interactions
 */
export abstract class OlMapPart<T extends BaseObject> extends LitElement {
  public readonly map: ContextConsumer<typeof map, typeof this>

  /**
   * Called when adding layers to the map.
   * Implement to create the OpenLayers object
   *
   * @abstract
   * @returns {Promise<T>}
   */
  public abstract createPart(): Promise<T>

  private _part: T

  constructor() {
    super()
    this.map = new ContextConsumer(this, {
      context: map,
      callback: (olMap) => {
        if (olMap) {
          this._addToMap(olMap, this._part)
        }
      },
      subscribe: true,
    })
  }

  async connectedCallback() {
    this._part = await this.createPart()
    forwardEvents(this._forwardedEvents, this, this._part)
    super.connectedCallback()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this.map.value) {
      this._removeFromMap(this.map.value, this._part)
    }
  }

  /**
   * @ignore
   */
  protected get _forwardedEvents(): string[] {
    return []
  }

  protected abstract _addToMap(map: Map, part: T): void

  protected abstract _removeFromMap(map: Map, part: T): void
}
