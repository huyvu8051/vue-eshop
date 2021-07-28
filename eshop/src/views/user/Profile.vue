<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Order</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        class="ma-2"
        color="orange"
        text-color="white"
        v-if="item.status === 'progress'"
      >
        Progress
        <v-icon right>
          done
        </v-icon>
      </v-chip>
      <v-chip
        class="ma-2"
        color="green"
        text-color="white"
        v-if="item.status === 'done'"
      >
        Done
        <v-icon right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-chip>
      <v-chip
        class="ma-2"
        color="red"
        text-color="white"
        v-if="item.status === 'reject'"
      >
        Rejected
        <v-icon right>
          unpublished
        </v-icon>
      </v-chip>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-data-table
          :headers="orderDetail_header"
          :items="item.OrderDetails"
          class="elevation-1 mt-4"
          disable-pagination
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Order Details</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.price`]="{ item }">
            {{formatPrice (item.price)}}
          </template>
          <template v-slot:[`item.img`]="{ item }">
            <v-img
              max-height="100"
              width="200"
              :src="$baseurl + 'uploads/' + item.Product.img"
              class="ma-3"
            ></v-img>
          </template>
          <template v-slot:[`item.total`]="{ item }">
            {{formatPrice (item.price * item.quantity)}}
          </template>
        </v-data-table>
        <div class="text-center pt-3">
          <v-row>
            <v-col>

            </v-col>
            <v-col class="mb-5">
              <h3>Total: {{formatPrice (total(item))}}</h3>
            </v-col>
          </v-row>
        </div>
      </td>
    </template>
  </v-data-table>
</template>
<script>
  import OrderService from '@/services/user/OrderService'
  export default {
    data () {
      return {
        expanded: [],
        singleExpand: true,
        dessertHeaders: [
          { text: 'Create At', sortable: false, value: 'createdAt' },
          { text: 'Shipping Address', sortable: false, value: 'shipping_address' },
          { text: 'Status', sortable: false, value: 'status' },
          { text: '', value: 'data-table-expand' }
        ],
        orderDetail_header: [
          { text: 'Product name', sortable: false, value: 'Product.name' },
          { text: 'price', sortable: false, value: 'price' },
          { text: 'quantity', sortable: false, value: 'quantity' },
          { text: 'Image', sortable: false, value: 'img' },
          { text: 'Subtotal', sortable: false, value: 'total' }
        ],
        desserts: []
      }
    },
    created () {
      setTimeout(() => {
      this.initialization()
      }, 300)
    },
    methods: {
      formatPrice (price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
      },
      async initialization () {
        let res = await OrderService.findAll()
        this.desserts = res.data
        console.log(this.desserts)
      },
      total (item) {
        let sum = 0
        item.OrderDetails.forEach(element => {
          sum += element.price * element.quantity
        })
        return sum
      }
    }
  }
</script>
