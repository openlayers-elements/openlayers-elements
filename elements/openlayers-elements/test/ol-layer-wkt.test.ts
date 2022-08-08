import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit'
import type OlLayerWkt from '../ol-layer-wkt'
import '../ol-layer-wkt'

describe('ol-layer-xyz', () => {
  it('creates a layer with not features when no featureData is provided', async () => {
    // given
    const element = (await fixture<OlLayerWkt>(
      html`
        <ol-layer-wkt></ol-layer-wkt>
      `,
    ))

    // when
    await element.createPart()

    // then
    expect(element.source!.getFeatures().length).to.equal(0)
  })

  it("set layer's features when featureData is set", async () => {
    // given
    const element = (await fixture<OlLayerWkt>(
      html`
        <ol-layer-wkt></ol-layer-wkt>
      `,
    ))

    // when
    await element.createPart()
    element.featureData = [
      {
        id: 'feature',
        wkt: 'POLYGON((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))',
      },
    ]
    await element.updateComplete

    // then
    expect(element.source!.getFeatures().length).to.equal(1)
  })

  describe('resetFeatures', () => {
    it('has no effect before source is created', async () => {
      const element = (await fixture<OlLayerWkt>(
        html`
        <ol-layer-wkt></ol-layer-wkt>
      `,
      ))

      // when
      element.resetFeatures()

      // then
      // should not have thrown
    })
  })
})
