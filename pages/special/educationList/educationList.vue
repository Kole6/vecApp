<!--国际交流合作-->
<template>
	<view>
		<!-- <view class="m-search"><uni-search-bar :radius="100" @confirm="search" /></view> -->
		<view class="" style="height: 20upx;"></view>
		<view class="nav">
			<navigator url="./AList">
				<view class="nav-item nav-item-1"><text>A榜单</text></view>
			</navigator>
			<navigator url="./LikeList">
				<view class="nav-item nav-item-2"><text>人气榜</text></view>
			</navigator>
		</view>
		<!-- <view class="list-title">
			<view class="hot">热门专业</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit"></image>
		</view> -->
		<load-more ref="scroll" @onPullDown="onPullDown" @onLoadMore="onLoadMore" :styleObj="{ height:wrapperHeight}"
		 :loadStatus="loadStatus">
			<view class="school-list">
				<view class="list-item" v-for="(item, index) in dataArr" :key="index">
					<view :class="['rank', 'rank' + (index + 1)]">{{ index + 1 }}</view>
					<school-list-item :showBorder="false" class="content" showType="4" :item="item" />
				</view>
			</view>
		</load-more>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
	import loadMore from '@/components/loadMore/you-scroll.vue'
	export default {
		components: {
			uniSearchBar,
			schoolListItem,
			loadMore
		},
		data() {
			return {
				page: {
					pageIndex: 1,
					pageSize: 10
				},
				loadStatus: 'more',
				systemInfo: uni.getSystemInfoSync(),
				wrapperHeight: 'auto',
				dataArr: []
			};
		},
		mounted() {
			// 限制列表高度
			let query = uni.createSelectorQuery().in(this);
			query
				.select('.school-list')
				.boundingClientRect(data => {
					let height = '';
					// #ifdef APP-PLUS
					height = this.systemInfo.screenHeight - data.top - 84 + 'px';
					// #endif
					// #ifdef H5
					height = this.systemInfo.screenHeight - data.top - 50 + 'px';
					// #endif
					if (height) {
						this.wrapperHeight = height;
					}
				})
				.exec();
			this.onPullDown()
		},
		methods: {
			onPullDown(done) {
				this.page.pageIndex = 1;
				this.getData(true)
					.then(isLastPage => {
						if (isLastPage) {
							this.loadStatus = 'noMore';
						} else {
							this.loadStatus = 'more';
						}
					})
					.finally(() => {
						done && done();
					});
			},
			onLoadMore() {
				this.loadStatus = 'loading';
				this.getData().then(isLastPage => {
					if (isLastPage) {
						this.loadStatus = 'noMore';
					} else {
						this.loadStatus = 'more';
					}
				});
			},
			getData(isRefresh) {
				return new Promise((resolve, reject) => {
					this.$HTTP({
						url: '/zjq/College/GetSchoolSearchList',
						header: 'form',
						data: {
							token: 'd05902562e544db29bbe777954d43bb0',
							pageIndex: this.page.pageIndex,
							pageSize: this.page.pageSize,
							zjbdpm: '1'
						}
					}).then(res => {
						console.log('result==', res);
						if (res.code == 0) {
							let data = res.data.list.map(item => {
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
										value: item.level
									}]
								};
							});
							if (isRefresh) {
								this.dataArr = data
								this.page.pageIndex = 1;
							} else {
								this.dataArr.push(...data)
								this.page.pageIndex++
							}
							resolve(res.data.lastPage);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
							reject();
						}
					});
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.m-search {
		padding: 0 40upx;
	}

	.nav {
		display: flex;
		justify-content: space-around;
		padding: 30upx 0;
		background-color: #fff;
	}

	.nav-item {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		box-sizing: border-box;
		color: #fff;
		border-radius: 20upx;
		font-size: $uni-font-size-lg;
		background: $main-base-color;
		box-shadow: 5upx 10upx 10upx rgba($color: #000000, $alpha: 0.1);
		width: 333upx;
		height: 180upx;
		font-size: 42upx;
		font-weight: 600;
	}

	@for $i from 1 through 2 {
		.nav-item-#{$i} {
			background: url('../../../static/indexIcon/bd-bg'+$i+'.png');
			background-size: 100% 100%;
		}
	}

	.list-title {
		padding: 10upx;
		margin-top: 20upx;
		background: #eaeaea;
		background: #ffffff;

		image {
			width: 60upx;
			height: 60upx;
			vertical-align: middle;
		}

		.hot {
			font-size: $uni-font-size-lg;
			display: inline-block;
			margin-left: 20upx;
			font-weight: bold;
			color: #333333;
		}

		.hot-img {
			width: 28upx;
			height: 28upx;
			vertical-align: middle;
			margin-left: 10upx;
		}
	}

	.school-list {
		box-sizing: border-box;
		background: #FFFFFF;
	}

	.list-item {
		display: flex;
		position: relative;
		align-items: center;
		padding: 0 30upx;
		border-bottom: solid 1px $main-dividing-line1;

		&:first-child {
			border-top: solid 1px $main-dividing-line1;
		}

		.rank {
			position: absolute;
			top: 45upx;
			left: 145upx;
			box-sizing: border-box;
			width: 36upx;
			height: 36upx;
			padding: 2upx;
			font-size: $uni-font-size-base;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			// border: solid 1upx $main-dividing-line1;
			// background: $main-base-color;
			background: url(../../../static/indexIcon/rank.png) no-repeat;
			background-size: 100% 100%;
			color: #ffffff;
		}

		.rank1 {
			// background: #ff0000;
		}

		.rank2 {
			// background: #ffff00;
		}

		.rank3 {
			// background: #0000ff;
		}

		.content {
			box-sizing: border-box;
			width: calc(100% - 100upx);
		}
	}
</style>
