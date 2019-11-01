<!--VIP-->
<template>
	<view class="vip">
		<view class="vip-content">
			<view class="vip-card">
				<!-- 卡片 -->
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
		<view class="vip-open">
			<button type="primary" @tap="toRecharge()">立即支付</button>
		</view>
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

<style scoped lang="scss">
.vip-content{
	background-color: #F7F7F7;
	padding: 20upx 0;
}
.vip-card{
	margin: 0upx 30upx;
	background-color: #FFE259;
	height: 280upx;
	border-radius: 20upx;
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
		color: #999999;
		font-size:26upx ;
		line-height: 50upx;
	}
}
.vip-open{
	margin-top: 60px;
	text-align: center;
	button{
		color: #686865;
		font-weight: 700;
		width: 600upx;
		background-color: #FFE549;
	}
}
</style>
