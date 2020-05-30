import Vue from 'vue'
import Vuex from 'vuex'
import modules from "@/store/modules.js"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: modules,
})
