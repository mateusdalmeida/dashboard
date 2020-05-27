import Vue from 'vue'
import Vuex from 'vuex'
import modules from "@/store/modules.js"
import { project_data } from '@/config/config'
import router from "@/router"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
  actions: {
    LOGIN: ({ commit, dispatch }, user) => {
      if (project_data.USE_FIREBASE) {
        dispatch("firebase/FIREBASE_LOGIN", user)
      } else {
        dispatch("auth/AUTH_REQUEST", user).then(() => {
          router.push("/dash");
        })
      }
    }
  },
})
