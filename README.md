# Open Layers Web Components

This is monorepo which contains: 

1. base OpenLayers elements (`./elements/openlayers-elements`)
1. Swiss maps from geoadmin.ch (`./elements/swisstopo-elements`)

## Demo

Demo is available online (check the link on GitHub)

The Swiss maps only work locally due to [access restrictions][wa]. To run simply execute

```
yarn build
yarn start
```

And open the webpack-dev-server page (typically http://localhost:8080)

[wa]: https://shop.swisstopo.admin.ch/en/products/geoservice/swisstopo_geoservices/WMTS_info
