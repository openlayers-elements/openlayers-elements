const path = require('path')
const glob = require('glob')
const defaultConfig = require('@open-wc/building-webpack/default-config')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const demoHtmls = glob.sync('./demo/*.html').map((html) => {
  return new HtmlWebpackPlugin({
    filename: html,
    template: path.resolve(__dirname, html),
    inject: true,
  })
})

const config = merge(
  defaultConfig({
    indexJS: path.resolve(__dirname, './index.js'),
  }),
  {
    devtool: 'source-map',
    output: {publicPath: '/'},
    devServer: {
      compress: true,
      overlay: {
        errors: true,
      },
      host: '0.0.0.0',
      disableHostCheck: true,
    },
    plugins: [
      new CopyWebpackPlugin(['assets/*.*', '**/*.css']),
      new CopyWebpackPlugin([
        {
          from: 'analysis.json',
          transform: (analysis) => {
            return analysis.toString().replace(/https:\/\/openlayers-elements.netlify.com\//, '')
          },
        },
      ]),
      ...demoHtmls,
    ],
  },
)

module.exports = config
