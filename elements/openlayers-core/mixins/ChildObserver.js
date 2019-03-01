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
        handleRemovedChildNode() {
            // to be implemented in mixed class
        }
        handleAddedChildNode() {
            // to be implemented in mixed class
        }
        notifyMutationComplete() {
            // to be implemented in mixed class
        }
        handleMutation(mutationList) {
            mutationList
                .forEach((mutation) => {
                mutation.removedNodes.forEach(this.handleRemovedChildNode.bind(this));
                mutation.addedNodes.forEach(this.handleAddedChildNode.bind(this));
            });
            this.notifyMutationComplete();
        }
    }
    if ('ShadyDOM' in window) {
        return ShadyObserverMixin(ChildObservingElement);
    }
    return ChildObservingElement;
};
export default ChildObserverMixin;
//# sourceMappingURL=ChildObserver.js.map