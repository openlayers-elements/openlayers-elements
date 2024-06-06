# OpenLayers Web Components

This is monorepo which contains:

- core OpenLayers elements (incl. map itself) ([`@openlayers-elements/core`](elements/openlayers-core))
- common OpenLayers elements (layers, markers, etc) ([`@openlayers-elements/openlayers-elements`](elements/openlayers-elements))
- Swiss layers from geoadmin.ch ([`@openlayers-elements/swisstopo-elements`](elements/swisstopo-elements))
- Package with bundles for quick and easy usage ([`@openlayers-elements/bundle`](bundle))

## Features

While extensive, human-friendly documentation is not yet available, be sure to check out the different features supported by the components live:

- Core map features
  - [Zooming to layers and features](https://openlayers-elements.netlify.com/#/elements/ol-map/demos/zoom-to-extent)
- OpenStreetMaps
  - [DEMO](https://openlayers-elements.netlify.com/#/elements/ol-layer-openstreetmap/demos/standard-map)
- Adding features to the map (aka. vector layers)
  - [GeoJSON](https://openlayers-elements.netlify.com/#/elements/ol-layer-geojson/demos/demo/select/)
  - [WKT](https://openlayers-elements.netlify.com/#/elements/ol-layer-wkt/demos/demo/wkt/)
  - [Styling](https://openlayers-elements.netlify.com/#/elements/ol-layer-vector/demos/styling), actual code [here](https://github.com/zazuko/openlayers-elements/blob/master/demos/demo/vector-styling/styled-map.js#L53)
- XYZ Tile layers
  - [DEMO](https://openlayers-elements.netlify.com/#/elements/ol-layer-xyz/demos/demo/xyz/)
- Map markers
  - [DEMO](https://openlayers-elements.netlify.com/#/elements/ol-marker-icon/demos/demo/markers/)
- Map interactions
  - [Select on click](https://openlayers-elements.netlify.com/#/elements/ol-select/demos/demo/select/)
- Adding custom map controls
  - [Positioning and styling](https://openlayers-elements.netlify.com/#/elements/ol-control/demos/demo/control/)
- Adding overlays (popups, etc)
  - [Basic example](https://openlayers-elements.netlify.com/#/elements/ol-overlay/demos/basic-example)
  - [Combine with selection](https://openlayers-elements.netlify.com/#/elements/ol-overlay/demos/combined-with-ol-select)
- Swiss layers
  - [WMTS source](https://openlayers-elements.netlify.com/#/elements/swisstopo-wmts/demos/demo/swiss-topo/)
  - [XYZ layers, reprojected to Mercator](https://openlayers-elements.netlify.com/#/elements/swisstopo-reprojected/demos/demo/swiss-reprojected/)

## API Docs

All the [live demos](https://openlayers-elements.netlify.com/) also include generated API documentation.

## Running locally

Simply execute

```sh
npm install
npm run build
npm run start
```

And open http://localhost:8080
