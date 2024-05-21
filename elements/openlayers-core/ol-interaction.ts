import Interaction from 'ol/interaction/Interaction.js'
import Map from 'ol/Map.js'
import { OlMapPart } from './ol-map-part.js'

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
