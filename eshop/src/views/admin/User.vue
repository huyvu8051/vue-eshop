<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
<script>
  import UserService from '@/services/admin/UserService'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'email',
            align: 'start',
            sortable: false,
            value: 'email'
          },
          { text: 'create at', value: 'createdAt' }
        ],
        desserts: []
      }
    },
    methods: {
      async initialize () {
        const response = await UserService.findAll()
        console.log(response.data)
        this.desserts = response.data
      }
    },
    created () {
      this.initialize()
    }
  }
</script>
