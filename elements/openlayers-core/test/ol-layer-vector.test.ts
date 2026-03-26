import { expect, fixture, waitUntil } from '@open-wc/testing'
import { html } from 'lit'
import type OlLayerVector from '../ol-layer-vector.js'
import '../ol-layer-vector.js'
import '../ol-map.js'
import './test-elements/ol-test-feature.js'

const dotUrl = 'https://openlayers.org/en/latest/examples/data/dot.png'

describe('ol-layer-vector', () => {
  it('should add markers to the layer', async () => {
    // given
    const element = (await fixture(html`
      <ol-map>
        <ol-layer-vector>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
        </ol-layer-vector>
      </ol-map>
    `)).querySelector('ol-layer-vector') as OlLayerVector

    // then
    expect(element.source!.getFeatures().length).to.equal(4)
  })

  it('should remove markers from layer when node is removed', async () => {
    // given
    const element = (await fixture(html`
      <ol-map>
        <ol-layer-vector>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
          <ol-test-feature src="${dotUrl}"></ol-test-feature>
        </ol-layer-vector>
      </ol-map>
    `)).querySelector('ol-layer-vector') as OlLayerVector

    // when
    element.removeChild(element.querySelector('ol-test-feature')!)

    // then
    expect(element.source!.getFeatures().length).to.equal(3)
  })

  it('should handle markers added dynamically', async () => {
    // given
    const element = (await fixture(
      html`
        <ol-map>
          <ol-layer-vector></ol-layer-vector>
        </ol-map>
      `,
    )).querySelector('ol-layer-vector') as OlLayerVector

    // when
    const marker = document.createElement('ol-test-feature')
    element.appendChild(marker)
    await waitUntil(() => element.source!.getFeatures().length === 1)

    // then
    expect(element.source!.getFeatures().length).to.equal(1)
  })
})
