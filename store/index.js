import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		nickname: "未设置"
	},
	mutations: {
		change: function(state, nickname) {
			state.nickname = nickname;
		}
	}
});
export default store
// this.$store.state.count
// this.$store.commit('updateCount',80)