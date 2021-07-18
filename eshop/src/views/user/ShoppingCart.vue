<template>
  <v-row>
    <v-col
      cols="12"
      sm="8"
    >
      <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      disable-pagination
      hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Shopping Cart</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-col>
    <v-col
      cols="12"
      sm="4"
    >
      <v-card
        class="mx-auto"
        tile
      >
        <v-subheader>REPORTS</v-subheader>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Total price</v-list-item-title>
            <v-list-item-subtitle>{{totalPrice}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4"></v-divider>
          <v-card-actions class="mx-4">
            <v-btn
              color="light-blue"
              dark
              rounded
              depressed
              :to="{name: 'user.order'}"
            >
              Order
              <v-icon right>
                add_shopping_cart
              </v-icon>
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import CartService from '@/services/CartService'
export default {
  data: () => ({
    e1: 1,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'product.name'
      },
      { text: 'Price(đ)', value: 'product.price' },
      { text: 'Quantity', value: 'quantity' },
      // { text: 'Img', sortable: false, value: 'product.img' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    desserts: []
  }),

  computed: {
    quantityErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Quantity is required.')
      return errors
    },
    totalPrice () {
      let total = 0
      this.desserts.forEach(item => {
        total += item.product.price * item.quantity
      })
      return total
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      let cart = CartService.getCart()
      let ids = []
      cart.productList.forEach((item) => {
        ids.push(item.id)
      })
      const respone = await CartService.findAllByArrayId({
        ids: ids
      })
      cart.productList.forEach((item) => {
        item.product = respone.data.find((e) => {
          return item.id === e.id
        })
      })
      console.log(cart)
      this.desserts = cart.productList
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      const id = this.desserts[this.editedIndex].id
      // product service delete
      // ProductService.delete({ data: { id: id } })
      CartService.deleteProduct(id)
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  }
}
</script>
