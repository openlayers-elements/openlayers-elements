const path = require('path');
const defaultConfig = require('@open-wc/building-webpack/default-config');
const merge = require('webpack-merge');

const config = merge(defaultConfig({
        indexJS: path.resolve(__dirname, './index.js'),
    }), {
    devtool: "source-map",
    devServer: {
        compress: true,
        overlay: {
            errors: true
        },
        host: '0.0.0.0',
        disableHostCheck: true
    }
});

module.exports = config;
