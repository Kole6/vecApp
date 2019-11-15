<template>
	<view class="content">
		<view class="search">
			<uni-search-bar radius="100" clearButton="left" @confirm="search" />
		</view>
		<zi-xun />
	</view>
</template>

<script>
	import ziXun from '@/components/ziXun/ziXunLeft.vue';
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	export default {
		components: {
			ziXun,
			uniSearchBar
		},
		methods: {
			search(res) {
				uni.showModal({
					content: '搜索：' + res.value,
					showCancel: false
				})
			},
		},
	}
</script>
<style scoped lang="scss">
	.search{
		border-top: 1px solid rgb(238,238,238);
		padding: 0 32upx;
	}
</style>
