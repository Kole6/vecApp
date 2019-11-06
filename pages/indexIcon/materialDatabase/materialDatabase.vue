<!-- 资料库 -->
<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search">
			<uni-search-bar radius="100" clearButton="auto" @confirm="search" />
		</view>
		<!-- 分类栏 -->
		<view class="m-category">
			<view class="item" v-for="(item,index) in categoryList" :key="index" @tap="handleRoute(item,false)">{{item.name}}</view>
		</view>
		<!-- 文件列表区 -->
		<file-list :listArr="fileListArr"></file-list>
		
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import fileList from './FileList.vue'
	export default {
		components:{uniSearchBar,fileList},
		data() {
			return {
				categoryList:[
					{
						name:'职教文件',
						url:'./ZJFile',
					},{
						name:'教学标准',
						url:'./JXBZFile',
					},{
						name:'质量年报',
						url:'./ZLFile',
					},{
						name:'教学大纲',
						url:'./JXDGFile',
					},
				],
				fileListArr:[
					{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50'
					},{
						name:'2018-2019中国大学排名800强完整榜单(校友会最新版)',
						hasDownloaded:'263',
						fileSize:'582.5KB',
						other:'-50'
					}
				]
			}
		},
		methods: {
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
	padding: 20upx 50upx;
	.item{
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(50% - 30upx);
		height: 160upx;
		background: #eee;
		margin-top: 20upx;
		
	}
}
</style>
