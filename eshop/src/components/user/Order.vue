<template>
  <v-row>
    <v-col
      cols="12"
      sm="8"
    >
      <v-data-table
        dense
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:[`item.total`]="{ item }">
          {{item.product.price * item.quantity}}
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <v-col
      cols="12"
      sm="4"
    >
      <v-card
        class="mx-auto"
        tile
      >
        <v-subheader>REPORTS</v-subheader>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>User Name</v-list-item-title>
            <v-list-item-subtitle>{{email}}</v-list-item-subtitle>
            <v-list-item-subtitle>Phone Number: {{totalPrice}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Shipping Address</v-list-item-title>
            <v-list-item-subtitle>{{address}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Total price</v-list-item-title>
            <v-list-item-subtitle>{{totalPrice}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4"></v-divider>
          <v-card-actions class="mx-4">
            <v-btn
              color="light-blue"
              dark
              rounded
              depressed
              @click="confirmOrder"
            >
              Order
              <v-icon right>
                add_shopping_cart
              </v-icon>
            </v-btn>
            <v-btn
              color="warning"
              dark
              rounded
              depressed
              @click="previous"
            >
              Cancel
              <v-icon right>
                remove
              </v-icon>
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import CartService from '@/services/CartService'
import OrderService from '@/services/user/OrderService'
export default {
  data: () => ({
    e1: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'product.name'
      },
      { text: 'Price(đ)', value: 'product.price' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Total', value: 'total' }
    ],
    desserts: [],
    email: ''
  }),
  props: {
    address: String
  },
  computed: {
    quantityErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Quantity is required.')
      return errors
    },
    totalPrice () {
      let total = 0
      this.desserts.forEach(item => {
        total += item.product.price * item.quantity
      })
      return total
    }
  },

  created () {
    this.initialize()
    this.initializeEmail()
  },
  methods: {
    confirmOrder () {
      let cart = CartService.getCart()
      let orderData = {
        cart: cart.productList,
        shippingInfo: {
          shipping_address: this.address,
          email: this.email
        }
      }
      OrderService.createOrder(orderData)
      CartService.removeCart()
      this.$router.push({
        name: 'user.order'
      })
    },
    previous () {
      this.$eventBus.$emit('previous')
    },
    initializeEmail () {
      this.email = this.$store.state.email
    },
    async initialize () {
      let cart = CartService.getCart()
      let ids = []
      cart.productList.forEach((item) => {
        ids.push(item.id)
      })
      const respone = await CartService.findAllByArrayId({
        ids: ids
      })
      cart.productList.forEach((item) => {
        item.product = respone.data.find((e) => {
          return item.id === e.id
        })
      })
      console.log(cart)
      this.desserts = cart.productList
    }
  }
}
</script>
