<template>
  <v-container>
    <Dialog title="Register Successfull" message="Please click login button to route to the Login Page" route="login" v-if="registerSuccess"/>
    <Panel title="Register">
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          :counter="40"
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
        <!--  -->
        <v-text-field
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrors"
          :counter="32"
          label="Confirm Password"
          required
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
        ></v-text-field>
        <v-btn
          class="mr-4 cyan"
          :disabled="$v.$anyError"
          @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear"
          class="warning">
          clear
        </v-btn>
      </form>
    </Panel>
  </v-container>
</template>
<script>
  import AuthenticationService from '@/services/AuthenticationService'
  // import Store from '@/store/store.js'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
  import Panel from '@/components/Panel.vue'
  import Dialog from '@/components/Dialog.vue'

  export default {
    components: {
      Panel,
      Dialog
    },
    mixins: [validationMixin],
    validations: {
      password: { required, maxLength: maxLength(32), minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs('password') },
      email: { required, email, maxLength: maxLength(40) }
    },

    data: () => ({
      registerSuccess: false,
      password: '',
      confirmPassword: '',
      email: ''
    }),

    computed: {
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.maxLength && errors.push('Password must be at most 32 characters long')
        !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.sameAsPassword && errors.push('Confirm Password must be same as password')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.maxLength && errors.push('Email must be at most 40 characters long')
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (!this.$v.$anyError) {
          this.register()
        }
      },
      clear () {
        this.$v.$reset()
        this.password = ''
        this.email = ''
      },
      async register () {
        this.$eventBus.$emit('loadingStatus', true)
        try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response)
        console.log(this.$store)
        this.registerSuccess = true
        // this.$router.push({
        //     name: 'login'
        //   })
        } catch (error) {
          this.error = error.response.data.error
        }
        this.$eventBus.$emit('loadingStatus', false)
      }
    }
  }
</script>
