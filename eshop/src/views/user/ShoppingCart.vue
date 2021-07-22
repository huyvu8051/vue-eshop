<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Shopping Cart
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"> Address </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"> Order </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <ShoppingCart class="ma-1" color="grey lighten-1" height="200px" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <Address class="ma-2" color="grey lighten-1" height="200px" />
      </v-stepper-content>

      <v-stepper-content step="3">
          <Order class="mb-12" color="grey lighten-1" height="200px"
            :address="address"
          />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import ShoppingCart from '@/components/user/ShoppingCart'
import Order from '@/components/user/Order'
import Address from '@/components/user/Address'
export default {
  data () {
    return {
      e1: 1,
      address: ''
    }
  },
  components: {
    ShoppingCart,
    Address,
    Order
  },
  created () {
    this.$eventBus.$on('nextStep', () => {
      this.e1++
    })
    this.$eventBus.$on('previous', () => {
      this.e1--
    })
    this.$eventBus.$on('saveAddressInfo', (data) => {
      this.address = data.address
    })
  }
}
</script>
