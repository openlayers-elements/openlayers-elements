import {LitElement} from 'lit-element'

let AttachableMixin: <B extends Constructor>(
  Base: B,
  detailPropName: string,
) => {
  new (...args: any[]): {}
} & B
type Constructor = new (...args: any[]) => LitElement

AttachableMixin = function<B extends Constructor>(Base: B, detailPropName: string) {
  abstract class Attachable extends Base {
    private __detachFromMap = () => {}

    public connectedCallback() {
      super.connectedCallback()
      setTimeout(this.__attachToMap.bind(this), 0)
    }

    public disconnectedCallback() {
      super.disconnectedCallback()
      this.__detachFromMap()
    }

    private __attachToMap() {
      const detail: any = {}
      this.dispatchEvent(new CustomEvent('attaching', {detail}))

      if (detailPropName in detail) {
        detail[detailPropName]
          .then((value) => this._attach(value))
          .then((detachFunc) => {
            if (detachFunc) {
              this.__detachFromMap = detachFunc

              this.dispatchEvent(new Event('attached'))
            }
          })
      }
    }

    protected abstract _attach(eventDetail: any): Promise<() => void>
  }

  return Attachable
}

export default AttachableMixin
