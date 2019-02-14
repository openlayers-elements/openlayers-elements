const path = require('path')
var glob = require("glob")

module.exports = {
    mode: 'development',
    entry: [
        './node_modules/@polymer/iron-component-page/iron-component-page.js',
        './node_modules/@polymer/iron-demo-helpers/demo-snippet.js',
        './node_modules/@polymer/iron-demo-helpers/demo-pages-shared-styles.js',
        './demo/demo.js',
        './swiss-topo-layer.js',
        ...glob.sync('./ol-*.js')
    ],
    output: {
        path: path.resolve('./dist'),
        publicPath: "/dist/",
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        compress: true,
        overlay: {
            errors: true
        },
        host: '0.0.0.0',
        disableHostCheck: true
    }
}
