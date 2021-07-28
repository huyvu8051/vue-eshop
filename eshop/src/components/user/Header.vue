<template>
  <nav>
    <v-app-bar app flat>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">E</span>
        <span>Shop</span>
      </v-toolbar-title>
      <v-btn text color="grey" :to="{name: 'home'}">
        <span>Home</span>
        <v-icon right>home</v-icon>
      </v-btn>
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
      <div class="text-center" v-if="$store.state.email">
        <v-menu
          open-on-hover
          top
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Cart ({{cart.quantity}})
            </v-btn>
          </template>

          <v-list>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{email}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="selectedItem"
              color="primary"
            >
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                router
                :to="item.route"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
      <v-btn text color="grey" v-if="$store.state.isUserLoggedIn" @click="logout">
        <span>Sign out</span>
        <v-icon right>logout</v-icon>
      </v-btn>
    </v-app-bar>
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
        {
          text: 'My Account',
          icon: 'mdi-folder',
          route: {
            name: 'user.profile'
          }
        },
        {
          text: 'Shopping Cart',
          icon: 'mdi-account-multiple',
          route: {
            name: 'user.cart'
          }
        }
      ],
      right: null,
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
