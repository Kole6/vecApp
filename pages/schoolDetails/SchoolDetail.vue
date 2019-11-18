<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="学校详情">
			<view class="f-sc" slot="right" @tap="hasSC = !hasSC">
				<image :src="hasSC?assets.sc2:assets.sc1" mode="aspectFit" style="height: 40upx; width: 40upx;"></image>
			</view>
		</uni-nav-bar>
		<view class="m-wrapper" :style="{height:wrapperHeight,overflow:'auto'}">
		<view class="m-top">
			<view class="base">
				<view class="left">
					<text>北</text>
				</view>
				<view class="right">
					<view class="title">北京市滨海职业大学</view>
					<view class="info">
						<text>北京市</text>
						<text>1999年</text>
						<text>公办</text>
					</view>
					<view class="num">
						<text>学校标示码:1234567890</text>
					</view>
				</view>
				<view class="f-site">官网</view>
				<view class="f-dz" @tap="hasDZ=!hasDZ">
					<image :src="hasDZ?'/static/indexIcon/dz.png':'/static/indexIcon/dz.png'" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
					<text >{{dzNumber}}</text>
				</view>
			</view>
			<view class="image">
				<image src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d1b03b49334e251fe2f7e3fe9fbdae2a/08f790529822720e9c777b8978cb0a46f21fab0c.jpg" mode="aspectFit"></image>
			</view>
			<view class="tags">
				<view class="item">理工</view>
				<view class="item">国家重点</view>
				<view class="item">国家示范校</view>
			</view>
			<view class="address">
				<text>地址：</text>
				<text>北京市五道口职业技术学院</text>
			</view>
		</view>
		<view class="line"></view>
		<!-- 对比列表 -->
		<view class="m-tip">
			{{tipMessage}}
		</view>
		<view class="m-pk" @tap="handlePK">
			<view class="left">
				<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
				<text>添加本学校到对比列表</text>
			</view>
			<view class="right">
				<text>对比</text>
			</view>
			<image class="bg1" src="/static/indexIcon/colorGroup.png" mode="aspectFit" style="width: 300upx;height: 100upx;"></image>
			<image class="bg2" src="/static/indexIcon/vszong.png" mode="aspectFit" style="width: 70upx;height: 70upx;"></image>
		</view>
		
		<view class="m-info">
			<view class="u-title">
				<text>基本信息</text>
			</view>
			<view class="tags">
				<block v-for="(item,index) in schoolInfo" :key="index">
					<view class="item"><text @tap="handleTap(item,index)">{{item.name}}</text></view>
				</block>
			</view>
		</view>
		<view class="m-info">
			<view class="u-title">
				<text>学校实力</text>
			</view>
			<view class="tags">
				<block v-for="(item,index) in schoolInfo2" :key="index">
					<view class="item"><text @tap="handleTap(item,index)">{{item.name}}</text></view>
				</block>
			</view>
		</view>
		
		<view class="m-school_list" @tap="handleRouter('./NearbySchool/NearbySchoolList')">
			<text>附近学校</text>
			<uni-icons
			  type="arrowright"
			  size="24"/>
		</view>
		<view class="m-school_list" @tap="handleRouter('./jsmind')">
			<text>拓扑图</text>
			<uni-icons
			  type="arrowright"
			  size="24"/>
		</view>
		
		<view class="m-info">
			<view class="title f-link">
				<text>学校资讯</text>
				<uni-icons
				  type="arrowright"
				  size="24"/>
			</view>
			<zi-xun></zi-xun>
		</view>
		</view>
		<!-- 底部按钮 -->
		<!-- <view class="m-bottom">
			<view class="left" @tap="handleSave">
				<text class="vecfont icon-menu iconguanzhu" :class="{'saved':hasSaved}"></text>
				<text class="text">
					{{hasSaved?'取消关注':'关注'}}
				</text>
			</view>
			<view class="right" @tap="handlePK">
				<text>学校对比</text>
			</view>
		</view> -->
		
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniIcons from '@/components/uni-icons/uni-icons';
import ziXun from "@/components/ziXun/ziXun.vue"
// 防止在点击的时候因为图片加载出现闪烁
import sc1 from '@/static/indexIcon/sc1.png'
import sc2 from '@/static/indexIcon/sc2.png'
export default {
	components: { uniNavBar ,uniIcons ,ziXun},
	data() {
		return {
			tipMessage:'您还可以进行学校对比哦!您已经添加0个学校',
			dzNumber:'1w+',
			hasDZ:false,//是否点赞
			hasSC:false,
			assets:{
				sc1,
				sc2
			},
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
				url:'./SchoolLeader/SchoolLeader',
			},{
				name:'学校荣誉',
				url:'./schoolHonors/schoolHonors',
			},{
				name:'奖助学金',
				url:'./assistanceScholarship/assistanceScholarship',
			}],
			schoolInfo2:[
				{
					name:'师资情况',
					url:'./ourFaculty/ourFaculty',
				},{
					name:'校企合作',
					url:'./cooperation/cooperation',
				},{
					name:'专业设置',
					url:'./ProfessionSetting/ProfessionSetting',
				},{
					name:'技能大赛',
					url:'./skillsCompetition/skillsCompetition',
				},{
					name:'就业创业',
					url:'./entrepreneurship/entrepreneurship',
				}
			]
		};
	},
	created(){
		
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
		handleRouter(url){
			uni.navigateTo({
				url:url
			})
		},
		handleBack() {
			uni.navigateBack();
		},
		handlePK(){
			// uni.navigateTo({
			// 	url:'./SchoolPk/SchoolPk'
			// })
		},
		handleTap(item,index){
			if(item.url){
				uni.navigateTo({
					url:item.url
				})
			}
		}
	}
};
</script>

