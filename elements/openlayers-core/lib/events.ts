import BaseObject from 'ol/Object.js'

export function forwardEvents(events: string [], target: EventTarget, olObject: BaseObject) {
  for (const name of events) {
    olObject.on(name, (event: unknown) => {
      target.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: event,
      }))
    })
  }
}
