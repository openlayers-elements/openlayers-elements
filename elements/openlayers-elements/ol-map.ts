import {html, LitElement, property, query} from 'lit-element'
import OpenLayersMap from 'ol/Map'
// @ts-ignore
import {fromLonLat, get as getProjection} from 'ol/proj'
import View from 'ol/View'
import ResizeObserver from 'resize-observer-polyfill'

/**
 * The main map element. On its own it does not do anything. Has to be combined with layers
 * which are added as [Light DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom#lightdom)
 * children
 *
 * ```html
 * <ol-map>
 *     <ol-layer-openstreetmap></ol-layer-openstreetmap>
 * </ol-map>
 * ```
 *
 * ### Controlling zoom level
 *
 * The simpler way to set zoom is to set the `zoom` property. Alternatively, `resolution` can be used instead.
 *
 * It is important to note that the two properties are mutually exclusive. `zoom` is ignored when `resolution` is set.
 * This is actually a design of OpenLayers as described
 * [here](https://openlayers.org/en/latest/doc/tutorials/concepts.html)
 *
 * ### Setting initial coordinates
 *
 * The position of the map can also be controlled in two ways:
 *
 * 1. with `x`/`y` coordinates
 * 1. with latitude and longitude
 *
 * If `x` and `y` are set, the geographic coordinates are ignored.
 *
 * @demo https://openlayers-elements.netlify.com/demo/ol-map.html
 * @customElement
 */
export default class OlMap extends LitElement {
  /**
   * Zoom level
   * @type {Number}
   */
  @property({type: Number})
  public zoom: number = 1

  /**
   * Longitude
   * @type {Number}
   */
  @property({type: Number})
  public lon: number = 0

  /**
   * Latitude
   * @type {Number}
   */
  @property({type: Number})
  public lat: number = 0

  @query('div')
  public mapElement!: HTMLDivElement

  /**
   * A string identifier of the projection to be used. Custom projections can be added using [`proj4` library][p4].
   *
   * If falsy, the default projection is applied (Spherical Mercator aka EPSG:3857), which uses meters for map units.
   *
   * [p4]: https://github.com/proj4js/proj4js
   *
   * @type {string}
   */
  @property({type: String})
  public projection?: string = undefined

  /**
   * Sets the zoom level by directly selecting the resolution.
   *
   * @type {number}
   */
  @property({type: Number})
  public resolution?: number = undefined

  /**
   * The X coordinate on the map in map units (see `projection`).
   *
   * @type {number}
   */
  @property({type: Number})
  public x?: number = undefined

  /**
   * The Y coordinate on the map in map units (see `projection`).
   *
   * @type {number}
   */
  @property({type: Number})
  public y?: number = undefined

  /**
   * The underlying OpenLayers map instance
   * @type {Object}
   */
  public map?: OpenLayersMap = undefined

  public sizeObserver: ResizeObserver

  public constructor() {
    super()
    this.sizeObserver = new ResizeObserver(() => {
      if (this.map) {
        this.map.updateSize()
      }
    })
  }

  public connectedCallback() {
    super.connectedCallback()
    this.sizeObserver.observe(this)

    this.addEventListener('attaching', (e: CustomEvent) => {
      if (this.map) {
        e.detail.map = Promise.resolve(this)
      } else {
        e.detail.map = new Promise((resolve) => {
          this.addEventListener('map-ready', () => {
            resolve(this)
          })
        })
      }

      e.stopPropagation()
    })
  }

  public disconnectedCallback() {
    super.disconnectedCallback()
    this.sizeObserver.disconnect()
  }

  public firstUpdated() {
    const viewInit = {
      center: [0, 0],
      resolution: this.resolution,
      zoom: this.zoom,
    } as any

    if (this.lon && this.lat) {
      if (this.projection) {
        viewInit.center = fromLonLat([this.lon, this.lat], this.projection)
      } else {
        viewInit.center = fromLonLat([this.lon, this.lat])
      }
    }

    if (this.x && this.y) {
      viewInit.center = [this.x, this.y]
    }

    if (this.projection) {
      viewInit.projection = getProjection(this.projection)
    }
    this.map = new OpenLayersMap({
      target: this.mapElement,
      view: new View(viewInit),
    })

    this.dispatchEvent(new Event('map-ready'))
  }

  public render() {
    return html`
      <link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css" />
      <style>
        :host {
          display: block;
        }
      </style>
      <div id="map"></div>
    `
  }
}

customElements.define('ol-map', OlMap)
