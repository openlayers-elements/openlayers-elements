import {LitElement} from 'lit-element'

let AttachableAwareMixin: <B extends Constructor>(
  Base: B,
  detailPropName: string
) => {
  new (...args: any[]): {
    notifyReady(): void
  }
} & B
type Constructor = new (...args: any[]) => LitElement

AttachableAwareMixin = function<B extends Constructor>(Base: B, detailPropName: string) {
  class AttachableAware extends Base {
    private readonly __attachReady: Promise<AttachableAware>
    private readonly __attachReadyResolve: (AttachableAware) => void

    constructor(...args: any[]) {
      super(args)

      let tempResolve
      this.__attachReady = new Promise(resolve => {
        tempResolve = resolve
      })
      this.__attachReadyResolve = tempResolve
    }

    connectedCallback() {
      super.connectedCallback()
      this.addEventListener('attaching', (e: CustomEvent) => {
        e.detail[detailPropName] = this.__attachReady
      }, true)
    }

    notifyReady() {
      this.__attachReadyResolve(this)
    }
  }

  return AttachableAware
}

export default AttachableAwareMixin
