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
				<view class="nav-item nav-item-2"><text>高职高专院校</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/majorDatabase/ZDZYSchool">
				<view class="nav-item nav-item-3"><text>中等职业学校</text></view>
			</navigator>
		</view>
		<view class="list-title">
			<view class="hot">热门专业</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit"></image>
		</view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
		<view class="school-list" >
			<school-list :showType="4" 
						:is-special="true" 
						:listArr="dataArr" 
						:handleTaped="false" 
						@taped="handleListTaped" />
		</view>
		</load-more>

	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from '../schoolDatabase/SchoolList.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import {professionData} from '../mockData.js'
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: { uniSearchBar, schoolList, uniNavBar,loadMore },
	data() {
		return {
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
			loadStatus:'more',
			dataArr: professionData
		};
	},
	onNavigationBarSearchInputClicked() {
		console.log(arguments, 'arg');
	},
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
	},
	methods: {
		onPullDown(done){
			setTimeout(()=>{
				this.dataArr = professionData
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
				this.dataArr=[...this.dataArr,...professionData]
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
						console.log(data,'res')
					},
					complete() {
						resolve();
					}
				})
			})
		},
		handleListTaped({item,index}){
		},
		search({ value }) {
			console.log(value, 'value');
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
.search {
	padding: 10upx 50upx;
}
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
