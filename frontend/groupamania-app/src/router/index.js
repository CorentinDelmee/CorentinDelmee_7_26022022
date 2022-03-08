import { createRouter, createWebHashHistory } from 'vue-router'
import SignInView from '../views/SignInView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: SignInView
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
