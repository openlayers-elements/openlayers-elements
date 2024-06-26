import { html, LitElement } from 'lit'
import { property, query } from 'lit/decorators.js'
import OpenLayersMap from 'ol/Map.js'
import { MapEvent } from 'ol'
// import type { Coordinate } from 'ol/coordinate.js'
// import type { Pixel } from 'ol/pixel.js'
import SimpleGeometry from 'ol/geom/SimpleGeometry.js'
import { fromLonLat, get as getProjection, toLonLat } from 'ol/proj.js'
import View, { FitOptions } from 'ol/View.js'
// import Overlay from 'ol/Overlay.js'
import { inAndOut } from 'ol/easing.js'
import AttachableAwareMixin from './mixins/AttachableAware.js'
import { forwardEvents } from './lib/events.js'
import {
  getTransform,
  getTransformOrigin,
  computeTransformMatrix,
  // transformVertex,
  // projectVertex,
  identity,
} from './lib/3dMatrix.js'

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
 * 2. with latitude and longitude
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
   * @param {MapEvent} event - The moveend event from OpenLayers
   */

  /**
   * Forwards `change` event from OpenLayers object
   *
   * @event change
   * @param {MapEvent} event - The change event from OpenLayers
   */

  /**
   * Fired when the map finished moving, as the result of human interaction, as well as programmatically
   *
   * @event view-change
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   */

  /**
   * Zoom level
   * @type {number}
   */
  @property({ type: Number })
  public zoom: number = 1

  /**
   * Longitude
   * @type {number}
   */
  @property({ type: Number })
  public lon: number = 0

  /**
   * Latitude
   * @type {number}
   */
  @property({ type: Number })
  public lat: number = 0

  /**
   * @ignore
   */
  @query('div')
  public mapElement!: HTMLDivElement

  /**
   * @ignore
   */
  private static readonly __forwardedEvents: string[] = ['moveend', 'change']

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
   * Enable map perspective, i.e. viewing at a pitched angle
   * The default is 0° (nadir, straight down), with max 30° pitch possible.
   * @type {number}
   */
  @property({ type: Number })
  public pitch: number = 0

  private _pitch: number = 0
  private matrixTransform: number[][] | null = null
  private fromAngle: number = 0
  private animationFrameId: number | null = null

  /**
   * The underlying OpenLayers map instance
   * @type {OpenLayersMap | undefined}
   * @ignore
   */
  public map?: OpenLayersMap

  /**
   * Resize observer for handling map size changes
   * @type {ResizeObserver}
   */
  public sizeObserver: ResizeObserver

  public constructor() {
    super()
    this.sizeObserver = new ResizeObserver(() => {
      if (this.map) {
        this.map.updateSize()
      }
    })

    // // If map is pitched, we need to override overlay
    // if (this.pitch) {
    //   this.__overrideOverlay()
    // }
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
    const viewInit: any = {
      center: [0, 0],
      resolution: this.resolution,
      zoom: this.zoom,
    }

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

    if (this._pitch > 0) {
      this._pitch = this.pitch
      this.__setPerspective()
    }

    forwardEvents(OlMap.__forwardedEvents, this, this.map)
    this.map.on('moveend', this.__dispatchViewChange.bind(this))

    this.notifyReady()
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    // Allow reactive update of pitch
    if (changedProperties.has('pitch')) {
      this._pitch = this.pitch
      this.__setPerspective()
    }

    // // Allow reactive update of zoom
    // // FIXME this does not work as intended
    // if (changedProperties.has('zoom')) {
    //   const newZoom = changedProperties.get('zoom') as number
    //   if (newZoom >= 1 && newZoom <= 25) {
    //     this.map?.getView().setZoom(newZoom)
    //   }
    // }

    super.updated(changedProperties)
  }

  public render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v9.2.4/ol.css" type="text/css" />
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

  // /**
  //  * Get pixel ratio for the map
  //  * @private
  //  */
  // private __getPixelRatio(): number {
  //   return window.devicePixelRatio || 1
  // }

  /**
   * Set perspective angle
   * @private
   */
  private __setPerspective() {
    if (!this.map) return

    // Cancel previous animation frame if exists
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }

    // Enforce pitch bounds
    if (this.pitch >= 30) {
      this._pitch = 30
      return
    }
    if (this.pitch <= 0) {
      this._pitch = 0
      return
    }

    const toAngle = Math.round(this._pitch * 10) / 10

    const target = this.map?.getTarget()
    const targetElement = typeof target === 'string' ? document.getElementById(target) : target
    const { style } = targetElement?.querySelector('.ol-layers') as HTMLDivElement

    // Start new animation frame
    this.animationFrameId = requestAnimationFrame((t) => {
      this.__animatePerspective(t, t, style, this.fromAngle, toAngle, 500, inAndOut)
    })
  }

  /**
   * Animate the perspective
   * @param {number} t0 starting timestamp
   * @param {number} t current timestamp
   * @param {CSSStyleDeclaration} style style to modify
   * @param {number} fromAngle starting angle
   * @param {number} toAngle ending angle
   * @param {number} duration The duration of the animation in milliseconds, default 500
   * @param {function} easing The easing function used during the animation, defaults to ol.easing.inAndOut).
   * @private
   */
  private __animatePerspective(
    t0: number,
    t: number,
    style: CSSStyleDeclaration,
    fromAngle: number,
    toAngle: number,
    duration: number,
    easing: (t: number) => number,
  ) {
    let dt,
      end
    if (duration === 0) {
      dt = 1
      end = true
    } else {
      dt = (t - t0) / (duration || 500)
      end = dt >= 1
    }
    dt = easing(dt)

    if (end) {
      this.fromAngle = toAngle
    } else {
      this.fromAngle = fromAngle + (toAngle - fromAngle) * dt
    }
    const fac = this.fromAngle / 30
    style.transform = `translateY(-${17 * fac}%) perspective(200px) rotateX(${this.fromAngle}deg) scaleY(${1 - fac / 2})`
    this.__getMatrix3D(true)
    this.render()
    if (!end) {
      requestAnimationFrame((t) => {
        this.__animatePerspective(t0, t, style, fromAngle, toAngle, duration || 500, easing || inAndOut)
      })
    }

    const newFromAngle = this.fromAngle
    this.dispatchEvent(new CustomEvent('change:perspective', {
      detail: {
        newFromAngle,
        animating: !end,
      },
    }))
  }

  /**
   * Get map full transform matrix3D
   * @param {boolean} compute Whether to compute the matrix
   * @returns {Array<Array<number>>} The transform matrix
   * @private
   */
  private __getMatrix3D(compute: boolean): number[][] {
    if (compute) {
      const ele = this.map!.getTarget() as HTMLElement
      const targetElement = ele.querySelector('.ol-layers') as HTMLDivElement
      const tx = getTransform(targetElement)
      const txOrigin = getTransformOrigin(targetElement)
      this.matrixTransform = computeTransformMatrix(tx, txOrigin)
    }
    if (!this.matrixTransform) this.matrixTransform = identity()
    return this.matrixTransform
  }

  // /**
  //  * Get pixel at screen from coordinate.
  //  * Required to get an accurate coordinate when the map is distorted via
  //  * perspective / tilt.
  //  *
  //  * @param {Coordinate} coord - The coordinate to get the pixel for
  //  * @returns {Pixel} The pixel coordinates
  //  * @private
  //  */
  // private __getPixelScreenFromCoordinate(coord: Coordinate): [number, number] {
  //   const px = this.map!.getPixelFromCoordinate(coord)
  //   const fullTx = this.__getMatrix3D(true)
  //   let pixel: Pixel = transformVertex(fullTx, [px[0], px[1]])
  //   pixel = projectVertex(pixel)
  //   return [pixel[0], pixel[1]]
  // }

  // /**
  //  * Override `updatePixelPosition` function of `ol.Overlay` for perspective map.
  //  * This is required to correctly use ol.Draw and get accurate coordinates from
  //  * the event on the tilted map
  //  * @private
  //  */
  // private __overrideOverlay() {
  //   const _updatePixelPosition = (Overlay.prototype as any).updatePixelPosition

  //   Overlay.prototype.updatePixelPosition = function () {
  //     const map = this.getMap()
  //     if (map instanceof OlMap) {
  //       const position = this.getPosition()
  //       if (!map || !map.isRendered() || !position) {
  //         this.setVisible(false)
  //         return
  //       }
  //       const pixel = map.__getPixelScreenFromCoordinate(position)

  //       const mapSize = map.getSize()
  //       if (!mapSize) return

  //       pixel[0] -= mapSize[0] / 4
  //       pixel[1] -= mapSize[1] / 4
  //       this.updateRenderedPosition(pixel, mapSize)
  //     } else {
  //       _updatePixelPosition.call(this)
  //     }
  //   }
  // }
}

customElements.define('ol-map', OlMap)
