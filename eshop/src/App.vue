<template>
  <v-app>
    <div id="loading" v-if="loading" class="loader">
    </div>
      <router-view/>
  </v-app>
</template>
<script>
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
