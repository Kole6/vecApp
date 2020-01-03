<!-- 院校库 -->
<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false">
			<uni-search-bar style="width: 100%;" :radius="100" :isDisabled="true" clearButton="always" @searchClick="handleSearchTap" />
		</uni-nav-bar>
		<view class="nav">
			<navigator url="/pages/indexIcon/schoolDatabase/BenkePage">
				<view class="nav-item nav-item-1"><text>本科层次职业教育</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/schoolDatabase/GaozhiPage">
				<view class="nav-item nav-item-2"><text>高职高专院校</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/schoolDatabase/ZhongzhiPage">
				<view class="nav-item nav-item-3"><text>中等职业学校</text></view>
			</navigator>
		</view>
		<view class="list-title">
			<view class="hot">热门学校</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit"></image>
		</view>
		<load-more ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
			<view class="school-list">
				<school-list class="" :isText="true" :showType="4" :listArr="dataArr"></school-list>
			</view>
		</load-more>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from './SchoolList.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import loadMore from '@/components/loadMore/you-scroll.vue'
import {schoolData} from '../mockData.js'
export default {
	components: { uniSearchBar, schoolList, uniNavBar ,loadMore},
	data() {
		return {
			loadStatus:'noMore',
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
			dataArr: [],
			page: {
			    pageIndex: 1,
			    pageSize: 10,
			}
		};
	},
	onNavigationBarSearchInputClicked() {
	},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.school-list')
			.boundingClientRect(data => {
				let height = this.systemInfo.screenHeight - data.top ;
				this.wrapperHeight = height + 'px'
				// this. wrapperHeight = '300px'
			})
			.exec();
		this.getData();
	},
	methods: {
		onPullDown(done){
			console.log('pulldown')
			setTimeout(()=>{
				this.dataArr = schoolData
				done();
			},2000)
		},
		onScroll(){
		},
		onLoadMore(){
			this.loadStatus = 'loading'
			this.getData().then(()=>{
			})
			setTimeout(() =>{
				this.dataArr=[...this.dataArr,...schoolData]
					this.loadStatus = 'more'
			}, 1000);
		},
		getData(isRefresh) {
		    return new Promise((resolve, reject) => {
		        this.$HTTP({
		            url: '/zjq/mainpage/GetHotCollege',
		            header: 'form',
		            data: {
		                type: '2',
		                token: uni.getStorageSync('token'),
		                pageIndex: this.page.pageIndex,
		                pageSize: this.page.pageSize,
		            }
		        }).then(res => {
		            if (res.code == 0) {
		                let data = res.data.list.map(item => {
		                        item.tags = item.tags + ''
		                            return {
		                            ...item,
		                            title: item.schoolname,
		                            cards: item.tags.split(',').map(item => {
		                                return {
		                                    name: item
		                                };
		                            }),
		                            tags: [{
		                                    name: '地区',
		                                    value: item.area
		                                }, {
		                                    name: '层次',
		                                    value: item.level==1?'高职':(item.level==2?'中职':item.level)
		                                }
		                            ]
		                        };
		                    });
		                if (isRefresh) {
							this.dataArr = data
							this.page.pageIndex = 1;
		                } else {
		                    this.dataArr.push(...data)
		                    this.page.pageIndex++
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
}
</style>
