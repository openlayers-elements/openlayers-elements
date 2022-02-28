---
'@openlayers-elements/maps': patch
---

Dispatch `view-change` event from `ol-map` when the view moves. Its detail is an object like

```ts
const detail: {
  lat: number,
  lon: number,
  center: Coordinate,
  projection: Projection,
  resolution: number,
  rotation: number,
  zoom: number
}
```

fixes #63
