import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import OlLayerBase from './ol-layer-base'

/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 * @demo demo/ol-map.html Standard map
 * @demo demo/swiss-topo.html Mix with swisstopo elements
 */
export default class OlLayerOpenstreetmap extends OlLayerBase<TileLayer> {
  protected async _createLayer() {
    return new TileLayer({
      source: new OSM(),
    })
  }
}

customElements.define('ol-layer-openstreetmap', OlLayerOpenstreetmap)
