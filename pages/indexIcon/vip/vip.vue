<!--VIP-->
<template>
	<view class="vip">
		<view class="vip-content">
			<view class="vip-card">
				<view class="vip-l">
					<image src="../../../static/p106.png" mode="aspectFill"></image>
				</view>
				<view class="vip-r">
					<p>昵称</p>
					<p>会员时间：2019-09-01</p>
				</view>
			</view>
		</view>
		<view class="vip-means">
			<text class="me-title">开通VIP会员您可以拥有以下权限：</text>
			<view class="meas-xiang">
				<p>1、可以查看有双高计划标签的学校</p>
				<p>2、可以查看本专业全国开设情况</p>
				<p>3、可以在软件后台编辑本校信息内容</p>
				<p>4、可以进行学校和专业pk对比</p>
				<p>5、可以下载资料库职教文件</p>
			</view>
		</view>
		<button  class="vec-btn vip-open" type="primary" @tap="toRecharge()">立即开通</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			toRecharge() {
				uni.navigateTo({
					url:"recharge"
				})
			}
		},
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
@import "./base64.scss";
.vip-content{
	background-color: #F7F7F7;
	padding: 20upx 0;
}
.vip-card{
	margin: 0upx 35upx;
	background: $vip_bg no-repeat;
	background-size: 100%;
	width: 680upx;
	height: 300upx;
	border-radius: 20upx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.vip-l{
		padding-left: 26upx;
		image{
			width:160upx ;
			height:160upx ;
		}
	}
	.vip-r{
		padding-left: 26upx;
		color: #fff;
		p:nth-child(1){
			font-size:40upx;
			font-weight:600;
			line-height:62upx;
		}
		p:nth-child(2){
			font-size:26upx;
			font-weight:400;
			line-height:37upx;
		}
	}
}	
.vip-means{
	margin: 30upx 30upx;
	.me-title{
		color: #333333;
		line-height:42upx;
		font-size:30upx;
		font-weight: bold;
	}
	.meas-xiang{
		padding-top: 20upx;
		font-size:26upx ;
		line-height: 50upx;
		color:rgba(153,153,153,1);
	}
}
.vip-open{
	margin-top: 60px;
}
</style>
