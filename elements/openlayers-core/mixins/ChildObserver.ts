import {LitElement} from 'lit-element'
import ShadyObserverMixin from './ShadyChildObserver'

let ChildObserverMixin: <B extends Constructor>(
  Base: B,
) => {
  new (...args: any[]): {
    initializeChildren(): any
  }
} & B
type Constructor = new (...args: any[]) => LitElement

/**
 * Mixin which helps handling child nodes being added and removed.
 *
 * See [ChildObservingElement class](#/classes/ChildObservingElement)
 *
 * @polymer
 * @mixinFunction
 */
ChildObserverMixin = function<B extends Constructor>(Base: B) {
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

    /**
     * Processes the current child elements and adds them to the map
     *
     * Should be called by inherited element when it's ready to initialize the map
     */
    public initializeChildren() {
      ;[...this.childNodes].forEach(this._handleAddedChildNode.bind(this))
    }

    /**
     * Implemented in derived classes to remove a removed child node from the map
     *
     * @param node {Node}
     * @private
     */
    protected _handleRemovedChildNode() {
      // to be implemented in mixed class
    }

    /**
     * Implemented in derived classes to add a added child node from the map
     *
     * @param node {Node}
     * @private
     */
    protected _handleAddedChildNode() {
      // to be implemented in mixed class
    }

    /**
     * Implemented in derived classes to dispatch an event, notifying listeners
     * that child nodes have been applied to the map
     *
     * @private
     */
    protected _notifyMutationComplete() {
      // to be implemented in mixed class
    }

    private handleMutation(mutationList: MutationRecord[]) {
      const mutationHandlers = mutationList.reduce(
        (promises, mutation) => {
          const removals = [...mutation.removedNodes].map(this._handleRemovedChildNode.bind(this)) as Promise<any>[]
          const additions = [...mutation.addedNodes].map(this._handleAddedChildNode.bind(this)) as Promise<any>[]

          return promises.concat(additions).concat(removals)
        },
        [] as Promise<any>[],
      )

      Promise.all(mutationHandlers).then(this._notifyMutationComplete.bind(this))
    }
  }

  if ('ShadyDOM' in window) {
    return ShadyObserverMixin(ChildObservingElement)
  }

  return ChildObservingElement
}

export default ChildObserverMixin
