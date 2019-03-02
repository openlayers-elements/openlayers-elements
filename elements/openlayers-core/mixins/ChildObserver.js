import ShadyObserverMixin from './ShadyChildObserver';
let ChildObserverMixin;
/**
 * Mixin which helps handling child nodes being added and removed
 *
 * @polymer
 * @mixinFunction
 */
ChildObserverMixin = function (Base) {
    /**
     * Class implementing the child observer mixin
     *
     * @mixinClass
     */
    class ChildObservingElement extends Base {
        connectedCallback() {
            super.connectedCallback();
            this.childObserver = this.connectObserver();
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.disconnectObserver();
        }
        connectObserver() {
            const observer = new MutationObserver(this.handleMutation.bind(this));
            observer.observe(this, { childList: true });
            return observer;
        }
        disconnectObserver() {
            this.childObserver.disconnect();
        }
        handleRemovedChildNode(node) {
            // to be implemented in mixed class
        }
        handleAddedChildNode(node) {
            // to be implemented in mixed class
        }
        notifyMutationComplete() {
            // to be implemented in mixed class
        }
        handleMutation(mutationList) {
            const mutationHandlers = mutationList
                .reduce((promises, mutation) => {
                const removals = [...mutation.removedNodes].map((n) => this.handleRemovedChildNode(n));
                const additions = [...mutation.addedNodes].map((n) => this.handleAddedChildNode(n));
                return promises.concat(additions).concat(removals);
            }, []);
            Promise.all(mutationHandlers).then(this.notifyMutationComplete.bind(this));
        }
    }
    if ('ShadyDOM' in window) {
        return ShadyObserverMixin(ChildObservingElement);
    }
    return ChildObservingElement;
};
export default ChildObserverMixin;
//# sourceMappingURL=ChildObserver.js.map