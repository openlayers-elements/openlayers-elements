# @openlayers-elements/core

## 0.3.0

### Minor Changes

- 3658c65: Updated `lit-html` and `lit-element` to `lit@2`

### Patch Changes

- a75e392: Let created features access the map element, for example to get the projection
- d3165fc: Type declarations were not included in the packages no NPM (fixes #82)

## 0.2.2

### Patch Changes

- f51a093: `attach` and `attached` events should work from with nested Shadow DOM (re #76)

## 0.2.1

### Patch Changes

- f8ab7fa: Forward events from OpenLayers objects:

  - `ol-map`:
    - `moveend`
    - `change`
  - `ol-layer-*`, swisstopo layers:
    - `change`

## 0.2.0

### Minor Changes

- a9a6a83: Update OpenLayers
