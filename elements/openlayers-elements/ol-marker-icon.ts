import OlFeature from '@openlayers-elements/core/ol-feature'
import {property} from 'lit-element'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
// @ts-ignore
import {fromLonLat} from 'ol/proj'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import { olx, Size, style } from "openlayers";
import IconAnchorUnits = style.IconAnchorUnits
import IconOrigin = style.IconOrigin
import IconOptions = olx.style.IconOptions;

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
 * 1. The anchor on the map is by default the image's center and can be change by setting the `anchor*` properties
 *
 * For an in-depth description of individual properties go to OpenLayer's docs for [ol/Style/Icon](https://openlayers.org/en/latest/apidoc/module-ol_style_Icon.html)
 *
 * @demo demo/markers.html
 */
export default class OlMarkerIcon extends OlFeature {
  /**
   * The image source URL (required)
   *
   * @type {string}
   */
  @property({type: String})
  public src: string = undefined

  /**
   * @type {number}
   */
  @property({type: Number})
  public lon: number = undefined

  /**
   * @type {number}
   */
  @property({type: Number})
  public lat: number = undefined

  /**
   * @type {number}
   */
  @property({type: Number})
  public x: number = 0

  /**
   * @type {number}
   */
  @property({type: Number})
  public y: number = 0

  /**
   * @type {number}
   */
  @property({type: Number, attribute: 'anchor-x'})
  public anchorX: number = 0.5

  /**
   * @type {number}
   */
  @property({type: Number, attribute: 'anchor-y'})
  public anchorY: number = 0.5

  /**
   * @type {IconAnchorUnits}
   */
  @property({type: String, attribute: 'anchor-x-units'})
  public anchorXUnits?: IconAnchorUnits = undefined

  /**
   * @type {IconAnchorUnits}
   */
  @property({type: String, attribute: 'anchor-y-units'})
  public anchorYUnits?: IconAnchorUnits = undefined

  /**
   * @type {IconOrigin}
   */
  @property({type: String, attribute: 'anchor-origin'})
  public anchorOrigin?: IconOrigin = undefined

  /**
   * @type {string}
   */
  @property({type: String})
  public color: string = undefined

  /**
   * @type {string}
   */
  @property({type: String})
  public crossOrigin?: string = undefined

  /**
   * @type {number}
   */
  @property({type: Number, attribute: 'offset-x'})
  public offsetX: number = 0

  /**
   * @type {number}
   */
  @property({type: Number, attribute: 'offset-y'})
  public offsetY: number = 0

  /**
   * @type {IconOrigin}
   */
  @property({type: Number, attribute: 'offset-origin'})
  public offsetOrigin: IconOrigin

  /**
   * @type {number}
   */
  @property({type: Number})
  public opacity: number = 1

  /**
   * @type {number}
   */
  @property({type: Number})
  public scale: number = 1

  /**
   * @type {number}
   */
  @property({type: Number})
  public rotation: number = 0

  /**
   * @type {boolean}
   */
  @property({type: Boolean, attribute: 'rotate-with-view'})
  public rotateWithView: boolean = false

  /**
   * @type {Size}
   */
  @property({type: Number})
  public size?: Size = undefined

  public createFeature() {
    let point = new Point([this.x, this.y])
    if (this.lat && this.lon) {
      point = new Point(fromLonLat([this.lon, this.lat]))
    }

    const feature = new Feature({
      geometry: point,
    })

    feature.setStyle(
      new Style({
        image: new Icon(this.__iconInit),
      }),
    )

    return feature
  }

  private get __iconInit(): IconOptions {
    return {
      anchor: [this.anchorX, this.anchorY],
      anchorOrigin: this.anchorOrigin,
      anchorXUnits: this.anchorXUnits,
      anchorYUnits: this.anchorYUnits,
      color: this.color,
      crossOrigin: this.crossOrigin,
      offset: [this.offsetX, this.offsetY],
      offsetOrigin: this.offsetOrigin,
      opacity: this.opacity,
      scale: this.scale,
      rotateWithView: this.rotateWithView,
      rotation: this.rotation,
      size: this.size,
      src: this.src,
    }
  }
}

customElements.define('ol-marker-icon', OlMarkerIcon)
