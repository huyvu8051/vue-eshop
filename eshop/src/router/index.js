import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import convert from '@/views/ConvertCurrency'
import Admin from '@/components/admin/Admin'
import User from '@/components/user/User'
import Category from '@/views/admin/Category'
import UserDetails from '@/views/user/Details'
import UserOrder from '@/views/user/Order'
import Product from '@/views/admin/Product'
import Register from '@/views/Register'
import Home from '@/views/Home'
import ProductDetails from '@/views/ProductDetails'

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
      path: '/convert',
      name: 'convert',
      component: convert
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
      path: '/details/:id',
      name: 'productDetails',
      props: true,
      component: ProductDetails
    },

    // admin

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

    // user

    {
      path: '/user',
      name: 'user',
      component: User,
      redirect: {path: '/user/details'},
      children: [
        {
          path: 'details',
          name: 'user.details',
          component: UserDetails
        },
        {
          path: 'cart',
          name: 'user.cart',
          component: UserOrder
        },
        {
          path: 'order',
          name: 'user.order',
          component: UserOrder
        }
      ]
    }
  ],
  mode: 'history'
})
