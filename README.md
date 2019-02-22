# OpenLayers Web Components

This is monorepo which contains: 

1. base OpenLayers elements (`./elements/openlayers-elements`)
1. Swiss maps from geoadmin.ch (`./elements/swisstopo-elements`)

## Demo

Check out the [live demo][demo] online

The Swiss maps only work locally due to [access restrictions][wa]. To run simply execute

```
yarn build
yarn start
```

And open the webpack-dev-server page (typically http://localhost:8080)

[wa]: https://shop.swisstopo.admin.ch/en/products/geoservice/swisstopo_geoservices/WMTS_info
[demo]: https://openlayers-elements.netlify.com/
