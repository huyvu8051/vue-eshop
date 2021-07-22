import Api from '@/services/Api'
export default {
    findAll () {
        return Api().get('user/order')
    },
    createOrder (credentials) {
        return Api().post('user/order', credentials)
    }
}
