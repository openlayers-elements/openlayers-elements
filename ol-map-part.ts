import {LitElement} from 'lit-element'

export abstract class OlMapPart<T> extends LitElement {
    abstract createPart(): T
}
