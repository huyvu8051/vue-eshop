<template>
  <nav>
    <v-app-bar app flat dark>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">E</span>
        <span>Shop</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="grey" v-if="!$store.state.isUserLoggedIn" :to="{name: 'login'}">
        <span>Sign in</span>
        <v-icon right>login</v-icon>
      </v-btn>
      <v-btn text color="grey" v-if="!$store.state.isUserLoggedIn" :to="{name: 'register'}">
        <span>Sign up</span>
        <v-icon right>how_to_reg</v-icon>
      </v-btn>
      <!-- <v-btn text color="grey" v-if="$store.state.isUserLoggedIn" :to="{name: 'user.details'}">
        <span>Hi! ({{cart.quantity}})</span>
        <v-icon right>account_box mdi-cart</v-icon>
      </v-btn> -->
      <v-btn text color="grey" v-if="$store.state.isUserLoggedIn" @click="logout">
        <span>Sign out</span>
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import CartService from '@/services/CartService'
import Store from '@/store/store.js'
export default {
  data () {
    return {
      selectedItem: 0,
      items: [
        {text: 'My Account', icon: 'mdi-folder', route: '/user/details'},
        {text: 'Shopping Cart', icon: 'mdi-account-multiple', route: '/user/cart'},
        {text: 'My Order', icon: 'mdi-star', route: '/user/order'}
      ],
      right: null,
      drawer: false,
      links: [
        {icon: 'inventory_2', text: 'Product', route: '/admin/product'},
        {icon: 'category', text: 'Category', route: '/admin/category'},
        {icon: 'category', text: 'Order', route: '/admin/order'},
        {icon: 'group', text: 'User', route: '/admin/user'}
      ],
      email: '',
      cart: {
        productList: [],
        quantity: 0
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setEmail', null)
      this.$router.push({
        name: 'login'
      })
    },
    userDetail () {
      console.log('this is userDetail')
    }
  },
  created () {
    this.$eventBus.$on('updateCart', () => {
      let cart = CartService.getCart()
      console.log('update cart: ', cart)
      this.cart = cart
      this.cart.quantity = cart.productList.length
    })
    this.$eventBus.$emit('updateCart')
    this.email = Store.state.email
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #E9E;
}
</style>
