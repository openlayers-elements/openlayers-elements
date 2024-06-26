import { assert, expect, fixture, nextFrame, oneEvent, waitUntil } from '@open-wc/testing'
import { html } from 'lit'
import '../ol-layer-vector.js'
import './test-elements/ol-test-feature.js'
import * as sinon from 'sinon'
import '../ol-map.js'
import type OlMap from '../ol-map.js'

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

  describe('ol-map pitch property (tilt map perspective)', () => {
    it('should apply default pitch of 0°', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // when
      const { pitch } = map

      // then
      expect(pitch).to.equal(0)
      const layersElement = map.shadowRoot!.querySelector('.ol-layers') as HTMLDivElement
      expect(layersElement.style.transform).to.equal('')
    })

    it('should apply custom pitch when set, with animation', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map pitch="20"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      // then
      const { pitch } = map
      expect(pitch).to.equal(20)
      const layersElement = map.shadowRoot!.querySelector('.ol-layers') as HTMLDivElement
      expect(layersElement.style.transform).to.match(/rotateX\(20deg\)/)
    })

    it('should limit pitch to a minimum of 0°', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map pitch="-10"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      // then
      const { pitch } = map
      expect(pitch).to.equal(-10)
      // Check if the pitch is constrained to 0°
      const layersElement = map.shadowRoot!.querySelector('.ol-layers') as HTMLDivElement
      expect(layersElement.style.transform).to.match('')
    })

    it('should limit pitch to a maximum of 30°', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map pitch="40" pitch-duration="0"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      // then
      const { pitch } = map
      expect(pitch).to.equal(40)
      // Check if the pitch is constrained to 30°
      const layersElement = map.shadowRoot!.querySelector('.ol-layers') as HTMLDivElement
      expect(layersElement.style.transform).to.match(/rotateX\(30deg\)/)
    })

    it('should animate perspective when pitch is changed dynamically', async () => {
      const animationEndPromise = (map: OlMap) => new Promise<void>((resolve) => {
        // Create a promise to wait for the animation to complete
        const handler = (event: any) => {
          if (!event.detail.animating) {
            map.removeEventListener('change:perspective', handler)
            resolve()
          }
        }
        map.addEventListener('change:perspective', handler)
      })

      // given
      const map = (await fixture(
        html`
          <ol-map pitch="10"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // when
      map.pitch = 25
      await animationEndPromise(map)

      // then
      const { pitch } = map
      expect(pitch).to.equal(25)
      const layersElement = map.shadowRoot!.querySelector('.ol-layers') as HTMLDivElement
      expect(layersElement.style.transform).to.match(/rotateX\(25deg\)/)
    })

    it('should not dispatch "change:perspective" event when pitch-duration=0', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map pitch="5" pitch-duration="0"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      const perspectiveChangeSpy = sinon.spy()
      map.addEventListener('change:perspective', perspectiveChangeSpy)

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      // then
      expect(perspectiveChangeSpy.called).to.be.false
    })

    it('should dispatch "change:perspective" event when pitch is changed', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map pitch="5" pitch-duration="0"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      const perspectiveChangeSpy = sinon.spy()
      map.addEventListener('change:perspective', perspectiveChangeSpy)

      map.pitchDuration = 200
      map.pitch = 10

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      // then
      expect(perspectiveChangeSpy.calledOnce).to.be.true
      expect(perspectiveChangeSpy.args[0][0].detail).to.deep.include({ fromAngle: 5, toAngle: 10, animating: false })
    })

    it('should not dispatch "change:perspective" event if pitch remains the same', async () => {
      // given
      const map = (await fixture(
        html`
          <ol-map pitch="15"></ol-map>
        `,
      )) as OlMap
      await map.updateComplete

      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      const perspectiveChangeSpy = sinon.spy()
      map.addEventListener('change:perspective', perspectiveChangeSpy)

      // when
      map.pitch = 15
      // Use setTimeout to wait for the animation to complete
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 600)
      })

      // then
      expect(perspectiveChangeSpy.called).to.be.false
    })
  })
})
