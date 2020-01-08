<template>
	<view class="wrapper">
		<school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
	</view>
</template>

<script>
	import loadMore from '@/components/loadMore/you-scroll.vue'
	import schoolList from '@/components/vec-school-list/vec-school-list.vue';
	export default {
		onLoad(e) {
			this.sid = e.sid;
			this.apiGetCooperation()
		},
		components: {
			schoolList,
			loadMore
		},
		data() {
			return {
				sid: '',
				dataArr: []
			};
		},
		methods: {
			apiGetCooperation() {
				this.$HTTP({
					url: '/zjq/College/GetFjxx',
					header: 'form',
					data: {
						sid: this.sid,
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					if (res.code == 0) {
						let va = res.data.map(item => {
							item.tags = item.tags + ''
							return {
								...item,
								title: item.schoolname,
								cards: item.tags.split(',').map(item => {
									return {
										name: item
									};
								}),
								tags: [{
									name: '地区',
									value: item.area
								}, {
									name: '层次',
									value: item.level == 1 ? '高职' : (item.level == 2 ? '中职' : item.level)
								}]
							};
						});
						this.dataArr = va
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style scoped>
	.wrapper {
		background: #FFFFFF;
	}
</style>
