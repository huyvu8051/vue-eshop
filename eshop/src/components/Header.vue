<template>
  <div id="header">
    <h1 class="fleft">Eshop</h1>
    <a href="#" class="fright" v-if="$store.state.isUserLoggedIn" @click="logout()"> Logout </a>
    <a href="#" class="fright"
        v-if="!$store.state.isUserLoggedIn"
        :to="{
          name: 'login'
        }">
         Login
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'admin'
      })
    }
  }
}
</script>

<style>
</style>
