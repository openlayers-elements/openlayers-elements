import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills()
  .then(() =>
    Promise.all([
      import(/* webpackChunkName: "sync-projection" */ '@openlayers-elements/core/ol-map'),
      import(/* webpackChunkName: "sync-projection" */ '@openlayers-elements/swisstopo/swisstopo-wmts'),
    ]),
  )
  .then(() => {
    import('../../adaptive-demo')
    import('@openlayers-elements/maps/ol-layer-openstreetmap')
  })
