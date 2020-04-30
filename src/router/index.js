import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dash from '../views/Dash.vue'
import Users from '../views/Users.vue'
import GenericView from '@/components/GenericView'

import modules from "@/config/modules"

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/dash',
    name: 'Dash',
    component: Dash
  },
  {
    path: '/users',
    name: 'Usuarios',
    component: Users
  },
]

Object.entries(modules).forEach(module => {
  if (module[1].module_type != "custom") {
    if (module[1].module_type == "view" || module[1].module_type == "crud") {
      routes.push({
        path: `/${module[0]}`,
        name: `${module[0].charAt(0).toUpperCase() + module[0].slice(1)}`,
        component: GenericView,
        meta: module[1]
      })
    }
  }

})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
