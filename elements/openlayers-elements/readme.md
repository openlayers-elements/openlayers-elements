# openlayers-elements

Custom element wrapping OpenLayers 5 API, thus providing a declarative
way to create online maps.

## Quick start

To install run

```
yarn add open-layer-elements
```

Here's the simplest possible OpenStreetMap:

```html
<script type="module">
  import 'openlayers-elements/ol-map'
  import 'openlayers-elements/ol-layer-openstreetmap'
</script>

<ol-map zoom="7" lat="46.7985" lon="8.2318">
    <ol-layer-openstreetmap></ol-layer-openstreetmap>
</ol-map>
```

For further examples go to the online demos, linked from GitHub.
