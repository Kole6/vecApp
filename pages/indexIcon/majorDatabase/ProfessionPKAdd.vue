<template>
	<view>
		<!-- 专业对比 -->
		<!-- 已选中的对比专业 -->
		<!-- <view class="m-message"><message-info :message="searchResultMessage" :isShow.sync="isShowMessage" @close="handleMessageClose"></message-info></view> -->
		<view class="m-search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" /></view>

		<!-- 可以选择的对比列表 -->
		<QSTabs ref="tabs" :current="current" :tabs="tabs" width="375" swiperWidth="750" activeColor="#6451FC"
		 backgroundColor="#fff" @change="change($event)" />
		 <swiper :style="{height:`${wrapperHeight}`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
		 	 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
		 	<swiper-item>
				<load-more ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus1">
				<view class="wrapper">
					<view class="list-item" v-for="(item, index) in listArr" :key="index">
						<view class="flag" @click="handleListTaped(item)">
							<block v-if="item.hasSelected">
								<view class="selecting"></view>
							</block>
							<block v-else>
								<image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx" ></image>
							</block>
						</view>
						<school-list-item :item="item" :showType="4" :is-special="true" :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
					</view>
				</view>
				</load-more>
				
		 	</swiper-item>
		 	<swiper-item>
				<load-more ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus2">
				<view class="wrapper">
					<view class="list-item" v-for="(item, index) in listArr" :key="index">
						<view class="flag" @click="handleListTaped(item)">
							<block v-if="item.hasSelected">
								<view class="selecting"></view>
							</block>
							<block v-else>
								<image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx" ></image>
							</block>
						</view>
						<school-list-item :item="item" :showType="4" :is-special="true" :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
					</view>
				</view>
				</load-more>
		 	</swiper-item>
		 </swiper>

		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left" @tap="handleQuit">退出</view>
			<view class="right"  @tap="handleRouter">开始对比</view>
		</view>
	</view>
</template>

