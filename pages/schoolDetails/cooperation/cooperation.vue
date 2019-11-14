<template>
	<view>
		<view class="box">
			<view class="title">
				校企合作情况
			</view>
			<view class="txt">
				<view class="txt-box">
					<p>产学合作总数</p>
					<p>4</p>
				</view>
				<view class="txt-box">
					<p>订单培养数</p>
					<p>—</p>
				</view>
				<view class="txt-box">
					<p>共同开发课程</p>
					<p>4</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.box{
	margin: 20upx auto;
	width: 650upx;
	border: 1px solid #aaa;
	border-radius: 10upx;
	background-color: #fff;
	box-shadow:0px 0px 10px 0px rgba(0,0,0,0.1);
	.title{
		border-bottom: 1px solid #aaa;
		font-size: 30upx;
		padding: 20upx;
	}
	.txt{
		font-size: 28upx;
		font-weight: 700;
		display: flex;
		line-height: 45upx;
		.txt-box{
			text-align: center;
			flex: 1;
			margin: 50upx 20upx;
		}
	}
}
</style>
