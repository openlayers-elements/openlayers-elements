import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills().then(() => {
  import('@polymer/iron-demo-helpers/demo-snippet')
  import('./styled-map')
})
