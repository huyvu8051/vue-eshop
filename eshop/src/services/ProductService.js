import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('product')
  },
  save (credentials) {
    return Api().post('product', credentials)
  },
  update (credentials) {
    return Api().put('product', credentials)
  },
  delete (credentials) {
    return Api().delete('product', credentials)
  }
}
