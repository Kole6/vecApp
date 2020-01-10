import Vue from 'vue'
import App from './App'
import store from './store'
import http from './common/http.js'
import api from './common/api.js'
import tool from './common/tool.js'

Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$tool = tool
Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
