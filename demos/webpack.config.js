const path = require('path')
const glob = require('glob')
const defaultConfig = require('@open-wc/building-webpack/modern-and-legacy-config')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const demos = glob.sync('./demo/**/index.html').map((html) => {
  const demoDir = /^(.+)\/index.html$/.exec(html)[1]

  let configs = defaultConfig({
    input: path.resolve(__dirname, html),
  })

  if (!Array.isArray(configs)) {
    configs = [configs]
  }

  return configs.map((config) => {
    return merge(config, {
      output: {
        path: path.resolve(__dirname, `dist/${demoDir}`),
      },
    })
  })
})

let configs = defaultConfig({
  input: path.resolve(__dirname, './index.html'),
})

if (!Array.isArray(configs)) {
  configs = [configs]
}

const indexConfigs = configs.map((config) => {
  return merge(config, {
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
            return analysis.toString().replace(/https:\/\/openlayers-elements.netlify.com\//g, '')
          },
        },
      ]),
    ],
  })
})

module.exports = [...indexConfigs, ...demos.reduce((acc, val) => acc.concat(val), [])]
