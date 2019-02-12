import {LitElement} from 'lit-element'

/**
 * Abstract class used to create map objects such as layers and interactions
 */
export abstract class OlMapPart<T> extends LitElement {
    abstract createPart(): T
}
