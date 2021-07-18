<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="items" v-model="selectFrom" item-text="name" label="from" return-object></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select :items="items" v-model="selectTo" item-text="name" label="to" return-object></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="from" label="from"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="convert" label="to"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    from: 0,
    to: 0,
    selectFrom: {
        id: 1,
        exRate: 1
    },
    selectTo: {
        id: 1,
        exRate: 1
    },
    items: [
        {
            id: 1,
            name: 'USA',
            exRate: 1
        },
        {
            id: 2,
            name: 'VN',
            exRate: 22000
        },
        {
            id: 3,
            name: 'EUR',
            exRate: 0.78
        }
    ]
  }),
  computed: {
      convert () {
          return this.from / this.selectFrom.exRate * this.selectTo.exRate
      }
  }
}
</script>

<style>
</style>
