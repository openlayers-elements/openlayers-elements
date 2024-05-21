import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import OlLayerBase from '@openlayers-elements/core/ol-layer-base.js'

/**
 * A basic OpenStreetMap tile layer
 *
 * @customElement
 * @demo https://openlayers-elements.netlify.com/demo/ol-map/ Standard map
 * @demo https://openlayers-elements.netlify.com/demo/swiss-topo/ Mix with swisstopo elements
 */
export default class OlLayerOpenstreetmap extends OlLayerBase<TileLayer<any>> {
  protected async _createLayer() {
    return new TileLayer({
      source: new OSM(),
    })
  }
}

customElements.define('ol-layer-openstreetmap', OlLayerOpenstreetmap)
