<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search"><uni-search-bar ref="search" radius="100" clearButton="auto" @confirm="search" placeholder="资料名称" /></view>
		<view class=""><message-info :message="searchResultMessage" :isShow.sync="isShow" @close="handleClose"></message-info></view>
		<!-- 文件列表区 -->
		
		<view class="list-wrapper" >
			<block v-if="fileListArr.length">
				<load-more ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
				<view class="school-list" ><file-list :listArr="fileListArr"></file-list></view>
				</load-more>
			</block>
		</view>

	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import fileList from './FileList.vue';
import messageInfo from "@/components/vec-message-info/vec-message-info.vue";
import loadMore from '@/components/loadMore/you-scroll.vue'
import docx from '@/static/indexIcon/word.jpg'
import xlsx from '@/static/indexIcon/xlsx.jpg'
import pdf from '@/static/indexIcon/pdf.jpg'
export default {
	components: { uniSearchBar, fileList, messageInfo,loadMore },
	data() {
		return {
			fileType:{
				docx,
				xlsx,
				pdf
			},
			page:{
				pageIndex:1,
				pageSize:10,
			},
			searchValue:'',
			loadStatus:'more',
			searchResultMessage: '',
			isShow: false,
			firstHeight:'0',
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
			fileListArr: []
		};
	},
	mounted() {
		this.$refs.search.searchClick();
		this.calcScrollHeight(true);
	},
	methods: {
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
				this.$http({
					url: '/zjq/mainpage/GetFile',
					header: 'form',
					data: {
						type: '',
						token: uni.getStorageSync('token'),
						pageIndex: this.page.pageIndex,
						pageSize: this.page.pageSize,
						key: this.searchValue
					}
				}).then(res => {
					if (res.code == 0) {
						let data = res.data.list.map(item => {
							return {
								...item,
								name:item.filename,
								hasDownloaded:item.downloadnum,
								fileSize:item.filesize,
								src:this.fileType[item.fileavatar] || '/static/indexIcon/p1.png'
							};
						});
						if (isRefresh) {
							this.searchResultMessage = `一共${res.data.totalRow}条搜索数据`;
							this.fileListArr = data;
							this.page.pageIndex = 1;
							this.isShow = true;
						} else {
							this.fileListArr.push(...data);
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
		handleClose() {
			this.isShow = false;
			this.calcScrollHeight();
		},
		search({value}) {
			this.searchValue = value
			this.page.pageIndex = 1;
			this.onPullDown();
		},
		calcScrollHeight(isFirst = false) {
			setTimeout(() => {
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this);
				query
					.select('.list-wrapper')
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
	background: #FFFFFF;
	border-top: solid 1upx $main-dividing-line1;
	border-bottom: solid 1upx $main-dividing-line1;
}
</style>
