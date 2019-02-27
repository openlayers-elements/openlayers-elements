import {expect, fixture} from '@open-wc/testing'
import {html} from 'lit-html'
import '../ol-layer-vector'
import OlMap from '../ol-map'
import '../ol-map'

describe('marker', () =>
    describe('ol-marker-icon', () => {
        it('should add icon to the layer', async () => {
            // given
            const element = await fixture(html`
                            <ol-map>
                                <ol-layer-vector>
                                    <ol-marker-icon></ol-marker-icon>
                                </ol-layer-vector>
                            </ol-map>`) as OlMap

            // then
            const layer = element.map.getLayers().item(0)
            expect(layer.get)
        })
    })
})
