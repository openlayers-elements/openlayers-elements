import OlFeature from '@openlayers-elements/core/ol-feature'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
// @ts-ignore
import {fromLonLat} from 'ol/proj'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

export default class OlMarkerIcon extends OlFeature {
    public createFeature() {
        const feature = new Feature({
            geometry: new Point(fromLonLat([-3.683333, 40.4])),
        })

        feature.setStyle(new Style({
            image: new Icon(({
                src: '../assets/icon.png',
            })),
        }))

        return feature
    }
}

customElements.define('ol-marker-icon', OlMarkerIcon)
