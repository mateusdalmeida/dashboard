import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Config, { http, project_data } from './config/config'
import firebase from "./config/firebaseConfig";

Vue.config.productionTip = false

Vue.use(Config)

const token = localStorage.getItem('user-token')
if (token) {
  http.defaults.headers.common['Authorization'] = token
}

if (project_data.USE_FIREBASE) {
  let app = ''
  firebase.auth().onAuthStateChanged(() => {
    if (!app) {
      app = new Vue({
        router,
        store,
        vuetify,
        render: function (h) { return h(App) }
      }).$mount('#app')
    }
  })
} else {
  new Vue({
    router,
    store,
    vuetify,
    render: function (h) { return h(App) }
  }).$mount('#app')
}

