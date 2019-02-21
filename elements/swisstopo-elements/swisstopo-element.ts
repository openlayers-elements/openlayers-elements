import {LitElement, property} from 'lit-element'

let SwisstopoElementMixin
type Constructor = new (...args: any[]) => LitElement

/**
 * Base mixin for swisstopo elements
 *
 * @polymer
 * @mixinFunction
 */
SwisstopoElementMixin = function<B extends Constructor>(Base: B) { // tslint:disable-line only-arrow-functions
    /**
     * Base class for swisstopo elements
     *
     * @mixinClass
     */
    class SwisstopoElement extends Base {
        /**
         * One of the official layer names provided by geo.admin.ch.
         *
         * Complete list of layers is available
         * [here](http://api3.geo.admin.ch/api/faq/index.html#which-layers-are-available)
         *
         * @type {string}
         */
        @property({ type: String, attribute: 'layer-name' })
        public layerName: string = null
    }

    return SwisstopoElement
}

export default SwisstopoElementMixin
