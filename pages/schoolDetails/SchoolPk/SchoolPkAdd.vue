<template>
	<view>
		<!-- 专业对比 -->
		<!-- 已选中的对比专业 -->
		<view class="m-message"><message-info :message="searchResultMessage" :isShow.sync="isShowMessage" @close="handleMessageClose"></message-info></view>
		<view class="m-search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" /></view>

		<!-- 可以选择的对比列表 -->
		<QSTabs ref="tabs" :current="current" :tabs="tabs" width="375" swiperWidth="750" activeColor="#6451FC"
		 backgroundColor="#fff" @change="change($event)" />
		 <swiper :style="{height:`${wrapperHeight}`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
		 	 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
		 	<swiper-item>
				<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
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
						<school-list-item :item="item" :showType="4"  :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
					</view>
				</view>
				</load-more>
				
		 	</swiper-item>
		 	<swiper-item>
				<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
				<view class="wrapper">
					<view class="list-item" v-for="(item, index) in listArr2" :key="index">
						<view class="flag" @click="handleListTaped(item)">
							<block v-if="item.hasSelected">
								<view class="selecting"></view>
							</block>
							<block v-else>
								<image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx" ></image>
							</block>
						</view>
						<school-list-item :item="item" :showType="4"  :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
					</view>
				</view>
				</load-more>
		 	</swiper-item>
		 </swiper>

		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left" @tap="handleBack">退出</view>
			<view class="right"  @tap="handleRouter">确认添加</view>
		</view>
	</view>
</template>

<script>
import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
import loadMore from '@/components/loadMore/you-scroll.vue'
import {schoolData} from '@/pages/indexIcon/mockData.js'
const schoolData2 = [...schoolData,...schoolData]
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
			loadStatus:'more',
			searchResultMessage: '已添加3个学校到对比库',
			isShowMessage: true,
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			activeIndex: 1,
			tabs: ["我的关注", "热门学校"],
			current:0,
			firstHeight:'0',
			listArr: schoolData.map(item=>{
				return{
					...item,
					hasSelected:true
				}
			}),
			listArr2:schoolData2.map(item=>{
				return{
					...item,
					hasSelected:true
				}
			})
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
	},
	methods: {
		onPullDown(done){
			setTimeout(()=>{
				done();
			},1000)
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
						token: uni.getStorageSync('token'),
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
		handleTab(tabIndex) {
			if (tabIndex == 0) {
			} else if (tabIndex == 1) {
				// this.listArr = [
				// 	{
				// 		hasSelected: false,
				// 		title: '汽车运用与维护',
				// 		tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
				// 		cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				// 	},
				// 	{
				// 		hasSelected: false,
				// 		title: '汽车运用与维护',
				// 		tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
				// 		cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				// 	},
				// 	{
				// 		hasSelected: true,
				// 		title: '汽车运用与维护',
				// 		tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
				// 		cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				// 	}
				// ];
			}
		},
		handleListTaped(item) {
			item.hasSelected= !item.hasSelected
		},
		handleMessageClose() {
			this.isShowMessage = false;
			this.calcScrollHeight();
		},
		search(value) {
			console.log(value);
		},
		handleChecked(item, index) {
			this.$set(item, 'checked', !item.checked);
		},
		handleRouter() {
			uni.navigateTo({
				url:'./SchoolPk'
			})
		},
		handleBack(){
				uni.navigateBack({
					delta: 2
				});
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
