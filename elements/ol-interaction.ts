import {OlMapPart} from './ol-map-part'
import Interaction from 'ol/interaction/Interaction'
import Map from 'ol/map'

export default abstract class OlInteraction extends OlMapPart<Interaction> {
    static addToMap(i: Interaction, map: Map) {
        map.addInteraction(i)
    }

    static removeFromMap(i: Interaction, map: Map) {
        map.removeInteraction(i)
    }
}
