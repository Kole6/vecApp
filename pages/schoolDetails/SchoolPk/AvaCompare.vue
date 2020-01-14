<template>
	<view class="m-w">
		<image src="/static/no-ava.png" mode="aspectFill" />
		<view class="tip">
			<text>暂时无法提供预览，请下载后查看~</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.m-w{
		image{
			padding: 150upx 184upx 50upx 184upx;
			width: 382upx;
			height: 318upx;
		}
	}
	.tip{
		color: #999999;
		text-align: center;
		font-size: $uni-font-size-base;
	}
</style>
