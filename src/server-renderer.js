import Vue from 'vue'
import fs from 'fs'
import vueServerRender from 'vue-server-renderer'

const app = new Vue({
  el: '#app'
})

export function renderApp(path, callback) {
  const renderer = vueServerRender.createRenderer({
    template: fs.readFileSync('./index.html', 'utf-8')
  })
  renderer.renderToString(app, (err, html) => {
    callback(null, html)
  })
}
