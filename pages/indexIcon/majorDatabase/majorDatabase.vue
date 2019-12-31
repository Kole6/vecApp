<!-- 院校库 -->
<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<view class="nav">
			<navigator url="/pages/indexIcon/majorDatabase/BKCCSchool">
				<view class="nav-item nav-item-1"><text>本科层次职业教育</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/majorDatabase/GZGZSchool">
				<view class="nav-item nav-item-2"><text>高职<br/>高专院校</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/majorDatabase/ZDZYSchool">
				<view class="nav-item nav-item-3"><text>中等<br/>职业学校</text></view>
			</navigator>
		</view>
		<view class="list-title">
			<view class="hot">热门专业</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit"></image>
		</view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight }"
		 :loadStatus="loadStatus">
			<view class="school-list">
				<school-list :showType="4" :is-special="true" :listArr="dataArr" :handleTaped="false" @taped="handleListTaped" />
			</view>
		</load-more>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import schoolList from '../schoolDatabase/SchoolList.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import {
		professionData
	} from '../mockData.js';
	import loadMore from '@/components/loadMore/you-scroll.vue';
	export default {
		components: {
			uniSearchBar,
			schoolList,
			uniNavBar,
			loadMore
		},
		data() {
			return {
				page: {
					pageIndex: 1,
					pageSize: 10
				},
				systemInfo: uni.getSystemInfoSync(),
				wrapperHeight: 'auto',
				loadStatus: 'more',
				dataArr: []
			};
		},
		onNavigationBarSearchInputClicked() {},
		mounted() {
			// 限制列表高度
			let query = uni.createSelectorQuery().in(this);
			query
				.select('.school-list')
				.boundingClientRect(data => {
					this.wrapperHeight = this.systemInfo.screenHeight - data.top - 74 + 'px';
					// #ifdef H5
					this.wrapperHeight = this.systemInfo.screenHeight - data.top - 44 + 'px';
					// #endif
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
					this.$HTTP({
						url: '/zjq/College/GetMajors',
						header: 'form',
						data: {
							token: uni.getStorageSync('token'),
							pageIndex: this.page.pageIndex,
							pageSize: this.page.pageSize
						}
					}).then(res => {
						if (res.code == 0) {
							let data = res.data.list.map(item => {
								return {
									...item,
									title: item.majorname,
									cards: [{
											name: '学历层次',
											value: item.xlcc || ''
										},
										{
											name: '专业年限',
											value: item.xynx || ''
										}
									],
									tags: [{
											name: '专业大类',
											value: item.zydl || ''
										},
										{
											name: '代码',
											value: item.majorcode
										}
									]
								};
							});
							if (isRefresh) {
								this.dataArr = data;
								this.page.pageIndex = 1;
							} else {
								this.dataArr.push(...data);
								this.page.pageIndex++;
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
			handleListTaped({
				item,
				index
			}) {
				uni.navigateTo({
					url: `./ProfessionDesc?id=${item.code}&name=${item.name}&type=${item.type}`
				})
			},
			handleBack() {
				uni.navigateBack();
			},
			handleSearchTap() {
				uni.navigateTo({
					url: './SearchResult'
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.nav {
		display: flex;
		justify-content: space-around;
		padding: 35upx 0;
		background: #ffffff;
	}

	.nav-item {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 220upx;
		text-align: center;
		box-sizing: border-box;
		padding: 20upx 40upx;
		color: #fff;
		border-radius: 20upx;
		font-size: $uni-font-size-lg;
		background: $main-base-color;
		height: 180upx;
		box-shadow: 5upx 10upx 10upx rgba($color: #000000, $alpha: 0.1);
	}

	@for $i from 1 through 3 {
		.nav-item-#{$i} {
			background: url('../../../static/indexIcon/bg'+$i+'.png');
			background-size: 100% 100%;
		}
	}

	.list-title {
		padding: 10upx;
		margin-top: 20upx;
		background: #ffffff;
		border-bottom: solid 1upx $main-dividing-line1;

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
		}
	}

	.school-list {
		background: #ffffff;
		overflow: auto;
	}
</style>
