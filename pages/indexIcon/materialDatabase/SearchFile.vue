<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" placeholder="资料名称" /></view>
		<view class=""><message-info :message="searchResultMessage" :isShow.sync="isShow" @close="handleClose"></message-info></view>
		<!-- 文件列表区 -->
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
		<view class="school-list" ><file-list :listArr="fileListArr"></file-list></view>
		</load-more>

	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import fileList from './FileList.vue';
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: { uniSearchBar, fileList, messageInfo,loadMore },
	data() {
		return {
			loadStatus:'more',
			searchResultMessage: '一共5条搜索数据',
			isShow: true,
			firstHeight:'0',
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
			fileListArr: [
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				},
				{
					name: '2018-2019中国大学排名800强完整榜单(校友会最新版)',
					hasDownloaded: '263',
					fileSize: '582.5KB',
					other: '-50',
					src: '/static/indexIcon/p1.png'
				}
			]
		};
	},
	mounted() {
		this.calcScrollHeight(true);
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
		handleClose(){
			this.isShow = false;
			this.calcScrollHeight();
		},
		search() {
			this.isShow = !this.isShow;
			this.calcScrollHeight();
		},
		calcScrollHeight(isFirst = false) {
			setTimeout(() => {
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this);
				query
					.select('.school-list')
					.boundingClientRect(data => {
						let  height = ''
						// #ifdef APP-PLUS
						height = this.systemInfo.screenHeight - data.top - 94 ;
						// #endif
						// #ifdef H5
						height = this.systemInfo.screenHeight - data.top - 50 ;
						// #endif
						if(height && isFirst){
							this.firstHeight = height
							this.wrapperHeight = height + 'px'
						}else{
							if(this.isShow){
								this.wrapperHeight = this.firstHeight + 'px'
							}else{
								this.wrapperHeight = this.firstHeight + 40 + 'px'
							}
						}
					})
					.exec();
			}, 300);
		}
	}
};
</script>

<style scoped lang="scss">
.search {
	padding: 10upx 20upx;
}
</style>
