import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/components/admin/Admin'
import User from '@/components/user/User'
import Category from '@/views/admin/Category'
import AdminOrder from '@/views/admin/Order'
import AdminUser from '@/views/admin/User'
import UserProfile from '@/views/user/Profile'
import UserCart from '@/views/user/ShoppingCart'
import Product from '@/views/admin/Product'
import Register from '@/views/Register'
import Home from '@/views/Home'
import ProductDetails from '@/views/ProductDetails'

import Store from '@/store/store.js'

Vue.use(Router)

const router = new Router({
  routes: [
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
        },
        {
          path: 'order',
          name: 'admin.order',
          component: AdminOrder
        },
        {
          path: 'user',
          name: 'admin.user',
          component: AdminUser
        }
      ]
    },

    // user

    {
      path: '/',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      },
      redirect: {path: '/user/details'},
      children: [
        {
          path: 'details',
          name: 'user.profile',
          component: UserProfile
        },
        {
          path: 'cart',
          name: 'user.cart',
          component: UserCart
        },
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
          component: Home,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/details/:id',
          name: 'productDetails',
          props: true,
          component: ProductDetails
        }
      ]
    }
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log('is admin ', Store.state.roles.includes('ROLE_ADMIN'))
    if (Store.state.roles.includes('ROLE_ADMIN')) {
      next({
        name: 'admin'
      })
    }
    next()
  } else {
    next()
  }
})
export default router
