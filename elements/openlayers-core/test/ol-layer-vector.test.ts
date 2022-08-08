import { expect, fixture, assert, oneEvent } from '@open-wc/testing'
import { html } from 'lit'
import * as sinon from 'sinon'
import '../ol-map'
import type OlLayerVector from '../ol-layer-vector'
import '../ol-layer-vector'
import './test-elements/ol-test-feature'

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
    await oneEvent(element.querySelector('ol-test-feature:nth-of-type(4)')!, 'attached')

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
    await oneEvent(element.querySelector('ol-test-feature:nth-of-type(4)')!, 'attached')

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
    await oneEvent(marker, 'attached')

    // then
    expect(element.source!.getFeatures().length).to.equal(1)
  })

  describe('fit', () => {
    it('calls fit on the underlying map', async () => {
      // given
      const element = (await fixture(
        html`
        <ol-map>
          <ol-layer-vector></ol-layer-vector>
        </ol-map>
      `,
      )).querySelector<OlLayerVector>('ol-layer-vector')!
      await oneEvent(element, 'attached')
      const mapFit = sinon.spy(element._map, 'fit')
      sinon.stub(element.source!, 'getExtent').callsFake(() => [1, 2, 3, 4])

      // when
      element.fit()

      // then
      assert(mapFit.calledWith([1, 2, 3, 4]))
    })
  })
})
