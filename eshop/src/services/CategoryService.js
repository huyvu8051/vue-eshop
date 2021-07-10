import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('category')
  },
  save (credentials) {
    if (credentials.id == null) {
      return Api().post('category', credentials)
    }
    return Api().put('category', credentials)
  },
  delete (credentials) {
    return Api().delete('category', credentials)
  }
}
