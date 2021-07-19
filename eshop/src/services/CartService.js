import VueCookies from 'vue-cookies'
import Api from '@/services/Api'
VueCookies.config(60 * 60)

var cartCookies = VueCookies.get('cartCookies')
if (!cartCookies) {
  cartCookies = {
    productList: []
  }
  VueCookies.set('cartCookies', cartCookies)
}

export default {
  getCart () {
    return VueCookies.get('cartCookies')
  },
  addProduct (credentials) {
    // get cookies
    cartCookies = VueCookies.get('cartCookies')
    var product = cartCookies.productList.find(item => item.id === credentials)
    if (!product) {
      product = {
        id: credentials,
        quantity: 1
      }
      cartCookies.productList.push(product)
    } else {
      product.quantity++
    }
    VueCookies.set('cartCookies', cartCookies)
    console.log('cartService get cart: ', cartCookies)
  },
  deleteProduct (credentials) {
    cartCookies.productList = cartCookies.productList.filter(item => item.id !== credentials)
    VueCookies.set('cartCookies', cartCookies)
  },
  changeProductQuantity (credentials) {
    let productList = []
    credentials.productList.forEach(element => {
      productList.push({
        id: element.id,
        quantity: element.quantity
      })
    })
    console.log('cartService get cart: ', productList)
    VueCookies.set('cartCookies', JSON.stringify({
      productList: productList
    }))
  },
  findAllByArrayId (credentials) {
    return Api().post('cart', credentials)
  }
}
