import { property } from 'lit/decorators.js'
import TileLayer from 'ol/layer/Tile.js'
import XYZ from 'ol/source/XYZ.js'
import OlLayerBase from '@openlayers-elements/core/ol-layer-base.js'

/**
 * A simple layer element, sourcing from a raster tile server using X/Y/Z coordinates
 *
 * @demo https://openlayers-elements.netlify.com/demo/xyz/
 * @customElement
 */
export default class OlLayerXyz extends OlLayerBase<TileLayer<any>> {
  private __url?: string = undefined

  /**
   * The url template for the source tiles. The `x`, `y`, `z` parameters must be provided wrapped in
   * curly brackets (not using ES6 interpolation syntax)
   *
   * @type {String}
   */
  @property({ type: String })
  public get url(): string | undefined {
    return this.__url
  }

  public set url(value: string | undefined) {
    this.__url = value
  }

  /**
   * An optional set of URL templates to be used to load tiles
   *
   * @type {Array}
   */
  @property({ type: String })
  public urls?: string[] = undefined

  protected async _createLayer() {
    return new TileLayer({
      source: new XYZ({
        url: this.url,
        urls: this.urls,
      }),
    })
  }
}

customElements.define('ol-layer-xyz', OlLayerXyz)
