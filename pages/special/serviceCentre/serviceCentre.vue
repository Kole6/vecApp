<!--服务中心-->
<template>
	<view class="content" :style={height}>
		<view class="kong1"></view>
		<image src="/static/indexIcon/fwzx.png" mode="widthFix" />
		<view class="kong2"></view>
	</view>
</template>

<script>
	export default {
		onShow() {
			let sys = uni.getSystemInfoSync();
			this.height = sys.windowHeight + 'px';
		},
		data() {
			return {
				height: '600px'
			}
		}
	}
</script>
<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		.kong1 {
			flex: 1;
			width: 750upx;
			background-color: #f7f6f6;
		}
		image {
			width: 750upx;
		}
		.kong2 {
			flex: 1;
			width: 750upx;
			background-color: #bbbcbb;
		}
	}
</style>
