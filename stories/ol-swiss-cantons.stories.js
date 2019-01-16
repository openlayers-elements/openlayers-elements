import { storiesOf } from '@storybook/polymer';
import { html } from 'lit-html'
import { boolean } from '@storybook/addon-knobs';

import '../elements/ol-swiss-cantons'

storiesOf('ol-swiss-cantons', module)
    .add('standard map', () => {
        const handleSelection = (e) => {
            console.log(e.detail.value)
        };

        return html`<ol-swiss-cantons
                        @selected-changed="${handleSelection}"
                        ?no-map="${boolean('disable background map', false)}"></ol-swiss-cantons>`
    });
