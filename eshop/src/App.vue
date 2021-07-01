<template>
  <v-app>
    <div id="loading" v-if="loading">
      <img src="/static/img/loading.gif" alt="loading">
    </div>
    <page-header/>
    <v-main class="ma-4">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import PageHeader from '@/components/Header'
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
    PageHeader
  }
}
</script>
<style>
.error {
  color: red;
}
</style>
