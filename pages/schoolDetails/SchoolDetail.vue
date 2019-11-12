<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="学校详情">
			<block slot="right">
				<view class="f-site"><text class="site">官网</text></view>
			</block>
		</uni-nav-bar>
		<view class="m-wrapper" :style="{height:wrapperHeight,overflow:'auto'}">
		<view class="m-top">
			<view class="content">
				<view class="title">滨海职业技术学院</view>
				<view class="tags">
					<view class="item">理工</view>
					<view class="item">国家重点</view>
					<view class="item">国家示范校</view>
				</view>
				<view class="card">
					<text class="item">北京市</text>
					<text class="item">1999年</text>
					<text class="item">公办</text>
				</view>
				<view class="item">
					<text class="name">地点：</text>
					<text class="value">{{ baseInfo.address }}</text>
				</view>
				<view class="item">
					<text class="name">学校标识码：</text>
					<text class="value">{{ baseInfo.xxdm }}</text>
				</view>
				<view :class="['f-base', hasCompare ? 'yes' : 'no']" @tap="hasCompare = !hasCompare">{{ hasCompare ? '取消对比' : '加入对比' }}</view>
				<view class="f-like">
					<text>点赞</text>
				</view>
			</view>
		</view>
		<view class="m-img" style="font-size: 14px;">
			<!-- <image src="../../static/indexIcon/bg1.png" mode="aspectFit"></image> -->
		</view>
		<view class="m-school_list">
			<text>附近学校</text>
			<uni-icons
			  type="arrowright"
			  size="24"/>
		</view>
		<!-- 拓扑图 -->
		<view class="m-mind">
		</view>
		<view class="m-info">
			<view class="title">
				<text>基本信息</text>
			</view>
			<view class="tags">
				<block v-for="(item,index) in schoolInfo" :key="index">
					<view class="item"><text @tap="handleTap(item,index)">{{item.name}}</text></view>
				</block>
			</view>
		</view>
		<view class="m-info">
			<view class="title">
				<text>学校实力</text>
			</view>
			<view class="tags">
				<block v-for="(item,index) in schoolInfo2" :key="index">
					<view class="item"><text @tap="handleTap(item,index)">{{item.name}}</text></view>
				</block>
			</view>
		</view>
		<view class="m-info">
			<view class="title f-link">
				<text>学校资讯</text>
				<uni-icons
				  type="arrowright"
				  size="24"/>
			</view>
			<zi-xun></zi-xun>
			<view class="" style="height: 55px;"></view>
		</view>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left" @tap="handleSave">
				<text class="vecfont icon-menu iconguanzhu" :class="{'saved':hasSaved}"></text>
				<text class="text">
					{{hasSaved?'取消关注':'关注'}}
				</text>
			</view>
			<view class="right" @tap="handlePK">
				<text>学校对比</text>
			</view>
		</view>
		<view class="frame-wrapper">
			<!-- <web-view src="/hybrid/html/jsmind.html" :style="styleObj" class="iframe" style="width:100%;height: 150px;border:none"></web-view> -->
		</view>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons';
import ziXun from "@/components/ziXun/ziXun.vue"
export default {
	components: { uniNavBar ,uniIcons ,ziXun},
	data() {
		return {
			wrapperHeight:'auto',
			systemInfo: uni.getSystemInfoSync(),
			styleObj:{
				top:'250px',
			},
			hasSaved:false,
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			},
			baseInfo: {
				address: '滨海市高新开发区建设路128号',
				xxdm: '1286229618'
			},
			hasCompare: false,
			schoolInfo:[{
				name:'学校简介',
				url:'',
			},{
				name:'校领导',
				url:'',
			},{
				name:'学校荣誉',
				url:'',
			},{
				name:'奖助学金',
				url:'',
			}],
			schoolInfo2:[
				{
					name:'师资情况',
					url:'',
				},{
					name:'校企合作',
					url:'',
				},{
					name:'专业情况',
					url:'',
				},{
					name:'技能大赛',
					url:'',
				},{
					name:'就业创业',
					url:'',
				}
			]
		};
	},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.m-wrapper')
			.boundingClientRect(data => {
				let height = '';
				// #ifdef APP-PLUS
				height = this.systemInfo.screenHeight - data.top - 44 + 'px';
				// #endif
				// #ifdef H5
				height = this.systemInfo.screenHeight - data.top  + 'px';
				// #endif
				if (height) {
					this.wrapperHeight = height;
				}
			})
			.exec();
	},
	methods: {
		handleBack() {
			uni.navigateBack();
		},
		handlePK(){
			uni.navigateTo({
				url:'./SchoolPk/SchoolPk'
			})
		},
		handleTap(item,index){
			
		}
	}
};
</script>

