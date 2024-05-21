import Feature from 'ol/Feature'
import OlFeature from '../../ol-feature.js'

export default class OlTestFeature extends OlFeature {
  createFeature(): Feature {
    return new Feature()
  }
}

customElements.define('ol-test-feature', OlTestFeature)
