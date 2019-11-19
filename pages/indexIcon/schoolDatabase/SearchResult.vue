<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false">
			<uni-search-bar ref="search" style="width: 100%;" radius="100" clearButton="auto" @confirm="search" />
		</uni-nav-bar>
		<view class=""><message-info :message="searchResultMessage" :isShow.sync="isShow" @close="handleClose"></message-info></view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height:wrapperHeight}" :loadStatus="loadStatus">
		<view class="list">
			<school-list showType="4" :listArr="dataArr" />
			</view>
		</load-more>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from './SchoolList.vue';
import {schoolData} from '../mockData.js'
import loadMore from '@/components/loadMore/you-scroll.vue'
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
export default {
	components: { uniNavBar, uniSearchBar ,schoolList,loadMore,messageInfo},
	data() {
		return {
			dataArr: schoolData,
			loadStatus:'more',
			systemInfo: uni.getSystemInfoSync(),
			searchResultMessage: '一共5条搜索数据',
			isShow: true,
			wrapperHeight: 'auto',
			firstHeight:'0',
		};
	},
	mounted() {
		this.$refs.search.searchClick();
		this.calcScrollHeight(true)
	},
	methods: {
		handleClose(){
			this.isShow = false;
			this.calcScrollHeight();
		},
		calcScrollHeight(isFirst = false){
			setTimeout(() => {
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this);
				query
					.select('.list')
					.boundingClientRect(data => {
						// TODO 待验证app中列表高度
						let  height = ''
						// #ifdef APP-PLUS
						// height = this.systemInfo.screenHeight - data.top - 94 + 'px';
						// #endif
						height = this.systemInfo.screenHeight - data.top - 10 ;
						// #ifdef H5
						// #endif
						if(height && isFirst){
							this.wrapperHeight = height + 'px'
							this.firstHeight = height
						}else if(!isFirst){
							// 有message
							if(this.isShow){
								this.wrapperHeight = this.firstHeight + 'px'
							}else{
								this.wrapperHeight = this.firstHeight + 40 +'px'
							}
						}
					})
					.exec();
			}, 300);
		},
		onPullDown(done){
			setTimeout(()=>{
				this.dataArr = schoolData
				done();
			},2000)
		},
		onScroll(){
		},
		onLoadMore(){
			this.loadStatus = 'loading'
			// this.getData().then(()=>{
			// })
			setTimeout(() =>{
				this.dataArr=[...this.dataArr,...schoolData]
					this.loadStatus = 'more'
			}, 1000);
		},
		getData(){
			return new Promise((resolve,reject)=>{
				uni.request({
					url:'http://47.103.69.156:18089/zjq/College/GetSchoolMajorHighLightSearchList',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						token:'d05902562e544db29bbe777954d43bb0',
						pageIndex:'1',
						pageSize:'10',
						key:'浙江'
					},
					method:'POST',
					success:({data}) => {
						if(data.code == 0){
							
						}
						console.log(data,'re')
					},
					complete() {
						resolve();
					}
				})
			})
		},
		handleBack() {
			// dev

			let data = getCurrentPages();
			if (data.length < 1) {
				uni.switchTab({
					url: '/pages/tabBar/index/index'
				});
			} else {
				// pro
				uni.navigateBack({});
			}
		},
		search({ value }) {}
	}
};
</script>

<style lang="scss" scoped>
	.list{
		background: #FFFFFF;
	}
</style>
