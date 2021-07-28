<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:[`item.img`]="{ item }">
      <v-img
        max-height="100"
        width="200"
        :src="$baseurl + 'uploads/' + item.img"
        class="ma-3"
      ></v-img>
    </template>
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
                <!-- form start -->
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Name"
                      :counter="255"
                      :error-messages="nameErrors"
                      required
                      @input="$v.editedItem.name.$touch()"
                      @blur="$v.editedItem.name.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      type="number"
                      step="1"
                      v-model="editedItem.price"
                      label="Price"
                      :error-messages="priceErrors"
                      required
                      min="0"
                      @input="$v.editedItem.price.$touch()"
                      @blur="$v.editedItem.price.$touch()"
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
                      :error-messages="categoryErrors"
                      @input="$v.editedItem.Category.$touch()"
                      @blur="$v.editedItem.Category.$touch()"
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
                      min="0"
                      label="Quantity"></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-switch
                      v-model="editedItem.available"
                      label="Available"
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-file-input
                      accept="image/*"
                      @change="previewFiles"
                      :placeholder="editedItem.img"
                    ></v-file-input>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <ckeditor v-model="editedItem.detail"></ckeditor>
                  </v-col>
                </v-row>
              </v-container>
              <!-- form end -->
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
                :disabled="$v.$anyError"
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
  import ProductService from '@/services/admin/ProductService'
  import CategoryService from '@/services/admin/CategoryService'
  import UploadService from '@/services/UploadService'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],

    validations: {
      editedItem: {
        name: { required, maxLength: maxLength(225) },
        price: { required },
        Category: { required },
        quantity: { required }
      }
    },
    data: () => ({
      selectedFile: null,
      categories: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Category', value: 'Category.name' },
        { text: 'Price(đ)', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'available', sortable: false, value: 'available' },
        { text: 'Img', sortable: false, value: 'img' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: 'Test',
        price: 2000000,
        Category: null,
        quantity: 69,
        available: false,
        img: '',
        detail: 'details'
      },
      defaultItem: {
        name: 'Default',
        price: 0,
        Category: null,
        quantity: 0,
        available: false,
        img: '',
        detail: 'default'
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      nameErrors () {
        const errors = []
        if (!this.$v.editedItem.name.$dirty) return errors
        !this.$v.editedItem.name.maxLength && errors.push('Name must be at most 255 characters long')
        !this.$v.editedItem.name.required && errors.push('Name is required.')
        return errors
      },
      priceErrors () {
        const errors = []
        if (!this.$v.editedItem.price.$dirty) return errors
        !this.$v.editedItem.price.required && errors.push('Price is required.')
        return errors
      },
      categoryErrors () {
        const errors = []
        if (!this.$v.editedItem.Category.$dirty) return errors
        !this.$v.editedItem.Category.required && errors.push('Category is required.')
        return errors
      },
      quantityErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Quantity is required.')
        return errors
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
      async previewFiles (event) {
        let formData = new FormData()
        formData.append('file', event)
        try {
          const response = await UploadService.upload(formData)
          console.log('res', response.data.filename)
          this.editedItem.img = response.data.filename
          this.selectedFile = null
        } catch (error) {
          console.log(error)
        }
      },
      async initialize () {
        const respone = await ProductService.findAll()
        this.desserts = respone.data
      },
      async initializeCategories () {
        const respone = await CategoryService.findAll()
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
        console.log(id)
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
        this.$v.$touch()
        console.log(this.editedItem)
        if (!this.$v.$anyError) {
          this.editedItem.CategoryId = this.editedItem.Category.id
          const respone = await ProductService.save(this.editedItem)
          console.log(respone)
          respone.data.Category = this.categories.find(category => category.id === respone.data.CategoryId)
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.unshift(this.editedItem)
          }
          this.close()
        }
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      }
    }
  }
</script>
