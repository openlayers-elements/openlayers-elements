import {LitElement} from 'lit-element'
import ShadyObserverMixin from './ShadyChildObserver'

type Constructor = new (...args: any[]) => LitElement

/**
 * Mixin which helps handling child nodes being added and removed
 *
 * @polymer
 * @mixinFunction
 */
export default function<B extends Constructor>(Base: B) {
  /**
   * Class implementing the child observer mixin
   *
   * @mixinClass
   */
  class ChildObservingElement extends Base {
    private childObserver: MutationObserver

    constructor(...args: any[]) {
      super(args)
      this.childObserver = this.connectObserver()
    }

    public disconnectedCallback() {
      super.disconnectedCallback()
      this.disconnectObserver()
    }

    public connectObserver(): MutationObserver {
      const observer = new MutationObserver(this.handleMutation.bind(this))
      observer.observe(this, {childList: true})
      return observer
    }

    public disconnectObserver() {
      this.childObserver.disconnect()
    }

    protected _initializeChildren() {
      ;[...this.childNodes].forEach(this._handleAddedChildNode.bind(this))
    }

    // @ts-ignore
    protected _handleRemovedChildNode(node: Node) {
      // to be implemented in mixed class
    }

    // @ts-ignore
    protected _handleAddedChildNode(node: Node) {
      // to be implemented in mixed class
    }

    protected _notifyMutationComplete() {
      // to be implemented in mixed class
    }

    private handleMutation(mutationList: MutationRecord[]) {
      const mutationHandlers = mutationList.reduce(
        (promises, mutation) => {
          const removals = [...mutation.removedNodes].map(
            this._handleRemovedChildNode.bind(this),
          ) as Promise<any>[]
          const additions = [...mutation.addedNodes].map(
            this._handleAddedChildNode.bind(this),
          ) as Promise<any>[]

          return promises.concat(additions).concat(removals)
        },
        [] as Promise<any>[],
      )

      Promise.all(mutationHandlers).then(
        this._notifyMutationComplete.bind(this),
      )
    }
  }

  if ('ShadyDOM' in window) {
    return ShadyObserverMixin(ChildObservingElement)
  }

  return ChildObservingElement
}
