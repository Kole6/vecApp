<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search">
			<uni-search-bar radius="100" clearButton="auto" @confirm="search" />
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
					},{
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
		}
	}
</script>

<style scoped lang="scss">
.search{
	padding: 10upx 20upx;
}
</style>
