<template>
  <div id="app">
    <v-app>
      <div id="loading" v-if="loading">
        <img src="/static/img/loading.gif" alt="loading">
    </div>
      <page-header />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
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
