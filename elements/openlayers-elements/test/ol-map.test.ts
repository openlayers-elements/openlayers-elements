import {expect, fixture} from '@open-wc/testing'
import {html} from 'lit-html'
import '../ol-layer-openstreetmap'
import '../ol-map'
import OlMap from '../ol-map'
import {forEvent} from '../../../test/util'

describe('ol-map', () => {
  it('should handle layers added dynamically', async () => {
    // given
    const map = (await fixture(
      html`
        <ol-map></ol-map>
      `,
    )) as OlMap

    // when
    const layer = document.createElement('ol-layer-openstreetmap')
    map.appendChild(layer)

    // then
    await forEvent(layer, 'child-attached')
    expect(map.map.getLayers().getLength()).to.equal(1)
  })

  it('should remove layers when layer element is removed', async () => {
    // given
    const map = (await fixture(
      html`
        <ol-map><ol-layer-openstreetmap></ol-layer-openstreetmap></ol-map>
      `,
    )) as OlMap

    // when
    map.removeChild(map.querySelector('ol-layer-openstreetmap'))

    // then
    expect(map.map.getLayers().getLength()).to.equal(0)
  })
})