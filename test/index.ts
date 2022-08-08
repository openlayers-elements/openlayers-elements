import { fixture, oneEvent } from '@open-wc/testing'
import { html, TemplateResult } from 'lit'

export async function mapFixture<T>(template: TemplateResult, query: string) {
  const map = (await fixture(
    html`
      <ol-map>${template}</ol-map>
    `,
  )) as any

  await oneEvent(map.map, 'rendercomplete')

  return (map.querySelector(query) as any) as T
}
