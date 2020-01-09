<template>
	<view>
		<!-- 专业对比 -->
		<message-info :message="searchResultMessage" :isShow.sync="isShowMessage" @close="handleMessageClose" />
		<view class="wrapper">
			<view class="list-item" v-for="(item,index) in listArr" :key="index">
				<view class="flag" @click="handleListTaped(item)">
					<block v-if="item.hasSelected">
						<view class="selecting"></view>
					</block>
					<block v-else>
						<image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx"></image>
					</block>
				</view>
				<school-list-item :item="item" :showType="4" :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
			</view>
		</view>
		<!-- </load-more> -->
		<view class="line"></view>
		<view class="m-tips" @tap="toAdd">
			<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
			<text>继续添加对比学校,最多添加四个</text>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left" @tap="handleBack">退出</view>
			<view class="right" @tap="handleRouter">开始对比</view>
		</view>
	</view>
</template>

<script>
	import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
	import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
	import {
		schoolData
	} from '@/pages/indexIcon/mockData.js'
	import loadMore from '@/components/loadMore/you-scroll.vue'
	export default {
		components: {
			uniSwipeAction,
			schoolListItem,
			messageInfo,
			loadMore
		},
		data() {
			return {
				loadStatus: 'more',
				searchResultMessage: '已添加3个学校到对比库',
				isShowMessage: true,
				wrapperHeight: 'auto',
				systemInfo: uni.getSystemInfoSync(),
				listArr: schoolData.map(item => {
					return {
						...item,
						hasSelected: true
					}
				})
			};
		},
		mounted() {

		},
		methods: {
			onPullDown(done) {
				setTimeout(() => {
					this.dataArr = schoolData
					done();
				}, 2000)
			},
			onScroll() {},
			onLoadMore() {
				this.loadStatus = 'loading'
				// this.getData().then(()=>{
				// })
				setTimeout(() => {
					this.loadStatus = 'more'
				}, 1000);
			},
			getData() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: 'http://47.103.69.156:18089/zjq/College/GetSchoolMajorHighLightSearchList',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							token: uni.getStorageSync('token'),
							pageIndex: '1',
							pageSize: '10',
							key: '浙江'
						},
						method: 'POST',
						success: ({
							data
						}) => {
							if (data.code == 0) {

							}
							console.log(data, 'res')
						},
						complete() {
							resolve();
						}
					})
				})
			},
			toAdd() {
				uni.navigateTo({
					url: './SchoolPkAdd',
				})
			},
			handleListTaped(item) {
				item.hasSelected = !item.hasSelected
			},
			handleMessageClose() {
				this.isShowMessage = false;
			},
			checkboxChange() {
				console.log(arguments, 'arg');
			},
			handleSwipeChange() {},
			handleChecked(item, index) {
				this.$set(item, 'checked', !item.checked);
			},
			handleRouter() {
				uni.navigateTo({
					url: './SchoolPkDetail'
				})
			},
			handleBack(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	@import  './pk.scss';
</style>
