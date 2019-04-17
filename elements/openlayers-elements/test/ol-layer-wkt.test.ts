import {expect, fixture} from '@open-wc/testing'
import {html} from 'lit-html'
import '../ol-layer-wkt'
import OlLayerWkt from '../ol-layer-wkt'

describe('ol-layer-xyz', () => {
  it('creates a layer with not features when no featureData is provided', async () => {
    // given
    const element = (await fixture(
      html`
        <ol-layer-wkt></ol-layer-wkt>
      `,
    )) as OlLayerWkt

    // when
    await element.createPart()

    // then
    expect(element.source.getFeatures().length).to.equal(0)
  })

  it("set layer's features when featureData is set", async () => {
    // given
    const element = (await fixture(
      html`
        <ol-layer-wkt></ol-layer-wkt>
      `,
    )) as OlLayerWkt

    // when
    await element.createPart()
    element.featureData = [
      {
        id: 'feature',
        wkt: "POLYGON((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))"
      }
    ]
    await element.updateComplete

    // then
    expect(element.source.getFeatures().length).to.equal(1)
  })
})
