<template>
	<view >
		<!-- 专业对比 -->
		<view class=""><message-info :message="searchResultMessage" :isShow.sync="isShowMessage" @close="handleMessageClose"></message-info></view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: '400px'}" :loadStatus="loadStatus">
			<view class="wrapper">
			<view class="list-item" v-for="(item,index) in listArr" :key="index">
				<view class="flag">
					<block v-if="item.hasSelected">
						<view class="selecting"></view>
					</block>
					<block v-else>
						<image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx"></image>
					</block>
				</view>
				<school-list-item :item="item" :showType="4" :is-special="true" :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
			</view>
		</view>
		</load-more>
		<view class="line"></view>
		<view class="m-tips" @tap="toAdd">
			<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
			<text>继续添加对比专业,最多添加四个</text>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom" >
			<view class="left">退出</view>
			<view class="right" @tap="handleRouter">开始对比</view>
		</view>
	</view>
</template>

<script>
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
import {professionData} from '../mockData.js'
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: {
		uniSwipeAction,
		schoolListItem,
		messageInfo,
		loadMore
	},
	data() {
		return {
			loadStatus:'more',
			searchResultMessage:'已添加3个专业到对比库',
			isShowMessage:true,
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			listArr: [
				{
					hasSelected:true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				}
			]
		};
	},
	mounted() {
		
	},
	methods: {
		onPullDown(done){
			setTimeout(()=>{
				this.dataArr = [
				{
					hasSelected:true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					hasSelected:false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				}
			]
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
		toAdd(){
			uni.navigateTo({
				url:'./ProfessionPKAdd',
			})
		},
		handleListTaped(item){
			item.hasSelected = !item.hasSelected
		},
		handleMessageClose(){
			this.isShowMessage = false;
		},
		checkboxChange() {
			console.log(arguments, 'arg');
		},
		handleSwipeChange() {},
		handleChecked(item, index) {
			this.$set(item, 'checked', !item.checked);
		},
		handleRouter() {
			uni.navigateTo({
				url:'./ProfessionPKDetail'
			})
		}
	}
};
</script>

<style scoped lang="scss">
// @import  './profession.scss';

.list-item{
	background: #FFFFFF;
	position: relative;
	&:first-child{
		border-top: solid 1upx $main-dividing-line1;
	}
	.flag{
		position: absolute;
		z-index: 2;
		top: 26upx;
		right: 29upx;
		width: 36upx;
		height: 36upx;
		.selecting{
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: solid 1upx $main-dividing-line1;
			background: #FFFFFF;
		}
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
	.left{
		width: 324upx;
		text-align: center;
		padding: 25upx 0;
		color: #666666;
		background: #FFFFFF;
	}
	.right{
		width: 426upx;
		text-align: center;
		background: $main-base-color;
		padding: 25upx 0;
		color: #FFFFFF;
	}
}
.line{
	height: 20upx;
}
.m-tips{
	display: flex;
	align-items: center;
	padding: 70upx 30upx;
	background: #FFFFFF;
	color:#999999;
	font-size: $uni-font-size-lg;
	text{
		padding-left: 20upx;
	}
}
</style>
