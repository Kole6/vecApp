<!--国际交流合作-->
<template>
	<view>
		<view style="height: 20upx;"></view>
		<view class="nav">
			<navigator url="./USASchool">
				<view class="nav-item nav-item-1"><text>中美合作学校</text></view>
			</navigator>
			<navigator url="./PlusSchool">
				<view class="nav-item nav-item-2"><text>中加合作学校</text></view>
			</navigator>
		</view>
		<view class="list-title">
			<view class="hot">热门学校</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit" />
		</view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onLoadMore="onLoadMore" :styleObj="{ height:wrapperHeight}"
		 :loadStatus="loadStatus">
			<view class="school-list">
				<school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
			</view>
		</load-more>

	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import schoolList from '@/components/vec-school-list/vec-school-list.vue';
	import loadMore from '@/components/loadMore/you-scroll.vue'
	export default {
		components: {
			uniSearchBar,
			schoolList,
			loadMore
		},
		data() {
			return {
				page: {
					pageIndex: 1,
					pageSize: 10,
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
			this.onPullDown();
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
					this.$http({
						url: '/zjq/College/GetSchoolSearchList',
						header: 'form',
						data: {
							token: uni.getStorageSync('token'),
							pageIndex: this.page.pageIndex,
							pageSize: this.page.pageSize,
							sfhzbx: '1'
						}
					}).then(res => {
						if (res.code == 0) {
							let data = this.$tool.toolSchoolList(res.data.list)
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
		font-size:42upx;
		font-weight:600;
	}

	@for $i from 1 through 2 {
		.nav-item-#{$i} {
			background: url('../../../static/indexIcon/hzbx-bg'+$i+'.png') no-repeat;
			background-size: 100% 100%;
		}
	}

	.list-title {
		padding: 20upx 10upx;
		margin-top: 20upx;
		border-bottom: solid 1upx $main-dividing-line1;
		background: #eaeaea;
		background: #ffffff;
		font-size: $uni-font-size-lg;

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
			line-height: 1.2;
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
		overflow: auto;
		background: #FFFFFF;
	}
</style>
