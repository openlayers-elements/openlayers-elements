import {LitElement} from 'lit-element'

/**
 * Abstract base class used to create map objects such as layers and interactions
 */
export abstract class OlMapPart<T> extends LitElement {
  /**
   * Called when adding layers to the map.
   * Implement to create the OpenLayers object
   *
   * @abstract
   * @returns {T}
   */
  public abstract createPart(): Promise<T>
}
