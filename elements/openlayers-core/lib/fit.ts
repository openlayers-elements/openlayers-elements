import type OlMap from 'ol/Map.js'
import type SimpleGeometry from 'ol/geom/SimpleGeometry.js'
import type { FitOptions } from 'ol/View.js'

export default function fit(map: OlMap | undefined, extent: SimpleGeometry | number[], options?: FitOptions) {
  map?.getView().fit(extent, {
    size: map.getSize(),
    // constrainResolution: false,
    nearest: false,
    ...options,
  })
}
