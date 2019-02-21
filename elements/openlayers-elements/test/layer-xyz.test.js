/* global describe, it, beforeEach */
import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import '../ol-layer-xyz'
import OlLayerXyz from '../ol-layer-xyz'

describe('ol-layer-xyz', () => {
  it('should pass url property to created layer', async () => {
    // given
    const url = 'http://layer.xyz/{x}/{y}/{z}.png'
    const element = await fixture(html`<ol-layer-xyz url="${url}"></ol-layer-xyz>`)

    // when
    const layer = await element.createPart()

    // then
    expect(layer.getSource().getUrls()).to.contain(url)
  })
})
