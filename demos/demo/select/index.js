import loadPolyfills from '@open-wc/polyfills-loader'

loadPolyfills()
  .then(() => import('@openlayers-elements/core/ol-map'))
  .then(() => {
    import('@polymer/iron-demo-helpers/demo-snippet')
    import('@openlayers-elements/maps/ol-select')
    import('@openlayers-elements/maps/ol-layer-geojson')
  })
