# OpenLayers Web Components

This is monorepo which contains:

- core OpenLayers elements (incl. map itself) ([`@openlayers-elements/core`](elements/openlayers-core))
- common OpenLayers elements (layers, markers, etc) ([`@openlayers-elements/openlayers-elements`](elements/openlayers-elements))
- Swiss layers from geoadmin.ch ([`@openlayers-elements/swisstopo-elements`](elements/swisstopo-elements))
- Package with bundles for quick and easy usage ([`@openlayers-elements/bundle`](bundle))

## Features

While extensive, human-friendly documentation is not yet available, be sure to check out the different features supported by the components live:

- Core map features
  - [Zooming to layers and features](https://openlayers-elements.netlify.app/?path=/story/core-ol-map--zoom-to-extent)
- OpenStreetMaps
  - [DEMO](https://openlayers-elements.netlify.app/?path=/docs/layers-ol-layer-openstreetmap--docs)
- Adding features to the map (aka. vector layers)
  - [GeoJSON](https://openlayers-elements.netlify.app/?path=/story/core-ol-select--popup)
  - [WKT](https://openlayers-elements.netlify.app/?path=/docs/layers-ol-layer-wkt--docs)
  - [Styling](https://openlayers-elements.netlify.app/?path=/story/layers-ol-layer-geojson--basic), actual code [here](storybook/lib/styled-map.ts)
- XYZ Tile layers
  - [DEMO](https://openlayers-elements.netlify.app/?path=/docs/layers-ol-layer-xyz--docs)
- Map markers
  - [DEMO](https://openlayers-elements.netlify.app/?path=/docs/core-ol-marker-icon--docs)
- Map interactions
  - [Select on click](https://openlayers-elements.netlify.app/?path=/docs/core-ol-select--docs)
- Adding custom map controls
  - [Positioning and styling](https://openlayers-elements.netlify.app/?path=/docs/core-ol-control--docs)
- Adding overlays (popups, etc)
  - [Basic example](https://openlayers-elements.netlify.app/?path=/story/core-ol-overlay--popup)
  - [Combine with selection](https://openlayers-elements.netlify.app/?path=/story/core-ol-overlay--geo-json)
- [Swiss layers](https://openlayers-elements.netlify.app/?path=/docs/swisstopo-swisstopo--docs)
  - WMTS source
  - XYZ layers, reprojected to Mercator

## API Docs

[Storybook](https://openlayers-elements.netlify.app/) also include generated API documentation.

## Running Storybook locally

Simply execute

```sh
npm install
npm run start
```

And open http://localhost:6006

You may also start a watch process to update the generated custom elements manifest automatically:

```sh
npm -w storybook run custom-elements-manifest:watch
```
