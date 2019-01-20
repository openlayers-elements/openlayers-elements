import {customElement} from 'lit-element'
import Interaction from 'ol/interaction/Interaction'
import Select from 'ol/interaction/Select'
import OlInteraction from './ol-interaction'

@customElement('ol-select')
export class OlSelect extends OlInteraction {
    createPart(): Interaction {
        const select = new Select();

        select.on(['select'], (e) => {
            this.dispatchEvent(new CustomEvent('feature-selected', {
                detail: {
                    value: e.target.getFeatures().item(0)
                }
            }))
        })

        return select
    }
}
