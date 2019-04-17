import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills()
  .then(() => import('@openlayers-elements/core/ol-map'))
  .then(() => {
    import('../../adaptive-demo')
    import('@openlayers-elements/maps/ol-select')
    import('@openlayers-elements/maps/ol-layer-wkt')
  })
