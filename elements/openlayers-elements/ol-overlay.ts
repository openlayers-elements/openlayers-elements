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
  public autoPan = false

  @property({type: Number, attribute: 'auto-pan-animation-duration'})
  public autoPanAnimationDuration = 0

  public get overlay() {
    return this.__overlay
  }

  private __overlay: Overlay

  protected _addToMap(map: Map, overlay: Overlay) {
    map.addOverlay(overlay)
  }

  protected _removeFromMap(map: Map, overlay: Overlay) {
    map.removeOverlay(overlay)
  }

  public async createPart() {
    if (!this.id) {
      throw new Error('ol-overlay element must have an id')
    }

    const slot = this.id
    this.slot = slot

    const slotEl = document.createElement('slot')
    slotEl.name = slot

    this.__overlay = new Overlay({
      element: slotEl,
      autoPan: this.autoPan,
      autoPanAnimation: {
        duration: this.autoPanAnimationDuration,
      } as any,
    })

    // hack to get panning correctly calculate overlay dimensions,
    // which would otherwise be calculated from the <slot> element
    this.overlay.getElement = () => {
      return this
    }

    return this.overlay
  }

  public render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('ol-overlay', OlOverlay)
