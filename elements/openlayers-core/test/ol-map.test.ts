import { assert, expect, fixture, nextFrame, oneEvent, waitUntil } from '@open-wc/testing'
import { html } from 'lit'
import '../ol-layer-vector'
import './test-elements/ol-test-feature'
import * as sinon from 'sinon'
import '../ol-map'
import type OlMap from '../ol-map'

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
    await oneEvent(layer, 'attached')
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

  describe('@attach', () => {
    it('should not bubble the event beyond the map', async () => {
      // given
      const onAttach = sinon.spy()

      // when
      await fixture(
        html`
        <div @attach="${onAttach}">
          <ol-map><ol-test-feature></ol-test-feature></ol-map>
        </div>
      `,
      )
      await nextFrame()

      // then
      expect(onAttach).not.to.have.been.called
    })

    it('is composed and bubbles', async () => {
      // given
      let attach: Event | undefined
      const onAttach = (e: Event) => {
        attach = e
      }

      // when
      await fixture(
        html`
          <ol-map><ol-layer-vector @attached="${onAttach}"></ol-layer-vector></ol-map>
        `,
      )
      await waitUntil(() => !!attach)

      // then
      expect(attach).to.contain({
        composed: true,
        bubbles: true,
      })
    })
  })

  describe('@attached', () => {
    it('should not bubble the event beyond the map', async () => {
      // given
      const onAttached = sinon.spy()

      // when
      await fixture(
        html`
        <div @attached="${onAttached}">
          <ol-map><ol-test-feature></ol-test-feature></ol-map>
        </div>
      `,
      )
      await nextFrame()

      // then
      expect(onAttached).not.to.have.been.called
    })

    it('is composed and bubbles', async () => {
      // given
      let attached: Event | undefined
      const onAttached = (e: Event) => {
        attached = e
      }

      // when
      await fixture(
        html`
          <ol-map><ol-layer-vector @attached="${onAttached}"></ol-layer-vector></ol-map>
        `,
      )
      await waitUntil(() => !!attached)

      // then
      expect(attached).to.contain({
        composed: true,
        bubbles: true,
      })
    })
  })
})
