import { fixture } from '@open-wc/testing'
import { html, TemplateResult } from 'lit'

export function forEvent(element: Element, event: string) {
  return new Promise((resolve) => {
    element.addEventListener(event, resolve)
  })
}

export async function mapFixture<T>(template: TemplateResult, query: string) {
  const map = (await fixture(
    html`
      <ol-map>${template}</ol-map>
    `,
  )) as any

  await forEvent(map.map, 'rendercomplete')

  return (map.querySelector(query) as any) as T
}
