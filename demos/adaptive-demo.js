import { LitElement, html } from 'lit-element'

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

customElements.define('adaptive-demo', class extends LitElement {
  render() {
    const template = this.querySelector('template')

    if(isIE11) {
      debugger
      const realNodes = [...template.content.childNodes]
        .slice(1, template.content.childNodes.length - 1)
        .reduce((text, currentValue) => {
          if (currentValue.outerHTML) {
            text = text + currentValue.outerHTML
          }

          return text + '\r\n'
        }, '')
      return html`<div>${template.content}</div><div><pre>${realNodes}</pre></div>`
    }

    return html`<demo-snippet>
<template>${template.content}</template>
</demo-snippet>`
  }
})
