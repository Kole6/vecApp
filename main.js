import Vue from 'vue'
import App from './App'
import store from './store'
import http from './common/http.js'
import api from './common/api.js'

Vue.prototype.$HTTP = http
Vue.prototype.$API = api
Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
