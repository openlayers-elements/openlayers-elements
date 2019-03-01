let ShadyObserverMixin;
ShadyObserverMixin = function (Base) {
    /**
     * Class implementing the child observer mixin
     *
     * @mixinClass
     */
    class ChildObservingElement extends Base {
        connectObserver() {
            return ShadyDOM.observeChildren(this, this.handleMutation.bind(this));
        }
        disconnectObserver() {
            ShadyDOM.unobserveChildren(this.childObserver);
        }
    }
    return ChildObservingElement;
};
export default ShadyObserverMixin;
//# sourceMappingURL=ShadyChildObserver.js.map