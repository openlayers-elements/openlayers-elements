import Feature from 'ol/Feature'
import {LitElement} from 'lit-element'

export default abstract class OlFeature extends LitElement {
    public abstract createFeature(): Feature
}
