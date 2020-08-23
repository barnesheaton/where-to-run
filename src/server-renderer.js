import Vue from 'vue'
import fs from 'fs'
import { createRenderer } from 'vue-server-renderer'

const app = new Vue({
  el: '#app'
})

export function renderApp(path, callback) {
  const renderer = createRenderer({
    template: fs.readFileSync('./index.html', 'utf-8')
  })
  renderer.renderToString(app, (err, html) => {
    callback(null, html)
  })
}
