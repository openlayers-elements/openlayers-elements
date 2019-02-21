# Open Layers Web Components

This is monorepo which contains: 

1. base OpenLayers elements (`./elements/openlayers-elements`) ([in catalog](https://www.webcomponents.org/element/@openlayers-elements/maps))
1. Swiss maps from geoadmin.ch (`./elements/swisstopo-elements`) ([in catalog](https://www.webcomponents.org/element/@openlayers-elements/swisstopo))

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

## Acknowledgements

Carefully tested on Browserstack

[![img](https://github.com/zazuko/openlayers-elements/raw/master/assets/Browserstack-logo%402x.png)](https://www.browserstack.com/open-source)
