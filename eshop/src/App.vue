<template>
  <v-app>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <h1 class="text-h4 font-weight-thin mb-4">
            EShop
          </h1>
          <h4 class="subheading">
            All products
          </h4>
        </v-col>
      </v-row>
    </v-parallax>
    <div id="loading" v-if="loading" class="loader">
      <!-- <img src="/static/img/loading.gif" alt="loading"> -->
    </div>
    <page-header/>
    <v-main>
      <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
    </v-main>
    <page-footer/>
  </v-app>
</template>
<script>
import PageHeader from '@/components/Header'
import PageFooter from '@/components/Footer'
export default {
  name: 'App',
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.$eventBus.$on('loadingStatus', payload => {
      console.log('loadingStatus: ', payload)
      this.loading = payload
    })
  },
  components: {
    PageHeader,
    PageFooter
  }
}
</script>
<style>
.error {
  color: red;
}
.loader{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url('/static/img/loading.gif')
              50% 50% no-repeat rgba(249, 249, 249, 0.632);
}
</style>
