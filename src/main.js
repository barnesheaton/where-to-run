import Vue from 'vue'
import App from './App'
import vuetify from './plugins/vuetify' // path to vuetify export

// new Vue({
//   el: '#app',
//   render: (h) => h(App)
// })

new Vue({
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
