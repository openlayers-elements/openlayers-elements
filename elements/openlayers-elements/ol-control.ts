import { html } from 'lit-element'
import { render } from 'lit-html'
import Control from 'ol/control/Control'
import Map from 'ol/map'
import { OlMapPart } from '@openlayers-elements/core/ol-map-part'

/**
 * A base element for implementing map controls.
 *
 * To place it on the map the `id` must be set
 *
 * ```html
 * <ol-map>
 *   <ol-control id="map-button">
 *     <input type="button" value="Control the map">
 *   </ol-control>
 * </ol-map>
 * ```
 *
 * A control is placed statically on the map canvas and must be positioned using custom CSS properties, which
 * are derived from the control's `slot` attribute. For example, to position the `map-button` shown in the above snippet
 * one would define these four properties:
 *
 * | Property | Description |
 * | -- | -- |
 * | --map-button-control-top | Top CSS offset |
 * | --map-button-control-bottom | Bottom CSS offset |
 * | --map-button-control-left | Left CSS offset |
 * | --map-button-control-right | Right CSS offset |
 *
 * @demo https://openlayers-elements.netlify.com/demo/control/
 * @customElement
 */
export default class OlControl extends OlMapPart<Control> {
  protected _addToMap(map: Map, c: Control) {
    map.addControl(c)
  }

  protected _removeFromMap(map: Map, c: Control) {
    map.removeControl(c)
  }

  public async createPart() {
    const tempDiv = document.createElement('div')
    const slot = this.id
    this.slot = slot

    render(
      html`
        <div id="${slot}" class="ol-control">
          <style>
            #${slot} {
              top: var(--${slot}-control-top);
              bottom: var(--${slot}-control-bottom);
              left: var(--${slot}-control-left);
              right: var(--${slot}-control-right);
            }
          </style>
          <slot name="${slot}"></slot>
        </div>
      `,
      tempDiv,
    )

    return new Control({
      element: tempDiv.firstElementChild instanceof HTMLElement ? tempDiv.firstElementChild : undefined,
    })
  }

  public render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('ol-control', OlControl)
