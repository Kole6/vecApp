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
	width:686upx;
	height:308upx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 10px 0px rgba(100,81,252,0.1);
	border-radius:31upx;
	margin: 20upx auto;
	.title{
		border-bottom: 1px solid #eee;
		font-size:34upx;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:48upx;
		padding: 27upx 35upx;
	}
	.txt{
		font-size: 28upx;
		font-weight: 500;
		display: flex;
		line-height: 45upx;
		color: #666;
		.txt-box{
			text-align: center;
			flex: 1;
			p:nth-child(2){
				color: #333;
				font-weight: 700;
				font-size: 36upx;
				padding-top:25upx ;
			}
			margin: 46upx 0;
		}
	}
}
</style>
