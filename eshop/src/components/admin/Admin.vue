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
import PageHeader from '@/components/admin/Header'
import PageFooter from '@/components/admin/Footer'
export default {
  name: 'admin',
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
