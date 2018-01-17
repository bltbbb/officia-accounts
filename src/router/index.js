import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Layout from '@/views/Layout/Layout'
import User from '@/views/User/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/User',
      component: Layout,
      redirect: '/User/index',
      children: [{
        path: 'index',
        component: User,
        name: 'User',
        meta: { title: 'User', icon: 'User', noCache: true }
      }]
    },
  ]
})
