import Feature from 'ol/Feature'

export default abstract class OlFeature extends HTMLElement {
    public abstract createFeature(): Feature
}
