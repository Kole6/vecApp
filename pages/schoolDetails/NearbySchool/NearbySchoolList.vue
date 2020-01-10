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
				this.$http({
					url: '/zjq/College/GetFjxx',
					header: 'form',
					data: {
						sid: this.sid,
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					if (res.code == 0) {
						this.dataArr = this.$tool.toolSchoolList(res.data)
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
