import '../ol-select.js'
import { expect, fixture } from '@open-wc/testing'
import Style from 'ol/style/Style.js'
import type { OlSelect } from '../ol-select.js'

describe('ol-style', () => {
  describe('feature style', () => {
    it('can be set from attribute', async () => {
      // given
      const element = await fixture<OlSelect>(`<ol-select feature-style='{ "Style": {
    "fill": { "Fill": {
      "color": "rgba(255,255,255,0.4)"
    }}
  }}'></ol-select>`)

      // then
      const style = element.featureStyle as Style
      expect(style.getFill().getColor()).to.deep.equal('rgba(255,255,255,0.4)')
    })
  })
})
