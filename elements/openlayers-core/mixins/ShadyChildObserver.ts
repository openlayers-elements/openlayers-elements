import {LitElement} from 'lit-element'

type Constructor = new (...args: any[]) => LitElement

interface IShadyDOM {
  unobserveChildren(observer: MutationObserver)
  observeChildren(target: Node, handler: MutationCallback)
}
declare var ShadyDOM: IShadyDOM

export default function<B extends Constructor>(Base: B) {
  /**
   * Class implementing the child observer mixin
   *
   * @mixinClass
   */
  class ShadyChildObservingElement extends Base {
    protected connectObserver(this: any): MutationObserver {
      return ShadyDOM.observeChildren(this, this.handleMutation.bind(this))
    }

    protected disconnectObserver(this: any) {
      ShadyDOM.unobserveChildren(this.childObserver)
    }
  }

  return ShadyChildObservingElement
}
