import Api from '@/services/Api'

export default {
  upload (credentials) {
    return Api().post('upload', credentials)
  }
}
