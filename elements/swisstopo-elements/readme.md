# swisstopo-elements

OpenLayers elements for adding swisstopo maps to `openlayers-elements`

## Quick start

To install run

```
yarn add @zazuko/swisstopo-elements
```

Then add the WMTS layer to your `ol-map` 

```html
<script type="module">
  import 'openlayers-elements/ol-map'
  import 'openlayers-elements/ol-layer-openstreetmap'
</script>

<ol-map zoom="7" lat="46.7985" lon="8.2318">
    <swisstopo-wmts layer-name="ch.swisstopo.pixelkarte-grau"></swisstopo-wmts>
</ol-map>
```

    For valid layer names, check http://api3.geo.admin.ch/api/faq/index.html#which-layers-are-available

Note that these layers require to register with http://swisstopo.ch/webaccess

## Running examples

For the reason mentioned above, the online demos don't work. You can run them locally (check the
root readme). Here's a how the two sample maps look like in the browser when the map API is acessible:

![swisstopo example](https://raw.githubusercontent.com/zazuko/openlayers-elements/master/elements/swisstopo-elements/assets/swisstopo.png)

It is jus tas easy to overlay OpenStreetMap with a Swisstopo layer:

![swisstopo OSM](https://raw.githubusercontent.com/zazuko/openlayers-elements/master/elements/swisstopo-elements/assets/swisstopo+osm.png)
