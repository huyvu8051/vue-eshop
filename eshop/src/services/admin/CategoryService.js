import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('admin/category')
  },
  save (credentials) {
    if (credentials.id == null) {
      return Api().post('admin/category', credentials)
    }
    return Api().put('admin/category', credentials)
  },
  delete (credentials) {
    return Api().delete('admin/category', credentials)
  }
}
