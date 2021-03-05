import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills()
  .then(() =>
    Promise.all([
      import(/* webpackChunkName: "sync-projection" */ '@openlayers-elements/core/ol-map'),
      import(/* webpackChunkName: "sync-projection" */ '@openlayers-elements/swisstopo/swisstopo-wmts'),
    ]),
  )
  .then(() => {
    import('@polymer/iron-demo-helpers/demo-snippet')
    import('@openlayers-elements/maps/ol-layer-openstreetmap')
  })
