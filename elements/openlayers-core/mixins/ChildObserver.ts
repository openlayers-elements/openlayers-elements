import {LitElement} from 'lit-element'
import ShadyObserverMixin from './ShadyChildObserver'

let ChildObserverMixin
type Constructor = new (...args: any[]) => LitElement

/**
 * Mixin which helps handling child nodes being added and removed
 *
 * @polymer
 * @mixinFunction
 */
ChildObserverMixin = function<B extends Constructor>(Base: B) { // tslint:disable-line only-arrow-functions
    /**
     * Class implementing the child observer mixin
     *
     * @mixinClass
     */
    class ChildObservingElement extends Base {
        private childObserver: MutationObserver

        public connectedCallback() {
            super.connectedCallback()
            this.childObserver = this.connectObserver()
        }

        public disconnectedCallback() {
            super.disconnectedCallback()
            this.disconnectObserver()
        }

        protected connectObserver(): MutationObserver {
            const observer = new MutationObserver(this.handleMutation.bind(this))
            observer.observe(this, { childList: true })
            return observer
        }

        protected disconnectObserver() {
            this.childObserver.disconnect()
        }

        protected handleRemovedChildNode() {
            // to be implemented in mixed class
        }

        protected handleAddedChildNode() {
            // to be implemented in mixed class
        }

        protected notifyMutationComplete() {
            // to be implemented in mixed class
        }

        private handleMutation(mutationList: MutationRecord[]) {
            mutationList
                .forEach((mutation) => {
                    mutation.removedNodes.forEach(this.handleRemovedChildNode.bind(this))
                    mutation.addedNodes.forEach(this.handleAddedChildNode.bind(this))
                })

            this.notifyMutationComplete()
        }
    }

    if ('ShadyDOM' in window) {
        return ShadyObserverMixin(ChildObservingElement)
    }

    return ChildObservingElement
}

export default ChildObserverMixin
