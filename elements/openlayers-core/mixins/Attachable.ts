import {LitElement} from 'lit-element'

let AttachableMixin: <B extends Constructor>(
  Base: B
) => {
  new (...args: any[]): {
  }
} & B
type Constructor = new (...args: any[]) => LitElement

AttachableMixin = function<B extends Constructor>(Base: B) {
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

      this._attach(detail)
        .then(detachFunc => {
          if(detachFunc) {
            this.__detachFromMap = detachFunc

            this.dispatchEvent(new Event('attached'))
          }
        })
    }

    protected abstract _attach(eventDetail: any): Promise<() => void>
  }

  return Attachable
}

export default AttachableMixin
