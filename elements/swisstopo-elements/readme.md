# swisstopo-elements

OpenLayers elements for adding swisstopo maps to `open-layers-elements`

## Quick start

To install run

```
yarn add @zazuko/swisstopo-elements
```

Then add the WMTS layer to your `ol-map` 

```html
<script type="module">
  import 'open-layers-elements/ol-map'
  import 'open-layers-elements/ol-layer-openstreetmap'
</script>

<ol-map zoom="7" lat="46.7985" lon="8.2318">
    <swisstopo-wmts layer-name="ch.swisstopo.pixelkarte-grau"></swisstopo-wmts>
</ol-map>
```

For valid layer names, check http://api3.geo.admin.ch/api/faq/index.html#which-layers-are-available

Note that these layers require to register with http://swisstopo.ch/webaccess
