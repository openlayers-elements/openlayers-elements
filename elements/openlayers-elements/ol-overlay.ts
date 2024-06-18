import { OlMapPart } from '@openlayers-elements/core/ol-map-part.js'
import Overlay from 'ol/Overlay.js'
import type { PanIntoViewOptions } from 'ol/Overlay.js'
import Map from 'ol/Map.js'
import { html } from 'lit'
import { property } from 'lit/decorators.js'

/**
 * An element used to place HTML on the map surface. Similar to `ol-control` but
 * unlike controls, overlays keep their relative position on the map when panning
 * while controls keep a static position relative to the map viewport. In other words,
 * overlays are attached to the map itself.
 *
 * To place it on the map the `id` must be set.
 *
 * ```html
 * <ol-map>
 *   <ol-overlay id="popup">
 *     <p>
 *       Some contents to put on your overlay
 *     </p>
 *   </ol-control>
 * </ol-map>
 * ```
 *
 * Use `setPosition` method to move and show the overlay.
 * Use `hide` method to... hide it.
 *
 * @customElement
 */
export default class OlOverlay extends OlMapPart<Overlay> {
  /**
   * When set to true, automatically pans the map so the entire overlay in visible when
   * shown
   *
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'auto-pan' })
  public autoPan = false

  /**
   * When set, it controls the panning animation duration in milliseconds.
   *
   * @type {number}
   */
  @property({ type: Number, attribute: 'auto-pan-animation-duration' })
  public autoPanAnimationDuration = 0

  /**
   * Gets the actual OpenLayers [Overlay](https://openlayers.org/en/latest/apidoc/module-ol_Overlay-Overlay.html) object
   *
   * @return {Overlay}
   */
  public get overlay() {
    return this.__overlay
  }

  /**
   * @ignore
   * @private
   */
  private __overlay: Overlay

  protected _addToMap(map: Map, overlay: Overlay) {
    map.addOverlay(overlay)
  }

  protected _removeFromMap(map: Map, overlay: Overlay) {
    map.removeOverlay(overlay)
  }

  public async createPart(): Promise<Overlay> {
    if (!this.id) {
      throw new Error('ol-overlay element must have an id')
    }

    const slot = this.id
    this.slot = slot

    const slotEl = document.createElement('slot')
    slotEl.name = slot

    const overlayOptions: {
      element: HTMLElement
      autoPan?: PanIntoViewOptions | boolean
    } = {
      element: slotEl,
    }

    if (this.autoPan || this.autoPanAnimationDuration > 0) {
      overlayOptions.autoPan = {
        animation: {
          duration: this.autoPanAnimationDuration,
        },
      }
    }

    this.__overlay = new Overlay(overlayOptions)

    // Hack to get panning to correctly calculate overlay dimensions,
    // which would otherwise be calculated from the <slot> element
    this.__overlay.getElement = () => this

    return this.__overlay
  }

  /**
   * Sets the position on the map with XY [coordinates](https://openlayers.org/en/latest/apidoc/module-ol_coordinate.html#~Coordinate)
   *
   * Note that this is not latitude/longitude geographic coordinates
   *
   * @param coord {[number, number]}
   */
  public setPosition(coord: [number, number]) {
    this.overlay.setPosition(coord)
  }

  /**
   * Hides the overlay
   */
  public hide() {
    this.overlay.setPosition(undefined)
  }

  public render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('ol-overlay', OlOverlay)
