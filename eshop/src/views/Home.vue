<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="(item, index) in desserts" v-bind:key="index"
        >
        <v-card
          :loading="loading"
          class="mx-auto my-12"
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
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
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
                4.5 (413)
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              {{item.Category.name}}
            </div>

            <div>{{item.detail}} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, distinctio. Tempore mollitia itaque sunt, commodi nulla nisi, voluptate magnam ipsa vero dolorem animi blanditiis accusamus expedita quibusdam nihil quod ratione.</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </v-card-text>

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
      }
    }
  }
</script>
<style>
</style>
