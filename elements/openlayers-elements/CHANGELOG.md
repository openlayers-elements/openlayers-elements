# @openlayers-elements/maps

## 0.4.0

### Minor Changes

- 4128ac5: Building the package with `moduleResolution=NodeNext`
- a248519: upgrade to openlayers v7, fix typing & tests

### Patch Changes

- 896caca: Updated lit to v3
- 4128ac5: Mark the packages as ESM which they are
- 6ce1681: Remove unused dependency `resize-observer-polyfill`
- b21a74c: Added `custom-elements.json` ([Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/))
- 6ce1681: `ol-style`: added `featureStyle` property
- e355696: Added JSDoc tags for slots of `ol-control` and `ol-overlay`
- Updated dependencies [80a1791]
- Updated dependencies [896caca]
- Updated dependencies [6c95f4c]
- Updated dependencies [4128ac5]
- Updated dependencies [9117dc7]
- Updated dependencies [4128ac5]
- Updated dependencies [e355696]
- Updated dependencies [b21a74c]
- Updated dependencies [a248519]
  - @openlayers-elements/core@0.4.0

## 0.3.0

### Minor Changes

- 3658c65: Updated `lit-html` and `lit-element` to `lit@2`

### Patch Changes

- a75e392: Marker icons would show in wrong location when map used any projection other than ESPG:3857 (fixes #83)
- d3165fc: Type declarations were not included in the packages no NPM (fixes #82)
- Updated dependencies [a75e392]
- Updated dependencies [d3165fc]
- Updated dependencies [3658c65]
  - @openlayers-elements/core@0.3.0

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
