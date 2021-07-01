import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import TestLogin from '@/components/pages/TestLogin'
import Admin from '@/views/admin/Admin'
import Category from '@/components/pages/admin/Category'
import Product from '@/components/pages/admin/Product'
import Register from '@/components/Register'
import Songs from '@/components/Songs'
import Home from '@/components/Home'
import CreateSong from '@/components/CreateSong'
import CRUD from '@/components/CRUD'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   redirect: {path: 'login'}
    // },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/testlogin',
      name: 'testlogin',
      component: TestLogin
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/crud',
      name: 'crud',
      component: CRUD
    },
    {
      path: '/',
      name: '*',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: {path: '/admin/category'},
      children: [
        {
          path: 'category',
          name: 'admin.category',
          component: Category
        },
        {
          path: 'product',
          name: 'admin.product',
          component: Product
        }
      ]
    }
  ],
  mode: 'history'
})
