import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import Layout from '@/views/Layout/Layout'
import User from '@/views/User/User'
import Article from '@/views/Article'
import NewArticle from '@/views/Article/NewArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: User,
      redirect: '/User/index',
    },
    {
      path: '/Login',
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
    {
      path: '/Article',
      component: Layout,
      redirect: '/Article/index',
      children: [{
        path: 'index',
        component: Article,
        name: 'Article',
        meta: { title: '文章管理', icon: 'Article', noCache: true }
      }]
    },
    {
      path: '/Article',
      component: Layout,
      redirect: '/Article/NewArticle',
      children: [{
        path: 'NewArticle',
        component: NewArticle,
        name: 'NewArticle',
        meta: { title: '文章管理>新建文章', icon: 'Article', noCache: true }
      }]
    },
  ]
})
