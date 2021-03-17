import Interaction from 'ol/interaction/Interaction'
import Map from 'ol/Map'
import { OlMapPart } from './ol-map-part'

/**
 * Base class for implementing interactions
 */
export default abstract class OlInteraction extends OlMapPart<Interaction> {
  protected _addToMap(map: Map, i: Interaction) {
    map.addInteraction(i)
  }

  protected _removeFromMap(map: Map, i: Interaction) {
    map.removeInteraction(i)
  }
}
