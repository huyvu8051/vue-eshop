// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
import store from '@/store/store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import CKEditor from 'ckeditor4-vue'

Vue.config.productionTip = false

Vue.use(CKEditor)

Vue.use(Vuelidate)
Vue.config.productionTip = false

var eventBus = new Vue()
Vue.prototype.$eventBus = eventBus
Vue.prototype.$axios = axios

const ipRegex = require('ip-regex')
var ipAddress = window.location.host
var match = ipAddress.match(ipRegex())

var baseUrl = window.location.protocol + '//' + match[0] + ':8081/'

Vue.prototype.$baseurl = baseUrl

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    'App': App
  },
  vuetify,
  template: '<App/>'
})
