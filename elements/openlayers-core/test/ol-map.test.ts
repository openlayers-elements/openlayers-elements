import { assert, expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import '../ol-layer-vector'
import * as sinon from 'sinon'
import '../ol-map'
import type OlMap from '../ol-map'

import { forEvent } from '../../../test/util'

describe('ol-map', () => {
  it('should handle layers added dynamically', async () => {
    // given
    const map = (await fixture(
      html`
        <ol-map></ol-map>
      `,
    )) as OlMap

    // when
    const layer = document.createElement('ol-layer-vector')
    map.appendChild(layer)

    // then
    await forEvent(layer, 'attached')
    expect(map.map!.getLayers().getLength()).to.equal(1)
  })

  it('should remove layers when layer element is removed', async () => {
    // given
    const map = (await fixture(
      html`
        <ol-map><ol-layer-vector></ol-layer-vector></ol-map>
      `,
    )) as OlMap

    // when
    map.removeChild(map.querySelector('ol-layer-vector')!)

    // then
    expect(map.map!.getLayers().getLength()).to.equal(0)
  })

  describe('fit', () => {
    it('calls view#fit with defaults', async () => {
      // given
      const map = (await fixture(
        html`
        <ol-map></ol-map>
      `,
      )) as OlMap
      await map.updateComplete
      const realFit = sinon.spy(map.map!.getView(), 'fit')

      // when
      map.fit([1, 2, 3, 4])

      // then
      assert(realFit.calledWith(
        [1, 2, 3, 4],
        sinon.match({
          size: sinon.match.array,
          nearest: false,
        }),
      ))
    })

    it('can override the view#fit call options', async () => {
      // given
      const map = (await fixture(
        html`
        <ol-map></ol-map>
      `,
      )) as OlMap
      await map.updateComplete
      const realFit = sinon.spy(map.map!.getView(), 'fit')

      // when
      map.fit([1, 2, 3, 4], { nearest: true, extra: 'setting' } as any)

      // then
      assert(realFit.calledWith(
        [1, 2, 3, 4],
        sinon.match({
          size: sinon.match.array,
          nearest: true,
          extra: 'setting',
        }),
      ))
    })
  })
})
