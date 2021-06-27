import Api from '@/services/Api'

export default {
  findAll () {
    return Api().get('category')
  },
  save (credentials) {
    return Api().post('category', credentials)
  }
}
