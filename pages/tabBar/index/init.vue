<template>
	<view></view>
</template>

<script>
	export default {
		onLoad() {
			// 引导页，从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
			if (uni.getStorageSync('launchFlag')) {
				uni.switchTab({
					url: './index'
				});
			} else {
				uni.redirectTo({
					url: './guide'
				});
			}
		}
	}
</script>

<style>

</style>
