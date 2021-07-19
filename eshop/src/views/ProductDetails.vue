<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        cols="12"
        md="8"
        class="d-flex"
        style="flex-direction:column"
        >
        <v-img
          class="my-auto"
          :src="require(`@/assets/products/${product.img}`)"
        ></v-img>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="d-flex"
        style="flex-direction:column"
        >
        <div
          class="my-auto">
          <v-card-title>{{product.name}}</v-card-title>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                {{formatPrice(product.price)}}
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              {{product.Category.name}}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions class="mx-4">
            <v-btn
              color="light-blue"
              dark
              rounded
              depressed
              @click="addToCart(item.id)"
            >
              <v-icon>
                add_shopping_cart
              </v-icon>
            </v-btn>
            <v-btn
              color="pink"
              dark
              rounded
              depressed
              @click="addToFavorite(item.id)"
            >
              <v-icon>
                favorite_border
              </v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-col>
      <v-col
        cols="12">
        <v-card-title>Product Details</v-card-title>

        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
          </v-row>

          <div class="my-4 text-subtitle-1">
            {{product.name}}
          </div>

          <div>{{product.detail}}</div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductService from '@/services/ProductService'
import CartService from '@/services/CartService'
export default {
  data () {
    return {
      productId: this.$route.params.id,
      product: {
        name: '',
        Category: {
          name: ''
        },
        price: 0,
        img: '1.png'
      }
    }
  },
  methods: {
    async initialize () {
      try {
          const response = await ProductService.findOneById({
            id: this.productId
          })
          console.log('response==========', response.data)
          this.product = response.data
      } catch (error) {
        this.error = error
      }
    },
    formatPrice (price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    async addToCart (id) {
      try {
        const response = await CartService.addProduct({
          id: id
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
     this.initialize()
  }
}
</script>

<style>

</style>
