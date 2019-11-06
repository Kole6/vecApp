<script>
	export default {
		onLaunch: function() {
			console.log('VEC App Launch')
		},
		onShow: function() {
			console.log('VEC App Show')
		},
		onHide: function() {
			console.log('VEC App Hide')
		},
		globalData: {
			test: ''
		}
	}
</script>

<style>
	@import './common/vecfont.css';
	page {
		background-color: #F6F8FE;
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.uni-searchbar__box{
		background-color:#fff !important;
	}
</style>
