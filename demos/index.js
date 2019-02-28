import loadPolyfills from '@open-wc/polyfills-loader';

loadPolyfills().then(() => {
  import('./demos.js');
});
