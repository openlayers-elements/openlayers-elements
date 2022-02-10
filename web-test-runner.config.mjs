/* eslint-disable import/no-extraneous-dependencies */
import { esbuildPlugin } from '@web/dev-server-esbuild'
import { fromRollup } from '@web/dev-server-rollup'
import commonjs from '@rollup/plugin-commonjs'
import { browserstackLauncher } from '@web/test-runner-browserstack'

let bsConfig = {}
if (process.env.BROWSER_STACK_USERNAME && process.env.BROWSER_STACK_ACCESS_KEY) {
  const sharedCapabilities = {
    'browserstack.user': process.env.BROWSER_STACK_USERNAME,
    'browserstack.key': process.env.BROWSER_STACK_ACCESS_KEY,

    project: '@openlayers-elements/maps',
    name: 'Tests',
    build: `build ${process.env.GITHUB_RUN_NUMBER || 'unknown'}`,
  }

  bsConfig = {
    concurrentBrowsers: 2,
    browsers: [
      // create a browser launcher per browser you want to test
      // you can get the browser capabilities from the browserstack website
      browserstackLauncher({
        capabilities: {
          ...sharedCapabilities,
          browserName: 'Chrome',
          os: 'Windows',
          os_version: '10',
        },
      }),

      browserstackLauncher({
        capabilities: {
          ...sharedCapabilities,
          browserName: 'Safari',
          browser_version: '14.1',
          os: 'OS X',
          os_version: 'Big Sur',
        },
      }),

      browserstackLauncher({
        capabilities: {
          ...sharedCapabilities,
          browserName: 'Edge',
          os: 'Windows',
          os_version: '10',
        },
      }),
    ],
  }
}

export default {
  files: 'elements/**/*.test.ts',
  nodeResolve: true,
  coverage: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    fromRollup(commonjs)({
      exclude: [
        '**/node_modules/@open-wc/**/*',
        '**/node_modules/chai/**/*',
        '**/node_modules/chai-dom/**/*',
        '**/node_modules/sinon-chai/**/*',
      ],
    }),
  ],
  ...bsConfig,
}
