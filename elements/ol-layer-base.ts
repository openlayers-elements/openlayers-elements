import {LitElement} from 'lit-element'
import Layer from 'ol/layer/base'

export default abstract class OlLayerBase extends LitElement {
    abstract createLayer(): Layer;
}
