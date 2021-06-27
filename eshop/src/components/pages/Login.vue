<template>
  <div class="login">
      <div class="loginHeader">
          User Login
      </div>
      <div class="loginContainer">
          <table>
              <tr>
                  <td>
                      UserName
                  </td>
                  <td>:</td>
                  <td>
                      <input type="text" name="username" id="username" placeholder="Username"
                        v-model="user.username">
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
                      <button type="submit" class="addBtn" @click="login">Login</button>
                  </td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // console.log(this.user)
      this.$eventBus.$emit('loadingStatus', true)

      this.$axios.post('http://rimondb.com/tutorial/api/login', this.user)
        .then(res => {
          this.$eventBus.$emit('loadingStatus', false)
          console.log(res)
        })
    }
  }
}
</script>

<style>

</style>
