import {expect, fixture} from '@open-wc/testing'
import {html} from 'lit-html'
import '@openlayers-elements/maps/ol-layer-openstreetmap'
import '@openlayers-elements/maps/ol-map'
import OlMap from '@openlayers-elements/maps/ol-map'
import {forEvent} from './util'

describe('ol-map', () => {
  it('should handle layers added dynamically', async () => {
    // given
    const map = (await fixture(
      html`
        <ol-map></ol-map>
      `,
    )) as OlMap

    // when
    map.appendChild(document.createElement('ol-layer-openstreetmap'))

    // then
    await forEvent(map, 'parts-updated')
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
    await forEvent(map, 'parts-updated')
    expect(map.map.getLayers().getLength()).to.equal(0)
  })
})
