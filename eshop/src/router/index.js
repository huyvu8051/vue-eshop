import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/components/admin/Admin'
import User from '@/components/user/User'
import Category from '@/views/admin/Category'
import Details from '@/views/user/Details'
import Product from '@/views/admin/Product'
import Register from '@/views/Register'
import Home from '@/views/Home'

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
      path: '/',
      name: 'home',
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
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      redirect: {path: '/user/details'},
      children: [
        {
          path: 'details',
          name: 'user.details',
          component: Details
        }
      ]
    }
  ],
  mode: 'history'
})
