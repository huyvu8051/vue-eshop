<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Sản phẩm</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.price"
                      label="Price"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.Category"
                      :items="categories"
                      label="Category"
                      item-text="name"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.quantity"
                      type="number"
                      label="Number"></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.avalable"
                      label="Avalable (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.img"
                      label="PICTURE (url)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                   <v-textarea
                    v-model="editedItem.detail"
                    name="input-7-1"
                    label="Details"
                    value="This is details"
                    hint="Text something!"
                  ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  import ProductService from '@/services/ProductService'
  import CategoryService from '@/services/CategoryService'
  export default {
    data: () => ({
      categories: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id', value: 'id'
        },
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Category', value: 'Category.name' },
        { text: 'Price(đ)', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Avalable', sortable: false, value: 'avalable' },
        { text: 'Img', sortable: false, value: 'img' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: 'Test',
        price: 2000000,
        categoryId: 0,
        Category: {
          id: 0,
          name: ''
        },
        quantity: 69,
        avalable: false,
        img: '1.img',
        detail: 'details'
      },
      defaultItem: {
        name: 'defaultItem',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      this.initializeCategories()
    },

    methods: {
      async initialize () {
        const respone = await ProductService.findAll()
        console.log(respone.data)
        this.desserts = respone.data
      },
      async initializeCategories () {
        const respone = await CategoryService.findAll()
        console.log('Init Categories: ', respone.data)
        this.categories = respone.data
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        const id = this.desserts[this.editedIndex].id
        ProductService.delete({data: {id: id}})
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
      },

      async save () {
        if (this.editedIndex > -1) {
          // update
          this.editedItem.CategoryId = this.editedItem.Category.id
          const respone = await ProductService.update(this.editedItem)
          respone.data.Category = this.categories.find(category => category.id === respone.data.CategoryId)
           Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          // create
          this.editedItem.CategoryId = this.editedItem.Category.id
          console.log('save', this.editedItem)
          const respone = await ProductService.save(this.editedItem)
          respone.data.Category = this.categories.find(category => category.id === respone.data.CategoryId)
          this.desserts.push(respone.data)
        }
        this.close()
      }
    }
  }
</script>
