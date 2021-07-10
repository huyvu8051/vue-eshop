import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('product')
  },
  save (credentials) {
    if (credentials.id == null) {
      return Api().post('product', credentials)
    }
    return Api().put('product', credentials)
  },
  delete (credentials) {
    return Api().delete('product', credentials)
  }
}
