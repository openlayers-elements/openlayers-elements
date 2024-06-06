/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'

const __dirname = new URL('.', import.meta.url).pathname

const demos = glob.sync('./demo/**/index.html').reduce((acc, html) => {
  const demoDir = /^(.+)\/index.html$/.exec(html)[1]

  return {
    ...acc,
    [demoDir]: resolve(__dirname, html),
  }
}, {})

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...demos,
      },
    },
  },
})
