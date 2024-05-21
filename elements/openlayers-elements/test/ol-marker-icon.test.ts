import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit'
import '@openlayers-elements/core/ol-layer-vector'
import '@openlayers-elements/core/ol-map'
import '../ol-marker-icon.js'

const dotUrl = '/base/test/assets/icon.png'

describe('ol-marker-icon', () => {
  it('defaults to [0,0] position', async () => {
    // given
    const feature = (await fixture(
      html`
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
      `,
    )) as any

    // then
    expect(
      feature
        .createFeature()
        .getGeometry()
        .getCoordinates(),
    ).to.deep.equal([0, 0])
  })

  it('passes coordinates from x/y properties', async () => {
    // given
    const feature = (await fixture(html`
      <ol-marker-icon src="${dotUrl}" x="16" y="24"></ol-marker-icon>
    `)) as any

    // then
    expect(
      feature
        .createFeature()
        .getGeometry()
        .getCoordinates(),
    ).to.deep.equal([16, 24])
  })

  it('passes coordinates from lon/lat properties', async () => {
    // given
    const feature = (await fixture(html`
      <ol-marker-icon src="${dotUrl}" lat="40.4" lon="-3.683333"></ol-marker-icon>
    `)) as any

    // then
    expect(
      feature
        .createFeature()
        .getGeometry()
        .getCoordinates(),
    ).to.deep.equal([-410026.7539820607, 4924240.587205196])
  })
})
