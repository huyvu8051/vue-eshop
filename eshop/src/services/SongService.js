import Api from '@/services/Api'

export default {
  getAllSong () {
    return Api().get('song')
  },
  create (credentials) {
    return Api().post('song', credentials)
  }
}
