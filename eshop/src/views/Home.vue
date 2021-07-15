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
          :loading="loading"
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

          <v-img
            height="250"
            src="@/assets/products/1.png"
          ></v-img>

          <v-card-title>{{item.name}}</v-card-title>

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

            <div>{{item.detail.slice(0, 100)}}...</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="reserve"
            >
              Reserve
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
  import ProductService from '@/services/ProductService'
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
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      formatPrice (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
      }
    }
  }
</script>
<style>
</style>
