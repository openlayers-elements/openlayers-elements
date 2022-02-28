# @openlayers-elements/maps

## 0.2.1

### Patch Changes

- f8ab7fa: Forward events from OpenLayers objects:

  - `ol-map`:
    - `moveend`
    - `change`
  - `ol-layer-*`, swisstopo layers:
    - `change`

- f8ab7fa: Dispatch `view-change` event from `ol-map` when the view moves. Its detail is an object like

  ```ts
  const detail: {
    lat: number
    lon: number
    center: Coordinate
    projection: Projection
    resolution: number
    rotation: number
    zoom: number
  }
  ```

  fixes #63

- Updated dependencies [f8ab7fa]
  - @openlayers-elements/core@0.2.1

## 0.2.0

### Minor Changes

- a9a6a83: Update OpenLayers

### Patch Changes

- Updated dependencies [a9a6a83]
  - @openlayers-elements/core@0.2.0
