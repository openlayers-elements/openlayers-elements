import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit'
import TileLayer from 'ol/layer/Tile.js'
import OlLayerBase from '@openlayers-elements/core/ol-layer-base.js'
import '../ol-layer-xyz.js'

describe('ol-layer-xyz', () => {
  it('should pass url property to created layer', async () => {
    // given
    const url = 'http://layer.xyz/{x}/{y}/{z}.png'
    const element = (await fixture(
      html`
        <ol-layer-xyz url="${url}"></ol-layer-xyz>
      `,
    )) as OlLayerBase<TileLayer<any>>

    // when
    const layer: any = await element.createPart()

    // then
    expect(layer.getSource().getUrls()).to.contain(url)
  })
})
