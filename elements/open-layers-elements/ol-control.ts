import {customElement, html} from 'lit-element'
import {render} from 'lit-html'
import Control from 'ol/control/Control'
import Map from 'ol/map'
import {OlMapPart} from './ol-map-part'

/**
 * A base element for implementing map controls.
 *
 * To place it on the map, a `id` must be set
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
 * @demo demo/control.html
 * @customElement
 */
@customElement('ol-control')
export default class OlControl extends OlMapPart<Control> {
    public static addToMap(c: Control, map: Map) {
        map.addControl(c)
    }

    public static removeFromMap(c: Control, map: Map) {
        map.removeControl(c)
    }

    public async createPart() {
        const tempDiv = document.createElement('div')
        const slot = this.id
        this.slot = slot

        render(html`
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
</div>`, tempDiv)

        const control = new Control({
            element: tempDiv.firstElementChild,
        })

        return control
    }

    protected render() {
        return html`<slot></slot>`
    }
}
