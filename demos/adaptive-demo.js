import {LitElement, html} from 'lit-element'
import {until} from 'lit-html/directives/until'

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

customElements.define(
  'adaptive-demo',
  class extends LitElement {
    render() {
      const template = this.querySelector('template')

      if (isIE11) {
        const nodes = template.content
          ? template.content.childNodes
          : template.childNodes

        const onlyElements = [...nodes]
          .slice(1, nodes.length - 1)
          .reduce((text, currentValue) => {
            if (currentValue.outerHTML) {
              text = text + currentValue.outerHTML
            }

            return text + '\r\n'
          }, '')
        return html`
          <div>
            ${[...nodes].map(
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
