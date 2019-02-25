import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import TileLayer from 'ol/layer/tile'
import OlLayerBase from '../ol-layer-base'
import '../ol-layer-xyz'

describe('ol-layer-xyz', () => {
  it('should pass url property to created layer', async () => {
    // given
    const url = 'http://layer.xyz/{x}/{y}/{z}.png'
    const element = await fixture(html`<ol-layer-xyz url="${url}"></ol-layer-xyz>`) as OlLayerBase<TileLayer>

    // when
    const layer: any = await element.createPart()

    // then
    expect(layer.getSource().getUrls()).to.contain(url)
  })
})
