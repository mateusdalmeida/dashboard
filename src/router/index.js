import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login.vue'
import Dash from '@/views/Dash.vue'
import Users from '@/views/Users.vue'
import GenericView from '@/components/GenericView'
import Gallery from '@/views/Gallery'

import modules from "@/config/modules"

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

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
    component: Users,
    beforeEnter: ifAuthenticated
  },
]

Object.entries(modules).forEach(module => {
  if (module[1].module_type != "custom") {
    var route = {
      path: `/${module[0]}`,
      name: `${module[0].charAt(0).toUpperCase() + module[0].slice(1)}`,
      meta: module[1]
    }
    if (module[1].module_type == "view" || module[1].module_type == "crud") {
      route['component'] = GenericView
    }
    if (module[1].module_type == "img_gallery") {
      route['component'] = Gallery
    }
    routes.push(route)
  }

})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
