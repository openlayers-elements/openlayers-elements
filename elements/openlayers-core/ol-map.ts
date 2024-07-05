import { css, html, LitElement } from 'lit'
import { property, query } from 'lit/decorators.js'
import OpenLayersMap from 'ol/Map.js'
import { MapEvent } from 'ol'
import SimpleGeometry from 'ol/geom/SimpleGeometry.js'
import { fromLonLat, get as getProjection, toLonLat } from 'ol/proj.js'
import View, { FitOptions } from 'ol/View.js'
import AttachableAwareMixin from './mixins/AttachableAware.js'
import { forwardEvents } from './lib/events.js'

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
 * ### Setting the map container height
 *
 * By default ol-map has `flex: 1` styling, so it will expand to fill the parent element.
 * To achieve this set the `display: flex` CSS property on your parent element.
 *
 * ```html
 * <div id="parent-element">
 *   <ol-map>
 *     ...
 *   </ol-map>
 * </div>
 * ```
 *
 * ```css
 * #parent-element {
 *   display: flex;
 *   height: 400px;
 * }
 * ```
 *
 * Alternatively, the ol-map class styling can be overriden:
 *
 * ```css
 * ol-map {
 *   height: 80vh;
 * }
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
 * @appliesMixin AttachableAwareMixin
 * @customElement
 */
export default class OlMap extends AttachableAwareMixin(LitElement, 'map') {
  /**
   * Forwards `moveend` event from OpenLayers object
   *
   * @event moveend
   * @param {detail} the event itself
   */

  /**
   * Forwards `change` event from OpenLayers object
   *
   * @event change
   * @param {detail} the event itself
   */

  /**
   * Fired when the map finished moving, as the result of human interaction, as well as programmatically
   *
   * @event view-change
   * @param {lat} latitude
   * @param {lon} longitude
   */

  static get styles() {
    return css`
      :host {
        flex: 1;
      }
    `
  }

  /**
   * Zoom level
   * @type {Number}
   */
  @property({ type: Number })
  public zoom = 1

  /**
   * Longitude
   * @type {Number}
   */
  @property({ type: Number })
  public lon = 0

  /**
   * Latitude
   * @type {Number}
   */
  @property({ type: Number })
  public lat = 0

  /**
   * @ignore
   */
  @query('div')
  public mapElement!: HTMLDivElement

  /**
   * @ignore
   */
  private static get __forwardedEvents() {
    return ['moveend', 'change']
  }

  /**
   * A string identifier of the projection to be used. Custom projections can be added using [`proj4` library][p4].
   *
   * If falsy, the default projection is applied (Spherical Mercator aka EPSG:3857), which uses meters for map units.
   *
   * [p4]: https://github.com/proj4js/proj4js
   *
   * @type {string}
   */
  @property({ type: String })
  public projection?: string = undefined

  /**
   * Sets the zoom level by directly selecting the resolution.
   *
   * @type {number}
   */
  @property({ type: Number })
  public resolution?: number = undefined

  /**
   * The X coordinate on the map in map units (see `projection`).
   *
   * @type {number}
   */
  @property({ type: Number })
  public x?: number = undefined

  /**
   * The Y coordinate on the map in map units (see `projection`).
   *
   * @type {number}
   */
  @property({ type: Number })
  public y?: number = undefined

  /**
   * The underlying OpenLayers map instance
   * @type {Object}
   * @ignore
   */
  public map?: OpenLayersMap = undefined

  /**
   * @ignore
   */
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

    forwardEvents(OlMap.__forwardedEvents, this, this.map)
    this.map.on('moveend', this.__dispatchViewChange.bind(this))

    this.notifyReady()
  }

  public render() {
    return html`
      <link rel="stylesheet" href="https://openlayers.org/en/v6.5.0/css/ol.css" type="text/css" />
      <style>
        :host {
          display: block;
        }

        #map {
          height: 100%;
        }
      </style>
      <div id="map"></div>
      <slot></slot>
    `
  }

  public fit(extent: SimpleGeometry | number[], options?: FitOptions) {
    this.map?.getView().fit(extent, {
      size: this.map.getSize(),
      // constrainResolution: false,
      nearest: false,
      ...options,
    })
  }

  private __dispatchViewChange(event: MapEvent) {
    if (!event.frameState) {
      return
    }

    const { center } = event.frameState.viewState
    const [lon, lat] = toLonLat(center, this.projection)

    this.dispatchEvent(new CustomEvent('view-change', {
      detail: {
        ...event.frameState.viewState,
        lat,
        lon,
      },
    }))
  }
}

customElements.define('ol-map', OlMap)
