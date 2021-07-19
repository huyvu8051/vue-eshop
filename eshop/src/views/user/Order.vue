<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Shopping Cart
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Address
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Order
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <ShoppingCart
          class="ma-1"
          color="grey lighten-1"
          height="200px"/>
      </v-stepper-content>

      <v-stepper-content step="2">
        <Address
          class="ma-2"
          color="grey lighten-1"
          height="200px"
        />

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text
          @click="e1 = 1">
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text
          @click="e1 = 2">
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import ShoppingCart from '@/components/user/ShoppingCart'
import Address from '@/components/user/Address'
  export default {
    data () {
      return {
        e1: 1
      }
    },
    components: {
      ShoppingCart,
      Address
    },
    created () {
    this.$eventBus.$on('nextStep', () => {
      this.e1++
    })
  }
  }
</script>
