# Open Layers element bundle

This package can be used to very easily add maps to static web pages. Simply
add the necessary scripts to you HTML. At minimum, you'll need the `ol-map` element and
a layer, such as `ol-layer-openstreetmap`

```html
<head>
  <script async defer src="/path/to/assets/@openlayers-elements/bundle/dist/ol-map.js" type="module"></script>
  <script async defer src="/path/to/assets/@openlayers-elements/bundle/dist/ol-layer-openstreetmap.js" type="module"></script>
</head>

<body>
  <ol-map>
    <ol-layer-openstreetmap></ol-layer-openstreetmap>
  </ol-map>
</body>
```

Consult the [documentation](https://openlayers-elements.netlify.app/) for a list of available elements.

## CDN usage

If you do not wish or cannot install the package, you can load the elements from a CDN, such as unpkg:

```html
<script src="https://unpkg.com/@openlayers-elements/bundle/dist/ol-map.js"></script>
```
