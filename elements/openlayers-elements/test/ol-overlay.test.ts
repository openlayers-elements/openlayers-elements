import { expect, fixture } from '@open-wc/testing';
import '../ol-map';
import '../ol-overlay';
import OlOverlay from '../ol-overlay';
import OlMap from '../ol-map';
import {forEvent} from '../../../test/util';

describe('ol-overlay', () => {
  describe('auto-panning', () => {
    it('can be enabled through attribute', async () => {
      // given
      const element = (await fixture('<ol-overlay id="foo" auto-pan></ol-overlay>')) as OlOverlay

      // when
      const overlay = await element.createPart()

      // then
      expect(overlay['autoPan']).to.equal(true)
    })

    it('can be enabled through property', async () => {
      // given
      const element = (await fixture('<ol-overlay id="foo"></ol-overlay>')) as OlOverlay
      element.autoPan = true

      // when
      const overlay = await element.createPart()

      // then
      expect(overlay['autoPan']).to.equal(true)
    })

    it('is disabled by default', async () => {
      // given
      const element = (await fixture('<ol-overlay id="foo"></ol-overlay>')) as OlOverlay

      // when
      const overlay = await element.createPart()

      // then
      expect(overlay['autoPan']).to.equal(false)
    })
  })

  describe('getElement', () => {
    it('returns itself', async () => {
      // given
      const element = (await fixture('<ol-overlay id="foo"></ol-overlay>')) as OlOverlay
      const overlay = await element.createPart()

      // when
      const overlayElement = overlay.getElement()

      // then
      expect(overlayElement).to.equal(element)
    })
  })

  it('passes a named slot to map overlay', async () => {
    // given
    const element = (await fixture('<ol-overlay id="foo"></ol-overlay>')) as OlOverlay

    // when
    const overlay = await element.createPart()

    // then
    expect(overlay.get('element').name).to.equal('foo')
  })

  it('throws if overlay has no id', async () => {
    // given
    let thrown
    const element = (await fixture('<ol-overlay></ol-overlay>')) as OlOverlay

    // when
    await element.createPart().catch(e => thrown = e)

    // then
    expect(thrown).to.be.ok
  })

  it('adds itself to the map', async () => {
    // given
    const map = (await fixture('<ol-map><ol-overlay id="foo"></ol-overlay></ol-map>')) as OlMap

    // when
    await forEvent(map.querySelector('ol-overlay'), 'attached')

    // then
    expect(map.map.getOverlays().getLength()).to.equal(1)
  })

  it('remove itself from the map', async () => {
    // given
    const map = (await fixture('<ol-map><ol-overlay id="foo"></ol-overlay></ol-map>')) as OlMap
    await forEvent(map.querySelector('ol-overlay'), 'attached')

    // when
    map.removeChild(map.querySelector('ol-overlay'))

    // then
    expect(map.map.getOverlays().getLength()).to.equal(0)
  })
})
