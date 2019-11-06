<template>
	<view>
		<view class="ziXun" hover-class="uni-list-cell-hover" v-for="(item,index) in infoListTest" :key="index" @tap="openInfo()">
			<view class="z-left">
				<p class="left-title">{{item.title}}</p> 
				<p class="left-text">{{`时间：2019-03-02 来源：校园网`}}</p> 
			</view>
			<view class="z-right">
				<image mode="aspectFill" :src="item.img" class="image1"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoListTest: [{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06052619/cd2viy851dbu5tsr!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201910/31113337/dblb8niihg3y9pgb!heading",
						time: '2019-03-02',
						source: "校园网"
					},{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06023811/0nccc1mhji53qxzj!heading",
						time: '2019-03-02',
						source: "校园网"
					}
				]
			};
		},
		methods: {
			openInfo() {
				var newsid = '115';
				uni.navigateTo({
					url: "/pages/tabBar/info/infoDetail?newsid="+newsid
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
.ziXun{
	width: 750upx;
	height: 200upx;
	background-color: white;
	border-bottom: 1px #F8FAFF solid;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.z-left{
		padding-left: 26upx;
		.left-title{
			width:445upx;
			height:80upx;
			font-size:28upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:40upx;
		}
		.left-text{
			font-size:20upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
			margin-top:18upx;
		}
	}
	.image1{
		// padding-right: 30upx;
		margin-right: 30upx;
		width: 210upx;
		height: 140upx;
		border-radius:10px;
	}
}
</style>
