# OpenLayers Web Components

This is monorepo which contains: 

1. core OpenLayers elements (incl. map itself) ([`elements/openlayers-core`](elements/openlayers-core)) ([in catalog](https://www.webcomponents.org/element/@openlayers-elements/core))
1. common OpenLayers elements (layers, markers, etc) ([`elements/openlayers-elements`](elements/openlayers-elements)) ([in catalog](https://www.webcomponents.org/element/@openlayers-elements/maps))
1. Swiss layers from geoadmin.ch ([`elements/swisstopo-elements`](elements/swisstopo-elements)) ([in catalog](https://www.webcomponents.org/element/@openlayers-elements/swisstopo))

## Features

While extensive, human-friendly documentation is not yet available, be sure to check out the different features
supported by the components live:

1. Core map features
    * [Zooming to layers and features](https://openlayers-elements.netlify.com/#/elements/ol-map/demos/zoom-to-extent)
1. OpenStreetMaps
    * [DEMO](https://openlayers-elements.netlify.com/#/elements/ol-layer-openstreetmap/demos/standard-map)
1. Adding features to the map (aka. vector layers)
    * [GeoJSON](https://openlayers-elements.netlify.com/#/elements/ol-layer-geojson/demos/demo/select/)
    * [WKT](https://openlayers-elements.netlify.com/#/elements/ol-layer-wkt/demos/demo/wkt/)
    * [Styling](https://openlayers-elements.netlify.com/#/elements/ol-layer-vector/demos/styling), actual code [here](https://github.com/zazuko/openlayers-elements/blob/master/demos/demo/vector-styling/styled-map.js#L53)
1. XYZ Tile layers
    * [DEMO](https://openlayers-elements.netlify.com/#/elements/ol-layer-xyz/demos/demo/xyz/)
1. Map markers
    * [DEMO](https://openlayers-elements.netlify.com/#/elements/ol-marker-icon/demos/demo/markers/)
1. Map interactions
    * [Select on click](https://openlayers-elements.netlify.com/#/elements/ol-select/demos/demo/select/)
1. Adding custom map controls
    * [Positioning and styling](https://openlayers-elements.netlify.com/#/elements/ol-control/demos/demo/control/)
1. Adding overlays (popups, etc)
    * [Basic example](https://openlayers-elements.netlify.com/#/elements/ol-overlay/demos/basic-example)
    * [Combine with selection](https://openlayers-elements.netlify.com/#/elements/ol-overlay/demos/combined-with-ol-select)
1. Swiss layers
    * [WMTS source](https://openlayers-elements.netlify.com/#/elements/swisstopo-wmts/demos/demo/swiss-topo/)
    * [XYZ layers, reprojected to Mercator](https://openlayers-elements.netlify.com/#/elements/swisstopo-reprojected/demos/demo/swiss-reprojected/)
    
Currently the Swiss maps only work locally due to [access restrictions][wa]. Read below for local run
instructions.

## API Docs

All the [live demos][demo] also include generated API documentation.

## Running locally

Simply execute

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
