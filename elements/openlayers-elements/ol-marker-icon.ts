import OlFeature from '@openlayers-elements/core/ol-feature'
import {property} from 'lit-element'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
// @ts-ignore
import {fromLonLat} from 'ol/proj'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import {Size, style} from 'openlayers'
import IconAnchorUnits = style.IconAnchorUnits
import IconOrigin = style.IconOrigin

export default class OlMarkerIcon extends OlFeature {
    @property({ type: String })
    public src: string

    @property({ type: Number })
    public lon: number

    @property({ type: Number })
    public lat: number

    @property({ type: Number })
    public x: number = 0

    @property({ type: Number })
    public y: number = 0

    @property({ type: Number, attribute: 'anchor-x'})
    public anchorX: number = 0.5

    @property({ type: Number, attribute: 'anchor-y'})
    public anchorY: number = 0.5

    @property({ type: String, attribute: 'anchor-x-units'})
    public anchorXUnits: IconAnchorUnits = undefined

    @property({ type: String, attribute: 'anchor-y-units'})
    public anchorYUnits: IconAnchorUnits = undefined

    @property({ type: String, attribute: 'anchor-origin' })
    public anchorOrigin: IconOrigin = undefined

    @property({ type: String })
    public color: string

    @property({ type: Number, attribute: 'offset-x'})
    public offsetX: number = 0

    @property({ type: Number, attribute: 'offset-y'})
    public offsetY: number = 0

    @property({ type: Number, attribute: 'offset-origin'})
    public offsetOrigin: IconOrigin

    @property({ type: Number })
    public opacity: number = 1

    @property({ type: Number })
    public scale: number = 1

    @property({ type: Number })
    public rotation: number = 0

    @property({ type: Boolean, attribute: 'rotate-with-view' })
    public rotateWithView: boolean = false

    @property({ type: Number })
    public size: Size = undefined

    public createFeature() {
        let point = new Point([this.x, this.y])
        if (this.lat && this.lon) {
            point = new Point(fromLonLat([this.lon, this.lat]))
        }

        const feature = new Feature({
            geometry: point,
        })

        feature.setStyle(new Style({
            image: new Icon(this.iconInit),
        }))

        return feature
    }

    private get iconInit() {
        return {
            anchor: [this.anchorX, this.anchorY],
            anchorOrigin: this.anchorOrigin,
            anchorXUnits: this.anchorXUnits,
            anchorYUnits: this.anchorYUnits,
            color: this.color,
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
