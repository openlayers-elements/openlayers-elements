/* eslint-disable max-len */
import type { Meta, StoryObj as Story } from '@storybook/web-components'

import { html } from 'lit'

import '../lib/styled-map.js'

const main: Meta = {
  title: 'Layers/ol-layer-geojson',
  component: 'ol-layer-geojson',
  tags: ['autodocs'],
}

export default main

export const Basic: Story = {
  render: () => html`<styled-map></styled-map>`,
}
