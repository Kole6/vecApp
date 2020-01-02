<script>
	export default {
		onLaunch: function() {
			console.log('VEC App Launch')
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //控制竖屏
			// #endif
		},
		onShow: function() {
			console.log('VEC App Show')
		},
		onHide: function() {
			console.log('VEC App Hide')
		},
		//getApp().globalData.text 不能用于App
		globalData: {
			text: '',
		}
	}
</script>

<style>
	/* @import './common/vecfont.css'; */

	page {
		background-color: #F6F8FE;
		font-family: PingFangSC-Regular, PingFang SC;
	}

	.uni-searchbar__box {
		background-color: #fff !important;
	}

	.vec-btn {
		color: #fff;
		width: 600upx;
		height: 88upx;
		font-size: 34upx;
		background: linear-gradient(360deg, rgba(106, 67, 254, 1) 0%, rgba(71, 149, 249, 1) 100%);
		box-shadow: 0upx 10upx 20upx 0upx rgba(71, 149, 249, 0.3);
		border-radius: 44upx;
		font-weight: 600;
	}
	
	.table-null {
		text-align: center;
		margin: 20upx;
		color: #999;
		font-size: 30upx;
		padding-bottom:20upx ;
	}
</style>
