/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const glob = require('glob')
const defaultConfig = require('@open-wc/building-webpack/modern-config')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const demos = glob.sync('./demo/**/index.html').map((html) => {
  const demoDir = /^(.+)\/index.html$/.exec(html)[1]

  return merge(
    defaultConfig({
      input: path.resolve(__dirname, html),
    }),
    {
      output: {
        path: path.resolve(__dirname, `dist/${demoDir}`),
      },
    },
  )
})

const config = merge(
  defaultConfig({
    input: path.resolve(__dirname, './index.html'),
  }),
  {
    devtool: 'source-map',
    output: { publicPath: '/' },
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
          transform: analysis => analysis.toString().replace(/https:\/\/openlayers-elements.netlify.com\//g, ''),
        },
      ]),
    ],
  },
)

module.exports = [config, ...demos]