<style scoped lang="scss">
// 官网
@mixin  flexstyle ($jusp,$alip){
	display: flex;
	justify-content: $jusp;
	align-items: $alip;
}
.f-sc{
	padding-left: 30upx;
}
.line{
	height: 20upx;
}
.u-title{
	font-size: $uni-font-size-lg;
	color: $main-text-color;
	font-weight: bold;
	padding: 29upx 31upx;
	background: #FFFFFF;
	border-bottom: solid 1upx $main-dividing-line1;
}
.m-top {
	background: #FFFFFF;
	border-top: solid 1upx $main-dividing-line1;
	.base{
		display: flex;
		padding-top: 30upx;
		padding-left: 50upx;
		position: relative;
		.left{
			@include flexstyle(center,center)
			margin: 15upx 0;
			width: 120upx;
			height: 120upx;
			border: solid 1upx $main-base-color;
			color: $main-base-color;
			border-radius: 60upx;
			font-size: 48upx;
		}
		.right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: $uni-font-size-base;
			color: #666666;
			padding-left: 20upx;
			.title{
				font-size: $uni-font-size-lg;
				color: $main-text-color;
				font-weight: bold;
			}
			.info{
				text{
					padding: 0 15upx;
					border-left: solid 1upx #666666;
				}
				text:first-child{
					padding-left: 0;
					border-left: none;
				}
			}
		}
		.f-site{
			@include flexstyle(center,center)
			box-sizing:border-box;
			position: absolute;
			top: 30upx;
			right: 61upx;
			width: 90upx;
			height: 45upx;
			font-size: $uni-font-size-base;
			color: $main-base-color;
			border-radius: 5upx;
			border: solid 1upx $main-base-color;
		}
		.f-dz{
			@include  flexstyle(flex-start,center)
			position: absolute;
			top: 96upx;
			right: 61upx;
			font-size:$uni-font-size-base;
			color:#999999;
		}
	}
	.image{
		padding: 0 32upx;
		image{
			width: 100%;
		}
	}
	.tags {
		padding-left: 32upx;
		.item {
			display: inline-block;
			box-sizing: border-box;
			font-size: $uni-font-size-base;
			padding: 5upx 10upx;
			border: solid 1upx #FF750F;
			color: #FF750F;
			border-radius: 5upx;
			margin-right: 20upx;
		}
	}
	.address{
		padding:20upx 0 20upx 32upx;
		font-size: $uni-font-size-base;
		color: #999999;
	}
}
.m-tip{
	padding: 26upx 36upx;
	font-size: $uni-font-size-base;
	color: $main-text-color;
	font-weight: bold;
	background: #FFFFFF;
}
.m-pk{
	background: #FFFFFF;
	box-sizing: border-box;
	@include flexstyle(space-between,center)
	position: relative;
	height: 100upx;
	padding: 20upx 35upx;
	margin-bottom:20upx;
	.left{
		display: inline-flex;
		align-items: center;
		font-size: $uni-font-size-base;
		color: #999999;
		text{
			padding-left: 10upx;
		}
	}
	.right{
		z-index: 3;
		color: #FFFFFF;
	}
	.bg1{
		position: absolute;
		top: -2upx;
		right: 0;
		z-index: 1;
	}
	.bg2{
		position: absolute;
		top: 14upx;
		right: 128upx;
		z-index: 2;
	}
}
.m-school_list{
	@include  flexstyle(space-between,center)
	padding: 28upx 31upx;
	font-size: $uni-font-size-lg;
	color: $main-text-color;
	font-weight:bold;
	background: #FFFFFF;
	border-bottom: solid 1upx $main-dividing-line1;
	margin-bottom:20upx;
}
// .m-bottom{
// 	position: fixed;
// 	bottom: 0;
// 	font-size: $uni-font-size-lg + 8;
// 	display: flex;
// 	box-sizing: border-box;
// 	width: 100vw;
// 	.left{
// 		width: 70%;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		padding:25upx 0;
// 		background: #FFFFFF;
// 		.text{
// 			padding-left: 20upx;
// 		}
// 	}
// 	.right{
// 		width: 30%;
// 		text-align: center;
// 		background: #199ED8;
// 		padding:25upx 0;
// 		color: #FFFFFF;
// 	}
// 	.saved{
// 		color: $main-base-color;
// 	}
// 	.saved+.text{
// 		color: $main-base-color;
// 	}
// }
.m-info{
	border-bottom: solid 1upx $main-dividing-line1;
	background: #FFFFFF;
	margin-bottom: 20upx;
	.title.f-link{
		@include  flexstyle(space-between,center)
		padding:28upx 31upx;
		font-weight: bold;
		font-size: $uni-font-size-lg;
		border-bottom: solid 1upx $main-dividing-line1;
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
				display: inline-flex;
				justify-content: center;
				align-items: center;
				color: $main-text-color;
				background: #F5F5FB;
				width: 200upx;
				height: 54upx;
				box-sizing: border-box;
				padding: 10upx 0;
				border: solid 1upx $main-dividing-line1;
				border-radius: 54upx;
			}
		}
	}
}
</style>
