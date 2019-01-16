import { storiesOf } from '@storybook/polymer';
import { html } from 'lit-html'

import '../elements/ol-swiss-cantons'

storiesOf('ol-swiss-cantons', module)
    .add('standard map', () => {
        const handleSelection = (e) => {
            console.log(e.detail.value)
        };

        return html`<ol-swiss-cantons style="max-width: 700px" @selected-changed="${handleSelection}"></ol-swiss-cantons>`
    });
