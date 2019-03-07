import Interaction from 'ol/interaction/Interaction'
import Map from 'ol/map'
import {OlMapPart} from './ol-map-part'

/**
 * Base class for implementing interactions
 */
export default abstract class OlInteraction extends OlMapPart<Interaction> {
  public static addToMap(i: Interaction, map: Map) {
    map.addInteraction(i)
  }

  public static removeFromMap(i: Interaction, map: Map) {
    map.removeInteraction(i)
  }
}
