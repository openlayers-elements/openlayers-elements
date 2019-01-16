import { configure, addDecorator } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs';
import { setOptions } from '@storybook/addon-options';
import '@storybook/addon-console';

addDecorator(withKnobs);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
    selectedAddonPanel: 'storybooks/storybook-addon-knobs',
});

configure(loadStories, module);
