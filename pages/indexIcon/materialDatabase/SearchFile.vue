<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" placeholder="资料名称" /></view>
		<view class=""><message-info :message="searchResultMessage" :isShow.sync="isShow" @close="handleClose"></message-info></view>
		<!-- 文件列表区 -->
		<view class="school-list" :style="{ height: wrapperHeight, overflow: 'auto' }"><file-list :listArr="fileListArr"></file-list></view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import fileList from './FileList.vue';
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
export default {
	components: { uniSearchBar, fileList, messageInfo },
	data() {
		return {
			searchResultMessage: '一共5条搜索数据',
			isShow: true,
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
		this.calcScrollHeight();
	},
	methods: {
		handleClose(){
			this.isShow = false;
			this.calcScrollHeight();
		},
		search() {
			this.isShow = !this.isShow;
			this.calcScrollHeight();
		},
		calcScrollHeight() {
			setTimeout(() => {
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this);
				query
					.select('.school-list')
					.boundingClientRect(data => {
						let  height = ''
						// #ifdef APP-PLUS
						height = this.systemInfo.screenHeight - data.top - 94 + 'px';
						// #endif
						// #ifdef H5
						height = this.systemInfo.screenHeight - data.top - 50 + 'px';
						// #endif
						if(height){
							this.wrapperHeight = height
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
