<template>
  <div>
    <PageHeader/>
    <v-main>
      <v-container fluid>
      <!-- If using vue-router -->
      <router-view/>
    </v-container>
    </v-main>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/user/Header'
import PageFooter from '@/components/user/Footer'
export default {
  name: 'user',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
</style>
