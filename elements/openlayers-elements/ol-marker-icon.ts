import OlFeature from '@openlayers-elements/core/ol-feature'
import {property} from 'lit-element'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
// @ts-ignore
import {fromLonLat} from 'ol/proj'
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'

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

    public createFeature() {
        let point = new Point([this.x, this.y])
        if (this.lat && this.lon) {
            point = new Point(fromLonLat([this.lon, this.lat]))
        }

        const feature = new Feature({
            geometry: point,
        })

        feature.setStyle(new Style({
            image: new Icon(({
                src: this.src,
            })),
        }))

        return feature
    }
}

customElements.define('ol-marker-icon', OlMarkerIcon)
