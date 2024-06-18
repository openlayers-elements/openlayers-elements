import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'

import '@openlayers-elements/core/ol-map.js'
import '@openlayers-elements/maps/ol-layer-openstreetmap.js'

import * as MapStory from './Map.stories.js'

const main: Meta = {
  title: 'Layers/ol-layer-openstreetmap',
  component: 'ol-layer-openstreetmap',
  tags: ['autodocs'],
}

export default main

export const Basic: Story = {
  render: () => html`${MapStory.Basic.render({
    ...MapStory.Basic.args,
    ...MapStory.default.args,
  })}`,
}
