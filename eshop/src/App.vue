<template>
  <div id="app">
    <div id="loading" v-if="loading">
        <img src="/static/img/loading.gif" alt="loading">
    </div>
    <!-- header -->
    <Header/>
    <!-- end header -->
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
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
    Header
  }
}
</script>
<style>
.error {
  color: red;
}
</style>
