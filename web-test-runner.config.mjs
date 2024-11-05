/* eslint-disable import/no-extraneous-dependencies */
import { esbuildPlugin } from '@web/dev-server-esbuild'
import { fromRollup } from '@web/dev-server-rollup'
import commonjs from '@rollup/plugin-commonjs'

export default {
  files: 'elements/**/*.test.ts',
  nodeResolve: true,
  coverage: true,
  plugins: [
    esbuildPlugin({ ts: true, tsconfig: './tsconfig.json' }),
    fromRollup(commonjs)({
      exclude: [
        '**/node_modules/@open-wc/**/*',
        '**/node_modules/chai/**/*',
        '**/node_modules/chai-dom/**/*',
        '**/node_modules/sinon-chai/**/*',
      ],
    }),
  ],
}
