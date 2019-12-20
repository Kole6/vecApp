<template>
	<view class="content">
		<view class="search">
			<uni-search-bar radius="100" clearButton="left" @confirm="search" />
		</view>
		<zi-xun :newList="newList" />
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
		data() {
			return {
				newList: []
			}
		},
		onShow() {
			this.apiGetNews('')
		},
		methods: {
			search(res) {
				this.apiGetNews(res.value);
			},
			apiGetNews(key) {
				if (key == '' && this.newList.length != 0) {
					return;
				}
				this.$HTTP({
					url: '/zjq/College/GetNews',
					header: 'form',
					data: {
						key,
					}
				}).then((data) => {
					this.newList = [...data.data.list]
				})
			}
		},
	}
</script>
<style scoped lang="scss">
	.search {
		border-top: 1px solid rgb(238, 238, 238);
		padding: 0 32upx;
	}
</style>
