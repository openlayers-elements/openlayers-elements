import {OlMapPart} from '@openlayers-elements/core/ol-map-part'
import Overlay from 'ol/Overlay'
import Map from 'ol/map'
import {html} from 'lit-html'
import {property} from 'lit-element'

/**
 * @demo https://openlayers-elements.netlify.com/demo/overlay.html
 * @customElement
 */
export default class OlOverlay extends OlMapPart<Overlay> {
  @property({type: Boolean, attribute: 'auto-pan'})
  public autoPan: boolean

  @property({type: Number, attribute: 'auto-pan-animation-duration'})
  public autoPanAnimationDuration: number

  protected _overlay: Overlay

  protected _addToMap(map: Map, overlay: Overlay) {
    map.addOverlay(overlay)
  }

  protected _removeFromMap(map: Map, overlay: Overlay) {
    map.removeOverlay(overlay)
  }

  public async createPart() {
    const slot = this.id
    this.slot = slot

    const slotEl = document.createElement('slot')
    slotEl.name = slot

    this._overlay = new Overlay({
      element: slotEl,
      autoPan: true,
      autoPanAnimation: {
        duration: this.autoPanAnimationDuration,
      } as any,
    })

    // hack to get panning correctly calculate overlay dimensions,
    // which would otherwise be calculated from the <slot> element
    this._overlay.getElement = () => {
      return this
    }

    return this._overlay
  }

  public render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('ol-overlay', OlOverlay)
