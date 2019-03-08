import Feature from 'ol/Feature'
import OlFeature from "@openlayers-elements/core/ol-feature";

export default class OlTestFeature extends OlFeature {
  createFeature(): Feature {
    return new Feature();
  }

}

customElements.define('ol-test-feature', OlTestFeature)
