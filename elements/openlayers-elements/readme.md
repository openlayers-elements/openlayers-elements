# @openlayers-elements/maps [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=VVRSS2FhUGpFd3puR1lKRUVSOHpydERCZG1HOFRZbERFU1lqL3RYSk5Vcz0tLXJvQkExaGtETnE0dFpMRE9NclZiZHc9PQ==--72f989607f4bdd18bea52ad8299b21d23534db2d)](https://www.browserstack.com/automate/public-build/VVRSS2FhUGpFd3puR1lKRUVSOHpydERCZG1HOFRZbERFU1lqL3RYSk5Vcz0tLXJvQkExaGtETnE0dFpMRE9NclZiZHc9PQ==--72f989607f4bdd18bea52ad8299b21d23534db2d)

Custom element wrapping OpenLayers 5 API, thus providing a declarative
way to create online maps.

See [documentation and demos](https://openlayers-elements.netlify.com).

## Quick start

To install run

```
yarn add @openlayers-elements/maps @openlayers-elements/core
```

Here's the simplest possible OpenStreetMap:

```html
<script type="module">
  import '@openlayers-elements/core/ol-map'
  import '@openlayers-elements/maps/ol-layer-openstreetmap'
</script>

<ol-map zoom="7" lat="46.7985" lon="8.2318">
    <ol-layer-openstreetmap></ol-layer-openstreetmap>
</ol-map>
```

For further examples go to the online demos, linked from GitHub.
