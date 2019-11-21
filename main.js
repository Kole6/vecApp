import Vue from 'vue'
import App from './App'
import store from './store'
import http from './common/http.js'

Vue.prototype.$HTTP = http
Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
