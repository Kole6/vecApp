<template>
	<view>
		<!-- 专业对比 -->
		<!-- <view class=""><message-info :message="searchResultMessage" :isShow.sync="isShowMessage" @close="handleMessageClose"></message-info></view> -->
		<!-- <load-more ref="scroll" @onPullDown="onPullDown" @onLoadMore="onLoadMore" :styleObj="{ height: '400px' }" :loadStatus="loadStatus"> -->
			<view class="wrapper" :style="{ 'max-height': '400px',overflow:'auto' }">
				<view class="list-item" v-for="(item, index) in dataArr" :key="index">
					<view class="flag" @click="handleListTaped(item)">
						<block v-if="item.hasSelected"><image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx"></image></block>
						<block v-else><view class="selecting"></view></block>
					</view>
					<school-list-item :item="item" :showType="4" :is-special="true" :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
				</view>
			</view>
		<!-- </load-more> -->
		<view class="line"></view>
		<view class="m-tips" @tap="toAdd">
			<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
			<text>继续添加对比专业,最多添加四个</text>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left" @tap="handleQuit">退出</view>
			<view class="right" @tap="handleRouter">开始对比</view>
		</view>
	</view>
</template>

<script>
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
import { professionData } from '../mockData.js';
import loadMore from '@/components/loadMore/you-scroll.vue';
export default {
	components: {
		uniSwipeAction,
		schoolListItem,
		messageInfo,
		loadMore
	},
	data() {
		return {
			page: {
				pageIndex: 1,
				pageSize: 10
			},
			loadStatus: 'more',
			searchResultMessage: '已添加3个专业到对比库',
			isShowMessage: true,
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			dataArr: []
		};
	},
	mounted() {
		this.onPullDown();
	},
	methods: {
		addProfession(string) {
			this.$HTTP({
				url: '/zjq/User/MyComparison',
				header: 'form',
				data: {
					token: uni.getStorageSync('token'),
					type: '2',
					optype: 'A',
					majorCode: string
				}
			}).then(res => {
			});
		},
		handleQuit() {
			uni.navigateBack();
		},
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
					url: '/zjq/User/GetComparison',
					header: 'form',
					data: {
						token: uni.getStorageSync('token'),
						pageIndex: this.page.pageIndex,
						pageSize: this.page.pageSize,
						type: '2'
					}
				}).then(res => {
					if (res.code == 0) {
						let data = res.data.map(item => {
							return {
								...item,
								hasSelected:false,
								title: item.majorname,
								cards: [
									{
										name: '学历层次',
										value: item.area || ''
									},
									{
										name: '专业年限',
										value: item.level
									}
								],
								tags: [
									{
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
		toAdd() {
			uni.redirectTo({
				url: './ProfessionPKAdd'
			});
		},
		handleListTaped(item) {
			item.hasSelected = !item.hasSelected;
		},
		handleMessageClose() {
			this.isShowMessage = false;
		},
		handleRouter() {
			uni.navigateTo({
				url: './ProfessionPKDetail'
			});
		}
	}
};
</script>

<style scoped lang="scss">
// @import  './profession.scss';

.list-item {
	background: #ffffff;
	position: relative;
	&:first-child {
		border-top: solid 1upx $main-dividing-line1;
	}
	.flag {
		position: absolute;
		z-index: 2;
		top: 26upx;
		right: 29upx;
		width: 36upx;
		height: 36upx;
		.selecting {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: solid 1upx $main-dividing-line1;
			background: #ffffff;
		}
	}
}
.m-bottom {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	font-size: $uni-font-size-lg + 5;
	display: flex;
	justify-content: center;
	align-items: center;
	// padding: 20upx 0;
	// background: $main-base-color;
	// color: #ffffff;
	width: 100%;
	z-index: 10;
	border-top: solid 1upx $main-dividing-line1;
	.left {
		width: 324upx;
		text-align: center;
		padding: 25upx 0;
		color: #666666;
		background: #ffffff;
	}
	.right {
		width: 426upx;
		text-align: center;
		background: $main-base-color;
		padding: 25upx 0;
		color: #ffffff;
	}
}
.line {
	height: 20upx;
}
.m-tips {
	display: flex;
	align-items: center;
	padding: 70upx 30upx;
	background: #ffffff;
	color: #999999;
	font-size: $uni-font-size-lg;
	text {
		padding-left: 20upx;
	}
}
</style>
