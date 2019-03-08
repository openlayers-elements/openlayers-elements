import Interaction from 'ol/interaction/Interaction'
import Map from 'ol/map'
import {OlMapPart} from './ol-map-part'

/**
 * Base class for implementing interactions
 */
export default abstract class OlInteraction extends OlMapPart<Interaction> {
  public _addToMap(map: Map, i: Interaction) {
    map.addInteraction(i)
  }

  public _removeFromMap(map: Map, i: Interaction) {
    map.removeInteraction(i)
  }
}
