import Api from '@/services/Api'

export default {
  addProduct (credentials) {
    return Api().post('productDetails', credentials)
  }
}
