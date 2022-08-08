import { LitElement } from 'lit'

type Constructor = new (...args: any[]) => LitElement
type IAttachableMixin = <B extends Constructor>(Base: B, detailPropName: string) => B

/**
 * Base mixin for elements which need additional context from their parents
 *
 * During `connectedCallback` the child element dispatches an event. It should be
 * captured by a parent implementing [`AttachableAwareMixin`](#/mixins/AttachableAwareMixin) to provide information
 * to the dispatcher.
 *
 * ### Usage
 *
 * ```js
 * import AttachableMixin from '@openlayers-elements/core/mixins/Attachable'
 *
 * class Element extends AttachableMixin(LitElement, 'prop') {
 *
 *   // will be called if a parent element set the `prop` value
 *   async _attach({prop}) {
 *     const propValue = await prop
 *
 *     // do something with propValue
 *
 *     // return a function to be called when the element is disconnected
 *     return () => this.handleDisconnect()
 *   }
 * }
 * ```
 *
 * @polymer
 * @mixinFunction
 */
const AttachableMixin: IAttachableMixin = function<B extends Constructor> (Base: B, detailPropName: string) {
  abstract class Attachable extends Base {
    private __detachFromMap?: () => void

    public connectedCallback() {
      super.connectedCallback()
      setTimeout(this.__attachToMap.bind(this), 0)
    }

    public disconnectedCallback() {
      super.disconnectedCallback()
      if (this.__detachFromMap) {
        this.__detachFromMap()
      }
    }

    private __attachToMap() {
      const detail: any = {}
      this.dispatchEvent(new CustomEvent('attach', { detail, bubbles: true, composed: true }))

      if (detailPropName in detail) {
        this._attach(detail)
          .then((detachFunc) => {
            if (detachFunc) {
              this.__detachFromMap = detachFunc

              this.dispatchEvent(new Event('attached', { bubbles: true, composed: true }))
            }
          })
      } else {
        console.warn(`Failed to attach to the parent ${detailPropName}. Either it's not ready yet or not a parent of this element.`)
      }
    }

    protected abstract _attach(eventDetail: any): Promise<(() => void) | null>
  }

  return Attachable
}

export default AttachableMixin
