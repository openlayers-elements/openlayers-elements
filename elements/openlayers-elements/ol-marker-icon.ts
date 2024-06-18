import OlFeature from '@openlayers-elements/core/ol-feature.js'
import { property } from 'lit/decorators.js'
import Feature from 'ol/Feature.js'
import Point from 'ol/geom/Point.js'
import { fromLonLat } from 'ol/proj.js'
import { Style, Icon } from 'ol/style.js'
import type { IconAnchorUnits, IconOrigin } from 'ol/style/Icon.js'
import type { FlatIcon } from 'ol/style/flat.js'
import type { Size } from 'ol/size.js'
import OlMap from './ol-map.js'

/**
 * A basic map marker. Loaded from an image file
 *
 * To use, nest it directly under a vector layer.
 *
 * ```html
 * <ol-map>
 *   <ol-layer-vector>
 *     <ol-marker-icon src="pin.png" lon="41" lat="21" />
 *   </ol-layer-vector>
 * </ol-map>
 * ```
 *
 * To position the marker on the map, a combination of its properties have to be used
 *
 * 1. The base position is either `[x, y]` or `[lat, lon]`
 * 1. The anchor on the map is by default the image's center and can be changed by setting the `anchor*` properties
 *
 * For an in-depth description of individual properties go to OpenLayer's docs for [ol/Style/Icon](https://openlayers.org/en/latest/apidoc/module-ol_style_Icon.html)
 */
export default class OlMarkerIcon extends OlFeature {
  /**
   * The image source URL (required)
   *
   * @type {string}
   */
  @property({ type: String })
  public src?: string = undefined

  /**
   * @type {number}
   */
  @property({ type: Number })
  public lon?: number = undefined

  /**
   * @type {number}
   */
  @property({ type: Number })
  public lat?: number = undefined

  /**
   * @type {number}
   */
  @property({ type: Number })
  public x = 0

  /**
   * @type {number}
   */
  @property({ type: Number })
  public y = 0

  /**
   * @type {number}
   */
  @property({ type: Number, attribute: 'anchor-x' })
  public anchorX = 0.5

  /**
   * @type {number}
   */
  @property({ type: Number, attribute: 'anchor-y' })
  public anchorY = 0.5

  /**
   * @type {IconAnchorUnits}
   */
  @property({ type: String, attribute: 'anchor-x-units' })
  public anchorXUnits?: IconAnchorUnits = undefined

  /**
   * @type {IconAnchorUnits}
   */
  @property({ type: String, attribute: 'anchor-y-units' })
  public anchorYUnits?: IconAnchorUnits = undefined

  /**
   * @type {IconOrigin}
   */
  @property({ type: String, attribute: 'anchor-origin' })
  public anchorOrigin?: IconOrigin = undefined

  /**
   * @type {string}
   */
  @property({ type: String })
  public color?: string = undefined

  /**
   * @type {string}
   */
  @property({ type: String, attribute: 'cross-origin' })
  public crossOrigin?: string = undefined

  /**
   * @type {number}
   */
  @property({ type: Number, attribute: 'offset-x' })
  public offsetX = 0

  /**
   * @type {number}
   */
  @property({ type: Number, attribute: 'offset-y' })
  public offsetY = 0

  /**
   * @type {IconOrigin}
   */
  @property({ type: String, attribute: 'offset-origin' })
  public offsetOrigin?: IconOrigin = undefined

  /**
   * @type {number}
   */
  @property({ type: Number })
  public opacity = 1

  /**
   * @type {number}
   */
  @property({ type: Number })
  public scale = 1

  /**
   * @type {number}
   */
  @property({ type: Number })
  public rotation = 0

  /**
   * @type {boolean}
   */
  @property({ type: Boolean, attribute: 'rotate-with-view' })
  public rotateWithView = false

  /**
   * @type {Size}
   */
  @property({ type: Array })
  public size?: Size = undefined

  public createFeature(map: OlMap | undefined) {
    let point = new Point([this.x, this.y])
    if (this.lat && this.lon) {
      point = new Point(fromLonLat([this.lon, this.lat], map?.projection))
    }

    const feature = new Feature({
      geometry: point,
    })

    feature.setStyle(this.flatIconToStyle(this.__iconInit))

    return feature
  }

  private get __iconInit(): FlatIcon {
    return {
      'icon-anchor': [this.anchorX, this.anchorY],
      'icon-anchor-origin': this.anchorOrigin,
      'icon-anchor-x-units': this.anchorXUnits,
      'icon-anchor-y-units': this.anchorYUnits,
      'icon-color': this.color,
      'icon-cross-origin': this.crossOrigin,
      'icon-offset': [this.offsetX, this.offsetY],
      'icon-offset-origin': this.offsetOrigin,
      'icon-opacity': this.opacity,
      'icon-scale': this.scale,
      'icon-rotate-with-view': this.rotateWithView,
      'icon-rotation': this.rotation,
      'icon-size': this.size,
      'icon-src': this.src,
    }
  }

  /**
   * Converts a FlatIcon object to an OpenLayers Style object.
   *
   * OpenLayers does not directly support passing styles as FlatIcon objects to Features.
   * This method serves as a workaround to convert a FlatIcon object, which uses the
   * flatstyle format, into an OpenLayers Style object that can be applied to a Feature.
   *
   * @param {FlatIcon} flatIcon - The FlatIcon object containing style properties.
   * @returns {Style} - The OpenLayers Style object.
   */
  private flatIconToStyle(flatIcon: FlatIcon) {
    return new Style({
      image: new Icon({
        anchor: flatIcon['icon-anchor'] as number[],
        anchorOrigin: flatIcon['icon-anchor-origin'] as IconOrigin,
        anchorXUnits: flatIcon['icon-anchor-x-units'] as IconAnchorUnits,
        anchorYUnits: flatIcon['icon-anchor-y-units'] as IconAnchorUnits,
        color: flatIcon['icon-color'] as string,
        crossOrigin: flatIcon['icon-cross-origin'] as string,
        offset: flatIcon['icon-offset'] as number[],
        offsetOrigin: flatIcon['icon-offset-origin'] as IconOrigin,
        opacity: flatIcon['icon-opacity'] as number,
        scale: flatIcon['icon-scale'] as number,
        rotation: flatIcon['icon-rotation'] as number,
        rotateWithView: flatIcon['icon-rotate-with-view'] as boolean,
        size: flatIcon['icon-size'] as Size,
        src: flatIcon['icon-src'] as string,
      }),
    })
  }
}

customElements.define('ol-marker-icon', OlMarkerIcon)