<style scoped lang="scss">
// 官网
.f-site {
	display: inline-flex;
	box-sizing: border-box;
	.site {
		display: inline-flex;
		width: 60upx;
		height: 40upx;
		font-size: $uni-font-size-base;
		border: solid 1upx $main-dividing-line1;
		justify-content: center;
		align-items: center;
		padding: 5upx 10upx;
		border-radius: 10upx;
		color: $main-text-color;
	}
}
.m-top {
	.content {
		position: relative;
		padding: 10upx 20upx;
		background: #ffffff;
		color: $main-text-color;
		border-top: solid 1upx $main-dividing-line1;
		.title {
			font-size: $uni-font-size-lg;
			font-weight: bold;
			padding: 15upx 0;
		}
		.tags {
			.item {
				display: inline-block;
				box-sizing: border-box;
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				border: solid 1upx $main-dividing-line1;
				margin-right: 20upx;
			}
		}
		.card {
			margin-top: 10upx;
			.item {
				font-size: $uni-font-size-base;
				padding: 0 10upx;
				border-right: solid 1upx $main-dividing-line1;
				&:last-child {
					border: none;
				}
			}
		}
		.item {
			padding: 10upx 0 10upx 10upx;
			font-size: $uni-font-size-base;
			.value {
				color: #666666;
				padding-left: 20upx;
			}
		}
		.f-like{
			position: absolute;
			right: 100upx;
			top: 20upx;
			color: #1111FF;
			font-size: $uni-font-size-base;
		}
		.f-base {
			box-sizing: border-box;
			position: absolute;
			right: 50upx;
			top: 50%;
			transform: translateY(-50%);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 140upx;
			height: 140upx;
			border-radius: 70upx;
			border: solid 1px $uni-border-color;
			padding: 20upx;
			text-align: center;
			font-size: $uni-font-size-lg;
			color: #ffffff;
			background: $main-base-color;
		}
		.f-base.yes {
			background: #ffffff;
			color: $main-base-color;
		}
	}
}
.m-img{
	background: #FFFFFF;
	border-bottom: solid 1upx $main-dividing-line1;
	text-align: center;
}
.m-school_list{
	display: flex;
	padding: 20upx 25upx;
	justify-content: space-between;
	align-items: center;
	font-size: $uni-font-size-lg;
	color: $main-text-color;
	background: #FFFFFF;
	border-bottom: solid 1upx $main-dividing-line1;
}
.m-mind{
	height: 300upx;
	background: #F4F4F4;
}
.m-bottom{
	position: fixed;
	bottom: 0;
	font-size: $uni-font-size-lg + 8;
	display: flex;
	box-sizing: border-box;
	width: 100vw;
	.left{
		width: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding:25upx 0;
		background: #FFFFFF;
		.text{
			padding-left: 20upx;
		}
	}
	.right{
		width: 30%;
		text-align: center;
		background: #199ED8;
		padding:25upx 0;
		color: #FFFFFF;
	}
	.saved{
		color: $main-base-color;
	}
	.saved+.text{
		color: $main-base-color;
	}
}
.m-info{
	border-bottom: solid 1upx $main-dividing-line1;
	background: #FFFFFF;
	&:first-child{
		border-top: solid 1upx $main-dividing-line1;
	}
	.title{
		font-size: $uni-font-size-lg;
		color: $main-text-color;
		font-weight: bold;
		padding: 15upx 20upx;
		background: #CCCCCC;
	}
	.title.f-link{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.tags{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 20upx 0;
		border-bottom: solid 1upx $main-dividing-line1;
		.item{
			box-sizing: border-box;
			width: 30%;
			font-size: $uni-font-size-base;
			text-align: center;
			padding: 10upx;
			text{
				display: inline-block;
				padding: 10upx 40upx;
				border: solid 1upx $main-dividing-line1;
				border-radius: 15upx;
			}
		}
	}
}
</style>
