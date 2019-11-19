<!-- 资料库 -->
<template>
	<view>
		<!-- 搜索栏 -->
		<!-- <view class="search">
			<uni-search-bar radius="100" clearButton="auto" @confirm="search" />
		</view> -->
		<!-- 分类栏 -->
		<view class="" style="height:20upx"></view>
		<view class="m-category">
			<view class="item" v-for="(item,index) in categoryList" :key="index" @tap="handleRoute(item,false)">
			<view class="title">{{item.name}}</view>
			<view class="desc">{{item.desc}}</view>
			</view>
		</view>
		<view class="" style="height:20upx"></view>
		<!-- 文件列表区 -->
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
		<view class="school-list" >
			<file-list :listArr="fileListArr"></file-list>
		</view>
		</load-more>

		
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import fileList from './FileList.vue'
	import loadMore from '@/components/loadMore/you-scroll.vue'
	export default {
		components:{uniSearchBar,fileList,loadMore},
		data() {
			return {
				loadStatus:'more',
				systemInfo:uni.getSystemInfoSync(),
				wrapperHeight:'auto',
				categoryList:[
					{
						name:'职教文件',
						url:'./ZJFile',
						desc:'Vocational education documents'
					},{
						name:'教学标准',
						url:'./JXBZFile',
						desc:'Teaching standard'
					},{
						name:'质量年报',
						url:'./ZLFile',
						desc:'Quality Annual Report'
					},{
						name:'教学大纲',
						url:'./JXDGFile',
						desc:'Basics Course syllabus'
					},
				],
				fileListArr:[
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					},{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					},
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					},
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					},
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					},
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					},
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50',
						src:'/static/indexIcon/p1.png'
					}
				]
			}
		},
		mounted(){
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this)
				query.select('.school-list').boundingClientRect(data=>{
				this.wrapperHeight = this.systemInfo.screenHeight - data.top - 85 + 'px'
				// #ifdef H5
				this.wrapperHeight = this.systemInfo.screenHeight - data.top - 45 + 'px'
				// #endif
			}).exec()
		},
		onNavigationBarButtonTap(option) {
			uni.navigateTo({
				url:"./SearchFile"
			})
		},
		methods: {
			onPullDown(done){
				setTimeout(()=>{
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
			search(){
				
			},
			handleRoute(item,isDetail=true){
				if(isDetail){
					
				}else{
					uni.navigateTo({
						url:item.url
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
.search{
	padding: 10upx 20upx;
}
.m-category{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	padding: 20upx;
	background: #FFFFFF;
	.item{
		width: 328upx;
		height: 180upx;
		background: #eee;
		margin-top: 20upx;
		box-sizing: border-box;
		padding-top: 35upx;
		padding-left: 15upx;
		.title{
			color: $main-text-color;
			font-size: $uni-font-size-lg;
		}
		.desc{
			margin-top: 10upx;
			color: #999999;
			font-size: $uni-font-size-sm;
			width: 60%;
		}
		
	}
	@for $i from 1 through 4 {
		.item:nth-of-type(#{$i} ){
			background: url('../../../static/indexIcon/p'+$i+'.png');
			background-size: 100% 100%;
		}
	}
}
</style>
