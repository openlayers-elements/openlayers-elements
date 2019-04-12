import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills()
  .then(() => import('@openlayers-elements/maps/ol-map'))
  .then(() => {
    import('../../adaptive-demo')
    import('@openlayers-elements/swisstopo/swisstopo-reprojected')
  })
