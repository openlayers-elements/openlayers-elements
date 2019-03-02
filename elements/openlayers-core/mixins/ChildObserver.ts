import {LitElement} from 'lit-element'
import ShadyObserverMixin from './ShadyChildObserver'

let ChildObserverMixin: <B extends Constructor>(Base: B) => B
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

        protected handleRemovedChildNode(node: Node) {
            // to be implemented in mixed class
        }

        protected handleAddedChildNode(node: Node) {
            // to be implemented in mixed class
        }

        protected notifyMutationComplete() {
            // to be implemented in mixed class
        }

        private handleMutation(mutationList: MutationRecord[]) {
            const mutationHandlers = mutationList
                .reduce((promises, mutation) => {
                    const removals = [...mutation.removedNodes].map((n) => this.handleRemovedChildNode(n))
                    const additions = [...mutation.addedNodes].map((n) => this.handleAddedChildNode(n))

                    return promises.concat(additions).concat(removals)
                }, [])

            Promise.all(mutationHandlers).then(this.notifyMutationComplete.bind(this))
        }
    }

    if ('ShadyDOM' in window) {
        return ShadyObserverMixin(ChildObservingElement)
    }

    return ChildObservingElement
}

export default ChildObserverMixin
