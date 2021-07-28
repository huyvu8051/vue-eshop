import Api from '@/services/Api'
const ipRegex = require('ip-regex')
var ipAddress = window.location.host
var match = ipAddress.match(ipRegex())

var baseUrl = window.location.protocol + '//' + match[0] + ':8081/'
export default {
  upload (credentials) {
    return Api().post('upload', credentials)
  },
  getImageUrl (credentials) {
    return baseUrl + 'uploads/' + credentials
  }
}
