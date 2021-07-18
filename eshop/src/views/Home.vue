<template>
  <div>
    <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="(item, index) in desserts" v-bind:key="index"
          >
          <v-card
            class="mx-auto my-5"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <router-link
              :to="{
                name: 'productDetails',
                params: { id: item.id }
              }">
              <v-img
                height="250"
                :src="require(`@/assets/products/${item.img}`)"
              ></v-img>
            </router-link>
            <router-link
              :to="{
                name: 'productDetails',
                params: { id: item.id }
              }"
              style="text-decoration: none">
              <v-card-title>{{item.name}}</v-card-title>
            </router-link>
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
                  {{formatPrice(item.price)}}
                </div>
              </v-row>

              <div class="my-4 text-subtitle-1">
                {{item.Category.name}}
              </div>
              <router-link
              :to="{
                name: 'productDetails',
                params: { id: item.id }
              }"
              style="text-decoration: none;
              color: grey;">
                <div>{{item.detail.slice(0, 100)}}...</div>
              </router-link>
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
          </v-card>
        </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  import ProductService from '@/services/admin/ProductService'
  import CartService from '@/services/CartService'
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      desserts: null,
      page: 1
    }),
    created () {
      this.initialize()
    },
    methods: {
      async initialize () {
        const respone = await ProductService.findAll()
        this.desserts = respone.data
      },
      formatPrice (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
      },
      addToCart (id) {
        CartService.addProduct(id)
        this.$eventBus.$emit('updateCart')
      }
    }
  }
</script>
<style>
</style>
