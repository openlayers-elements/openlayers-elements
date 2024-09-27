import Select from 'ol/interaction/Select.js'
import OlInteraction from '@openlayers-elements/core/ol-interaction.js'
import { StyleLike } from 'ol/style/Style.js'
import type Feature from 'ol/Feature.js'
import { property } from 'lit/decorators.js'
import { loadStyle } from 'ol-json-style' // eslint-disable-line import/no-extraneous-dependencies

/**
 * Non-visual element which enables selecting map features
 *
 * To use, nest inside `<ol-map>` and attach the `feature-selected` event
 *
 * ```html
 * <ol-map>
 *   <ol-select \@feature-selected="handleSelection"></ol-select>
 * </ol-map>
 * ```
 *
 * @customElement
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

  @property({
    type: Object,
    attribute: 'feature-style',
    converter: loadStyle,
  })
  public featureStyle?: StyleLike

  public async createPart() {
    const select = new Select()

    select.on(['select'], (e: any) => {
      const feature: Feature | undefined = e.selected[0]

      if (feature) {
        if (this.featureStyle) {
          feature.setStyle(this.featureStyle)
        }

        this.dispatchEvent(
          new CustomEvent('feature-selected', {
            detail: { feature },
          }),
        )
      } else {
        this.dispatchEvent(new CustomEvent('feature-unselected'))
      }
    })

    return select
  }
}

customElements.define('ol-select', OlSelect)
