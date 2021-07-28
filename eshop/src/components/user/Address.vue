<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="nextStep"
  >
    <v-text-field
      v-model="address"
      :counter="255"
      :rules="nameRules"
      label="Shipping Address"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="nextStep"
    >
      Next Step
    </v-btn>
    <v-btn
      color="warning"
      class="mr-4"
      @click="previous"
    >
      Previous
    </v-btn>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      address: '',
      nameRules: [
        v => !!v || 'Address is required',
        v => (v && v.length <= 255) || 'Address must be less than 255 characters'
      ]
    }),

    methods: {
      async nextStep () {
        await this.$refs.form.validate()
        if (this.valid) {
          this.$eventBus.$emit('saveAddressInfo', {
            address: this.address
          })
          this.$eventBus.$emit('nextStep')
        }
      },
      previous () {
        this.$eventBus.$emit('previous')
      }
    }
  }
</script>