<script>
import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: {
		schoolListItem,
		uniSearchBar,
		messageInfo,
		QSTabs,
		loadMore
	},
	data() {
		return {
			searchValue:'',//查询值
			page1:{
				pageIndex:1,
				pageSize:10,
			},
			page2:{
				pageIndex:1,
				pageSize:10,
			},
			loadStatus1:'noMore',
			loadStatus2:'noMore',
			searchResultMessage: '已添加3个专业到对比库',
			isShowMessage: true,
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			activeIndex: 1,
			tabs: ["我的关注", "热门专业"],
			current:0,
			firstHeight:'0',
			listArr: [
				{
					hasSelected: true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				}
			]
		};
	},
	computed: {
		scrollH() {
			let sys = uni.getSystemInfoSync();
			let winWidth = sys.windowWidth;
			let winrate = 750 / winWidth;
			let winHeight = parseInt(sys.windowHeight * winrate)
			return winHeight
		}
	},
	mounted() {
		this.calcScrollHeight(true)
		this.onPullDown('');
	},
	methods: {
		handleQuit(){
			uni.switchTab({
				url:'../../tabBar/index/index',
			})
		},
		onPullDown(done) {
			if(this.current==0){
				this.page1.pageIndex = 1;
				this.getData1(true)
				.then(isLastPage => {
				    if (isLastPage) {
				        this.loadStatus1 = 'noMore';
				    } else {
				        this.loadStatus1 = 'more';
				    }
				})
				.finally(() => {
				    done && done();
				});
			}else{
				this.page2.pageIndex = 1;
				this.getData2(true)
				.then(isLastPage => {
				    if (isLastPage) {
				        this.loadStatus2 = 'noMore';
				    } else {
				        this.loadStatus2 = 'more';
				    }
				})
				.finally(() => {
				    done && done();
				});
			}
		},
		onLoadMore() {
			if(this.current==0){
				this.loadStatus1 = 'loading';
				this.getData1().then(isLastPage => {
				    if (isLastPage) {
				        this.loadStatus1 = 'noMore';
				    } else {
				        this.loadStatus1 = 'more';
				    }
				});
			}else{
				this.loadStatus2 = 'loading';
				this.getData1().then(isLastPage => {
				    if (isLastPage) {
				        this.loadStatus2 = 'noMore';
				    } else {
				        this.loadStatus2 = 'more';
				    }
				});
			}
		},
		// 我的关注
		getData1(isRefresh=false) {
		    return new Promise((resolve, reject) => {
		        this.$HTTP({
		            url: '/zjq/User/GetFavoriteList',
		            header: 'form',
		            data: {
		                type: '2',
		                token: 'd05902562e544db29bbe777954d43bb0',
		                pageIndex: this.page1.pageIndex,
		                pageSize: this.page1.pageSize,
		                // key: this.searchValue
		            }
		        }).then(res => {
		            console.log('result==', res);
		            if (res.code == 0) {
		                // let data = res.data.list.map(item => {
		                //         item.tags = item.tags + ''
		                //             return {
		                //             ...item,
		                //             title: item.schoolname,
		                //             cards: item.tags.split(',').map(item => {
		                //                 return {
		                //                     name: item
		                //                 };
		                //             }),
		                //             tags: [{
		                //                     name: '地区',
		                //                     value: item.area
		                //                 }, {
		                //                     name: '层次',
		                //                     value: item.level
		                //                 }
		                //             ]
		                //         };
		                //     });
		                if (isRefresh) {
							// this.dataArr = data
							this.page1.pageIndex = 1;
		                } else {
		                    // this.dataArr.push(...data)
		                    this.page1.pageIndex++
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
		getData2(isRefresh=false){
			return new Promise((resolve, reject) => {
			    this.$HTTP({
			        url: '/zjq/User/GetFavoriteList',
			        header: 'form',
			        data: {
			            type: '2',
			            token: 'd05902562e544db29bbe777954d43bb0',
			            pageIndex: this.page2.pageIndex,
			            pageSize: this.page2.pageSize,
			            // key: this.searchValue
			        }
			    }).then(res => {
			        if (res.code == 0) {
			            // let data = res.data.list.map(item => {
			            //         item.tags = item.tags + ''
			            //             return {
			            //             ...item,
			            //             title: item.schoolname,
			            //             cards: item.tags.split(',').map(item => {
			            //                 return {
			            //                     name: item
			            //                 };
			            //             }),
			            //             tags: [{
			            //                     name: '地区',
			            //                     value: item.area
			            //                 }, {
			            //                     name: '层次',
			            //                     value: item.level
			            //                 }
			            //             ]
			            //         };
			            //     });
			            if (isRefresh) {
							// this.dataArr = data
							this.page2.pageIndex = 1;
			            } else {
			                // this.dataArr.push(...data)
			                this.page2.pageIndex++
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
		handleTab(tabIndex) {
			if (tabIndex == 0) {
			} else if (tabIndex == 1) {
			}
		},
		handleListTaped(item) {
			item.hasSelected= !item.hasSelected
		},
		handleMessageClose() {
			this.isShowMessage = false;
			this.calcScrollHeight();
		},
		search({value}) {
			this.searchValue = value;
		},
		handleChecked(item, index) {
			this.$set(item, 'checked', !item.checked);
		},
		handleRouter() {
			uni.redirectTo({
				url:'./ProfessionPK'
			})
		},
		change(index){
			this.current = index;
		},
		swiperChange({detail: { current }}) {
			this.handleTab(current)
			this.current = current;
		},
		transition({detail: { dx }}) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({detail: { current }}) {
			this.$refs.tabs.setFinishCurrent(current);
		},
		calcScrollHeight(isFirst = false) {
			setTimeout(() => {
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this);
				query
					.select('.wrapper')
					.boundingClientRect(data => {

					 	let height = this.systemInfo.screenHeight - data.top - uni.upx2px(200) ;
						// #ifdef APP-PLUS
							height = height - 30
						// #endif
						if(isFirst){
							this.firstHeight = height
							this.wrapperHeight = height + 'px'
						}else{
							if(this.isShowMessage){
								this.wrapperHeight = this.firstHeight + 'px'
							}else{
								this.wrapperHeight = this.firstHeight + 40 +'px'
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
// @import  './profession.scss';
.m-search {
	padding: 20upx 32upx;
}
.m-card {
	display: flex;
	justify-content: space-between;
	align-content: center;
	padding: 0 110upx;
	background: #ffffff;
	.card-item {
		box-sizing: border-box;
		padding: 21upx 10upx;
		font-size: $uni-font-size-lg;
		color: $main-text-color;
	}
	.card-item.active {
		border-bottom: solid 4upx $main-base-color;
		color: $main-base-color;
	}
}
.m-bottom {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	font-size: $uni-font-size-lg + 5;
	display: flex;
	justify-content: center;
	align-items: center;
	// padding: 20upx 0;
	// background: $main-base-color;
	// color: #ffffff;
	width: 100%;
	z-index: 10;
	border-top: solid 1upx $main-dividing-line1;
	.left {
		width: 324upx;
		text-align: center;
		padding: 25upx 0;
		color: #666666;
		background: #ffffff;
	}
	.right {
		width: 426upx;
		text-align: center;
		background: $main-base-color;
		padding: 25upx 0;
		color: #ffffff;
	}
}
.list-item {
	background: #ffffff;
	position: relative;
	&:first-child {
		border-top: solid 1upx $main-dividing-line1;
	}
	.flag {
		position: absolute;
		z-index: 5;
		top: 26upx;
		right: 29upx;
		width: 36upx;
		height: 36upx;
		.selecting {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: solid 1upx $main-dividing-line1;
			background: #ffffff;
		}
	}
}
</style>
