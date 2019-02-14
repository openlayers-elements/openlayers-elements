import {customElement} from 'lit-element'
import Interaction from 'ol/interaction/Interaction'
import Select from 'ol/interaction/Select'
import OlInteraction from './ol-interaction'

/**
 * Non-visual element which enables selecting map features
 *
 * To use, nest inside `<ol-map>` and attach the `feature-selected` event
 *
 * ```html
 * <ol-map>
 *   <ol-select @feature-selected="handleSelection"></ol-select>
 * </ol-map>
 * ```
 *
 * @customElement
 * @demo demo/select.html
 */
@customElement('ol-select')
export class OlSelect extends OlInteraction {
    /**
     * Fired when a feature has been selected
     *
     * @event feature-selected
     * @param {feature} feature The selected feature
     */

    /**
     * Fired when a selection has been cleared
     *
     * @event feature-unselected
     */

    createPart(): Interaction {
        const select = new Select();

        select.on(['select'], (e: any) => {
            const feature = e.selected[0]

            if (feature) {
                this.dispatchEvent(new CustomEvent('feature-selected', {
                    detail: {feature}
                }))
            } else {
                this.dispatchEvent(new CustomEvent('feature-unselected'))
            }
        })

        return select
    }
}
