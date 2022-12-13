#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
import esbuild from 'esbuild'

esbuild.build({
  entryPoints: [
    '../elements/openlayers-core/ol-layer-vector.ts',
    '../elements/openlayers-elements/ol-control.ts',
    '../elements/openlayers-elements/ol-layer-geojson.ts',
    '../elements/openlayers-elements/ol-layer-openstreetmap.ts',
    '../elements/openlayers-elements/ol-layer-wkt.ts',
    '../elements/openlayers-elements/ol-layer-xyz.ts',
    '../elements/openlayers-elements/ol-map.ts',
    '../elements/openlayers-elements/ol-marker-icon.ts',
    '../elements/openlayers-elements/ol-overlay.ts',
    '../elements/openlayers-elements/ol-select.ts',
    '../elements/swisstopo-elements/swisstopo-reprojected.ts',
    '../elements/swisstopo-elements/swisstopo-wmts.ts',
  ],
  outdir: 'dist',
  chunkNames: 'ol-[hash]',
  entryNames: '[name]',
  format: 'esm',
  minify: true,
  bundle: true,
  splitting: true,
  treeShaking: true,
}).catch(() => process.exit(1))
