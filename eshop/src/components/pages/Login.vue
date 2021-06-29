<template>
  <div class="login">
      <div class="loginHeader">
          User Login
      </div>
      <div class="loginContainer">
          <table>
              <tr>
                  <td>
                      Email
                  </td>
                  <td>:</td>
                  <td>
                      <input type="text" name="email" id="email" placeholder="email"
                        v-model="user.email">
                  </td>
              </tr>
              <tr>
                  <td>
                      UserName
                  </td>
                  <td>:</td>
                  <td>
                      <input type="password" name="password" id="password" placeholder="Password"
                        v-model="user.password">
                  </td>
              </tr>
              <tr>
                  <td>
                  </td>
                  <td></td>
                  <td>
                      <p class="error">{{error}}</p>
                  </td>
              </tr>
              <tr>
                  <td>
                  </td>
                  <td></td>
                  <td>
                      <button type="submit" class="addBtn" @click="login">Login</button>
                  </td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Store from '@/store/store.js'
export default {
  name: 'Login',
  data () {
    return {
      msg: '',
      user: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async login () {
      try {
        this.$eventBus.$emit('loadingStatus', true)
        console.log(this.user)
        const response = await AuthenticationService.login(this.user)
        console.log('response==========', response)
        this.$store.dispatch('setToken', response.data.accessToken)
        this.$store.dispatch('setEmail', response.data.email)
        this.$store.dispatch('setRoles', response.data.roles)
        this.$store.dispatch('setSignature', response.data.signature)
        this.$eventBus.$emit('loadingStatus', false)
        console.log(Store.state)
        this.$router.push({
          name: 'admin.product'
        })
      } catch (error) {
        this.error = error
        this.$eventBus.$emit('loadingStatus', false)
      }
    }
  }
}
</script>

<style>

</style>
