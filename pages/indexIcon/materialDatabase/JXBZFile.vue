<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" placeholder="资料名称" /></view>
		<!-- 文件列表区 -->
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight }" :loadStatus="loadStatus">
			<view class="school-list"><file-list :listArr="fileListArr"></file-list></view>
		</load-more>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import fileList from './FileList.vue';
import loadMore from '@/components/loadMore/you-scroll.vue';
export default {
	components: { uniSearchBar, fileList, loadMore },
	data() {
		return {
			page: {
				pageSize: 10,
				pageIndex: 1
			},
			loadStatus: 'more',
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
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.school-list')
			.boundingClientRect(data => {
				this.wrapperHeight = this.systemInfo.screenHeight - data.top - 85 + 'px';
				// #ifdef H5
				this.wrapperHeight = this.systemInfo.screenHeight - data.top - 45 + 'px';
				// #endif
				console.log(this.wrapperHeight);
			})
			.exec();
		this.onLoadMore();
	},
	methods: {
		onPullDown(done) {
			this.getData(true).finally(()=>{
				done()
			})
		},
		onScroll() {},
		onLoadMore() {
			this.loadStatus = 'loading';
			this.getData().then((isLastPage)=>{
				this.loadStatus = isLastPage?'noMore':'more'
			})
		},
		getData(isRefresh = false) {
			return new Promise((resolve, reject) => {
				this.$HTTP({
					url: '/zjq/mainpage/GetFile',
					header: 'form',
					data: {
						token: 'd05902562e544db29bbe777954d43bb0',
						type: '2',
						pageIndex: this.page.pageIndex,
						pageSize: this.page.pageSize
					}
				}).then(res => {
					if (res.code == 0) {
						let data = res.data.list.map(item => {
							return {
								...item,
								name: item.filename,
								hasDownloaded: item.downloadnum,
								fileSize: item.filesize,
								src: item.fileavatar || '/static/indexIcon/p1.png'
							};
						});
						if (isRefresh) {
							this.fileListArr = data;
							this.page.pageIndex = 1;
						} else {
							this.fileListArr.concat(data);
							this.page.pageIndex++;
						}
					}
					resolve(res.data.lastPage);
				});
			});
		},
		search() {}
	}
};
</script>

<style scoped lang="scss">
.search {
	padding: 10upx 20upx;
}
</style>
