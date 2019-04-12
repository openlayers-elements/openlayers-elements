import {LitElement, html} from 'lit-element'
import '@polymer/iron-demo-helpers/demo-snippet'

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

customElements.define(
  'adaptive-demo',
  class extends LitElement {
    render() {
      const template = this.querySelector('template')

      if (isIE11) {
        const nodes = template.content ? template.content.childNodes : template.childNodes

        const onlyElements = Array.prototype.slice.call(nodes, 1, nodes.length - 1).reduce((text, currentValue) => {
          if (currentValue.outerHTML) {
            text = text + currentValue.outerHTML
          }

          return text + '\r\n'
        }, '')
        return html`
          <div>
            ${Array.prototype.map.call(
              nodes,
              (m) =>
                html`
                  ${m}
                `,
            )}
          </div>
          <div><pre>${onlyElements}</pre></div>
        `
      }

      return html`
        <demo-snippet>
          <template
            >${template.content}</template
          >
        </demo-snippet>
      `
    }
  },
)
