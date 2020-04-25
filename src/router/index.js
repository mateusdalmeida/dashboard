import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dash from '../views/Dash.vue'
import Users from '../views/Users.vue'

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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
