import {customElement, html} from 'lit-element'
import Control from 'ol/control/Control'
import {render} from 'lit-html'
import Map from 'ol/map'
import {OlMapPart} from './ol-map-part'

@customElement('ol-control')
export default class OlControl extends OlMapPart<Control> {
    createPart() {
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

    static addToMap(c: Control, map: Map) {
        map.addControl(c)
    }

    static removeFromMap(c: Control, map: Map) {
        map.removeControl(c)
    }

    render() {
        return html`<slot></slot>`
    }
}
