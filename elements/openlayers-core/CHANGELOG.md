# @openlayers-elements/core

## 0.4.0

### Minor Changes

- 6c95f4c: Removed polyfill of `ResizeObserver`
- 4128ac5: Building the package with `moduleResolution=NodeNext`
- a248519: upgrade to openlayers v7, fix typing & tests

### Patch Changes

- 80a1791: Style `ol-map` using `flex: 1` so that by default it grows to its container. (container must be `display: flex`)
- 896caca: Updated lit to v3
- 9117dc7: Added a `fromJson` in `Style.js` module, which allows converting element attributes to OL styles
- 4128ac5: Mark the packages as ESM which they are
- e355696: Added JSDoc tags for slots of `ol-map` and `ol-layer-vector`
- b21a74c: Added `custom-elements.json` ([Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/))

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
