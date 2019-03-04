import {expect, fixture} from '@open-wc/testing'
import {html} from 'lit-html'
import OlLayerVector from '../ol-layer-vector'
import '../ol-layer-vector'
import '../ol-map'
import OlMarkerIcon from '../ol-marker-icon'
import '../ol-marker-icon'
import {forEvent} from './util'

const dotUrl = 'https://openlayers.org/en/latest/examples/data/dot.png'

describe('ol-layer-vector', () => {
  it('should add markers to the layer', async () => {
    // given
    const element = (await fixture(html`
      <ol-layer-vector>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
      </ol-layer-vector>
    `)) as OlLayerVector

    // then
    const layer = (await element.createPart()) as any
    expect(layer.getSource().getFeatures().length).to.equal(4)
  })

  it('should remove markers from layer when node is removed', async () => {
    // given
    const element = (await fixture(html`
      <ol-layer-vector>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
        <ol-marker-icon src="${dotUrl}"></ol-marker-icon>
      </ol-layer-vector>
    `)) as OlLayerVector
    const layer = (await element.createPart()) as any

    // when
    element.removeChild(element.querySelector('ol-marker-icon'))

    // then
    await forEvent(element, 'ol-updated')
    expect(layer.getSource().getFeatures().length).to.equal(3)
  })

  it('should handle markers added dynamically', async () => {
    // given
    const element = (await fixture(
      html`
        <ol-layer-vector></ol-layer-vector>
      `,
    )) as OlLayerVector
    const layer = (await element.createPart()) as any

    // when
    const marker = document.createElement('ol-marker-icon') as OlMarkerIcon
    marker.src = dotUrl
    element.appendChild(marker)

    // then
    await forEvent(element, 'ol-updated')
    expect(layer.getSource().getFeatures().length).to.equal(1)
  })
})
