<template>
	<view class="">
		<load-more
			ref="scroll"
			@onPullDown="onPullDown"
			@onScroll="onScroll"
			@onLoadMore="onLoadMore"
			:styleObj="{ height: systemInfo.screenHeight - 80 + 'px' }"
			:loadStatus="loadStatus"
		>
			<view class="m-list" v-for="(item, index) in dataArr" :key="index">
				<view class="avatar">{{ item.teachername.substr(0, 1) }}</view>
				<view class="name">{{ item.teachername }}</view>
				<view class="position">
					<text v-for="(tag, i) in item.tags" :key="i">{{ tag }}</text>
				</view>
			</view>
		</load-more>
	</view>
</template>

<script>
import loadMore from '@/components/loadMore/you-scroll.vue';
export default {
	components: { loadMore },
	data() {
		return {
			loadStatus: 'noMore',
			systemInfo: uni.getSystemInfoSync(),
			page: {
				pageIndex: 1,
				pageSize: 10,
				sid: ''
			},
			dataArr: []
		};
	},
	onLoad(params) {
		this.page.sid = params.sid || '3633000526';
		this.getData();
	},
	methods: {
		onPullDown(done) {
			this.getData().then(() => {
				done();
			});
		},
		onLoadMore() {
			this.loadStatus = 'loading';
			this.getData();
		},
		getData() {
			return new Promise((resolve, reject) => {
				this.$HTTP({
					url: '/zjq/College/GetLeaderInfo',
					method: 'POST',
					data: {
						sid: this.page.sid,
						token: 'd05902562e544db29bbe777954d43bb0',
						pageIndex: this.page.pageIndex,
						pageSize: this.page.pageSize
					},
					header:'form',
				})
					.then((data) => {
						if (data.code == 0) {
							let arr = data.data.list.map(item => {
								return {
									...item,
									tags: item.positon.split('、')
								};
							});
							this.dataArr = arr;
							// 是否为最后一页
							if (data.data.lastPage) {
								this.loadStatus = 'noMore';
							} else {
								this.page.pageIndex++;
								this.loadStatus = 'more';
							}
						} else {
							this.loadStatus = 'noMore';
							uni.showModal({
								content: data.message,
								icon: 'none'
							});
						}
						resolve()
					})
					.catch(err => {
						reject()
					});
			});
		}
	}
};
</script>

<style scoped lang="scss">
.m-list {
	padding: 10upx 30upx;
	display: flex;
	align-items: center;
	background: #ffffff;
	border-bottom: solid 1upx $main-dividing-line1;
	font-size: $uni-font-size-lg;
	&:first-child {
		border-top: solid 1upx $main-dividing-line1;
	}
	.avatar {
		box-sizing: border-box;
		display: inline-flex;
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		background: #ffffff;
		border: solid 1px #68bcf5;
		vertical-align: middle;
		align-items: center;
		justify-content: center;
		font-size: 45upx;
		color: #fff;
		background-color: #68bcf5;
	}
	.name {
		margin-left: 20upx;
		font-size: $uni-font-size-lg;
		color: $main-text-color;
	}
	.position {
		text {
			margin-left: 20upx;
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: 2upx 11upx;
			border-radius: 5upx;
			background: #6451fc;
			color: #ffffff;
			// border: solid 1upx $main-base-color;
			font-size: $uni-font-size-base;
		}
	}
}
</style>
