import Api from '@/services/Api'
export default {
    findAll () {
        return Api().get('admin/order')
    },
    updateStatus (id, status) {
        let credentials = {
            id: id,
            status: status
        }
        return Api().put('admin/order', credentials)
    }
}
