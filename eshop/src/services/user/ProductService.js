import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('user/product')
  },
  findById (credentials) {
    return Api().post('user/product', credentials)
  }
}
