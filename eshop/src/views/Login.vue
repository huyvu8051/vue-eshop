<template>
  <v-container>
    <Panel title="Login">
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :counter="32"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn
          class="mr-4 cyan"
          :disabled="$v.$anyError"
          @click="submit"
        >
          <span id="submit">submit</span>
        </v-btn>
        <v-btn @click="clear"
          class="warning">
          <span>clear</span>
        </v-btn>
      </form>
    </Panel>
  </v-container>
</template>
<script>
  import AuthenticationService from '@/services/AuthenticationService'
  import Store from '@/store/store.js'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
  import Panel from '@/components/Panel.vue'

  export default {
    components: {
      Panel
    },
    mixins: [validationMixin],
    validations: {
      password: {
        required,
        maxLength: maxLength(32),
        minLength: minLength(8),
        containsULN: function (value) {
          const containsULN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/.test(value)
          return containsULN
        }
      },
      email: { required, email, maxLength: maxLength(40) }
    },

    data: () => ({
      password: '',
      email: ''
    }),

    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required.')
        !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
        !this.$v.password.maxLength && errors.push('Password must be at most 32 characters long')
        !this.$v.password.containsULN && errors.push('Password must be contains UPPERCASE, lowercase and numberrr.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required.')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (!this.$v.$anyError) {
          this.login()
        }
      },
      clear () {
        this.$v.$reset()
        this.password = ''
        this.email = ''
      },
      async login () {
        this.$eventBus.$emit('loadingStatus', true)
        try {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          console.log('response==========', response)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setEmail', response.data.email)
          this.$store.dispatch('setRoles', response.data.roles)
          this.$store.dispatch('setSignature', response.data.signature)
          console.log(Store.state)
          this.$router.push({
            name: 'admin.product'
          })
        } catch (error) {
          this.error = error
        }
        this.$eventBus.$emit('loadingStatus', false)
      }
    }
  }
</script>
