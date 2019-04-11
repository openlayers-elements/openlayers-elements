import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills().then(() => {
  import('@polymer/iron-component-page/iron-component-page')
})
