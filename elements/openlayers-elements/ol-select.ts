import Select from 'ol/interaction/Select'
import OlInteraction from '@openlayers-elements/core/ol-interaction'

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
 * @demo https://openlayers-elements.netlify.com/demo/select.html
 */
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

  public async createPart() {
    const selectEl = this
    const select = new Select()

    select.on(['select'], (e: any) => {
      const feature = e.selected[0]

      if (feature) {
        selectEl.dispatchEvent(
          new CustomEvent('feature-selected', {
            detail: {feature},
          }),
        )
      } else {
        selectEl.dispatchEvent(new CustomEvent('feature-unselected'))
      }
    })

    return select
  }
}

customElements.define('ol-select', OlSelect)
