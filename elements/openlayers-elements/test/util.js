import { fixture } from '@open-wc/testing';
import { html } from 'lit-html';
export function forEvent(element, event) {
    return new Promise((resolve) => {
        if ('on' in element) {
            element.on(event, resolve);
        }
        else {
            element.addEventListener(event, resolve);
        }
    });
}
export async function mapFixture(template, query) {
    const map = (await fixture(html `
      <ol-map>${template}</ol-map>
    `));
    await forEvent(map.map, 'rendercomplete');
    return map.querySelector(query);
}
//# sourceMappingURL=util.js.map