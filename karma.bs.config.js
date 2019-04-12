/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires  */
const merge = require('webpack-merge')
const bsSettings = require('@open-wc/testing-karma-bs/bs-settings.js')
const karmaEs5Config = require('./karma.conf.js')

module.exports = (config) => {
  config.set(
    merge(bsSettings(config), karmaEs5Config(config), {
      files: [
        {
          pattern: 'test/_polyfills.js',
        },
      ],
      browserStack: {
        project: '@openlayers-elements/maps',
      },
    }),
  )

  return config
}
