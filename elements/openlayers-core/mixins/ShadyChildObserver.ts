import {LitElement} from 'lit-element'

let ShadyObserverMixin: <B extends Constructor>(Base: B) => B
type Constructor = new (...args: any[]) => LitElement

interface IShadyDOM {
  unobserveChildren(observer: MutationObserver)
  observeChildren(target: Node, handler: MutationCallback)
}
declare var ShadyDOM: IShadyDOM

ShadyObserverMixin = function<B extends Constructor>(Base: B) {
  /**
   * Class implementing the child observer mixin
   *
   * @mixinClass
   */
  class ChildObservingElement extends Base {
    protected connectObserver(this: any): MutationObserver {
      return ShadyDOM.observeChildren(this, this.handleMutation.bind(this))
    }

    protected disconnectObserver(this: any) {
      ShadyDOM.unobserveChildren(this.childObserver)
    }
  }

  return ChildObservingElement
}

export default ShadyObserverMixin
