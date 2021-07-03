<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{title}}
        </v-card-title>

        <v-card-text>
          {{message}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false, routeToLogin()"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: true
      }
    },
    props: {
      title: String,
      message: String,
      route: String
    },
    methods: {
      routeToLogin () {
        console.log(this.route)
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
</script>
