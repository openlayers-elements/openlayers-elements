import ShadyObserverMixin from './ShadyChildObserver';
/**
 * Mixin which helps handling child nodes being added and removed
 *
 * @polymer
 * @mixinFunction
 */
export default function (Base) {
    /**
     * Class implementing the child observer mixin
     *
     * @mixinClass
     */
    class ChildObservingElement extends Base {
        constructor(...args) {
            super(args);
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
        // @ts-ignore
        _handleRemovedChildNode(node) {
            // to be implemented in mixed class
        }
        // @ts-ignore
        _handleAddedChildNode(node) {
            // to be implemented in mixed class
        }
        _notifyMutationComplete() {
            // to be implemented in mixed class
        }
        handleMutation(mutationList) {
            const mutationHandlers = mutationList
                .reduce((promises, mutation) => {
                const removals = [...mutation.removedNodes].map(this._handleRemovedChildNode.bind(this));
                const additions = [...mutation.addedNodes].map(this._handleAddedChildNode.bind(this));
                return promises.concat(additions).concat(removals);
            }, []);
            Promise.all(mutationHandlers).then(this._notifyMutationComplete.bind(this));
        }
    }
    if ('ShadyDOM' in window) {
        return ShadyObserverMixin(ChildObservingElement);
    }
    return ChildObservingElement;
}
//# sourceMappingURL=ChildObserver.js.map