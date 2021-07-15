import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('admin/product')
  },
  save (credentials) {
    if (credentials.id == null) {
      return Api().post('admin/product', credentials)
    }
    return Api().put('admin/product', credentials)
  },
  delete (credentials) {
    return Api().delete('admin/product', credentials)
  }
}
