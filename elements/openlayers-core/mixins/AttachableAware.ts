import { html, LitElement } from 'lit'

type Constructor = new (...args: any[]) => LitElement
type IAttachableAwareMixin = <B extends Constructor>(
  Base: B,
  detailPropName: string,
) => {
  new (...args: any[]): {
    notifyReady(): void
  }
} & B

/**
 * Base mixin for elements which provide additional context to their children
 *
 * When a child which implements [`AttachableMixin`](#/mixins/AttachableMixin) connects to the DOM it
 * dispatches an event. That event is captured by `AttachableAwareMixin` and it set a promise property to
 * the event details.
 *
 * When the parent element is ready it should call `notifyReady` to resolve that promise and let the children finish
 * initializing.
 *
 * ### Usage
 *
 * ```js
 * import AttachableAwareMixin from '@openlayers-elements/core/mixins/AttachableAware'
 *
 * class ParentToAttachTo extends AttachableAwareMixin(LitElement, 'prop') {
 *   firstRendered() {
 *     // simply call this at some point to resolve the promise the children are waiting for
 *     this.notifyReady()
 *   }
 * }
 * ```
 *
 * @polymer
 * @mixinFunction
 */
const AttachableAwareMixin: IAttachableAwareMixin = function<B extends Constructor> (Base: B, detailPropName: string) {
  class AttachableAware extends Base {
    private readonly __attachReady: Promise<AttachableAware>
    private readonly __attachReadyResolve?: (aa: AttachableAware) => void

    constructor(...args: any[]) {
      super(args)

      let tempResolve
      this.__attachReady = new Promise((resolve) => {
        tempResolve = resolve
      })
      this.__attachReadyResolve = tempResolve
    }

    connectedCallback() {
      super.connectedCallback()
      this.addEventListener('attach', this.__onAttach, true)
      this.addEventListener('attach', this.__stopPropagation)
      this.addEventListener('attached', this.__stopPropagation)
    }

    disconnectedCallback() {
      super.disconnectedCallback()
      this.removeEventListener('attach', this.__onAttach)
      this.removeEventListener('attached', this.__stopPropagation)
    }

    __onAttach(e: any) {
      e.detail[detailPropName] = this.__attachReady
    }

    __stopPropagation(e: Event) {
      e.stopPropagation()
    }

    /**
     * Call this in implementing class when the element has finish initializing
     */
    notifyReady() {
      if (this.__attachReadyResolve) {
        this.__attachReadyResolve(this)
      }
    }

    render() {
      return html`
        <slot></slot>
      `
    }
  }

  return AttachableAware
}

export default AttachableAwareMixin
