import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Config, { http } from './config/config'

Vue.config.productionTip = false

Vue.use(Config)

const token = localStorage.getItem('user-token')
if (token) {
  http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
