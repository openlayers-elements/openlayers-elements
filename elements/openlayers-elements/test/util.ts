import {fixture} from '@open-wc/testing'
import {html, TemplateResult} from 'lit-html'
import OlMap from '../ol-map'

export function forEvent(element, event) {
  return new Promise((resolve) => {
    if ('on' in element) {
      element.on(event, resolve)
    } else {
      element.addEventListener(event, resolve)
    }
  })
}

export async function mapFixture<T>(template: TemplateResult, query: string) {
  const map = (await fixture(
    html`
      <ol-map>${template}</ol-map>
    `,
  )) as OlMap

  await forEvent(map.map, 'rendercomplete')

  return (map.querySelector(query) as any) as T
}
