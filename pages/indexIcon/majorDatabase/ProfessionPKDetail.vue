<template>
	<view>
	<!-- 专业对比-详细 -->	
	<!-- <view class="m-top">
		
	</view> -->
	<view class="m-top">
		<view class="content">
			<view class="left">
				<view class="item">部队政治工作</view>
				<view class="item">部队政治工作</view>
				<view class="item">部队政治工作</view>
				<view class="item">部队政治工作</view>
			</view>
			<view class="right">
				<image src="../../../static/indexIcon/pk-vs.png" mode="aspectFit" style="width: 183upx; height: 106upx;"></image>
			</view>
		</view>
	</view>
	<view class="m-title">
		<text>专业对比信息</text>
	</view>
	<view class="m-table">
		<!-- <view class="f-o">
			<image src="../../../static/indexIcon/selected.png" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
			<text>自动隐藏相同信息</text>
		</view> -->
		<view class="t-table" :style="{height:tableHeight,width:tableWidth}">
			<view class="t-row t-title">
				<view class="t-th">专业名称</view>
				<view class="t-th">汽车运用与维护</view>
				<view class="t-th">计算机专业</view>
			</view>
			<view class="t-row">
				<view class="t-td">专业代码</view>
				<view class="t-td">22</view>
				<view class="t-td">21</view>
			</view>
			<view class="t-row">
				<view class="t-td">学历层次</view>
				<view class="t-td">52</view>
				<view class="t-td">12</view>
			</view>
			<view class="t-row">
				<view class="t-td">修业年限</view>
				<view class="t-td">01</view>
				<view class="t-td">02</view>
			</view>
			<view class="t-row">
				<view class="t-td">学校开设数量</view>
				<view class="t-td">12</view>
				<view class="t-td">02</view>
			</view>
			<view class="t-row">
				<view class="t-td">主要对应职业类型</view>
				<view class="t-td">12</view>
				<view class="t-td">12</view>
			</view>
			<view class="t-row">
				<view class="t-td">衔接高职专业举例</view>
				<view class="t-td">02</view>
				<view class="t-td">03</view>
			</view>
		</view>
	</view>
	
	<view class="m-btn">
		<text>下载对比报告</text>
	</view>
</view>
</template>

<script>
	export default {
		data(){
			return{
				tableHeight:'0',
				tableWidth:'750upx'
			}
		},
		onLoad(){
			this.tableHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(750) + 'px'
			console.log(this.tableHeight)
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.m-top{
		background: url(../../../static/indexIcon/pk-header-bg.png) no-repeat;
		background-size: 100% 100%;
		height: 300upx;
		position: relative;
		margin-bottom:174upx ;
		.content{
			box-sizing: border-box;
			position: absolute;
			top: 164upx;
			right: 32upx;
			width: 686upx;
			height: 280upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding:16upx 50upx;
			.left{
				display: inline-flex;
				flex-direction: column;
				justify-content: space-around;
				height: 100%;
				font-size: $uni-font-size-lg;
				color: $main-text-color;
			}
			.right{
				position: absolute;
				top: 87upx;
				right: 109upx;
			}
		}
	}
	.m-table{
		background: #FFFFFF;
		overflow: auto;
		.f-o{
			padding: 22upx 30upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text{
				font-size: $uni-font-size-base;
				color: #999999;
				padding-left: 10upx;
			}
		}
		.t-table{
			box-sizing: border-box;
			width: 100%;
			padding: 0 10upx;
			overflow: auto;
			$border-color:#fff;
			.t-title{
				position: sticky;
				top: 0;
				background: #FFFFFF;
				z-index: 10;
				padding: 0;
				color: #666666;
			}
			.t-row{
				display: flex;
				justify-content: space-between;
				align-items: stretch;
				color: #666666;
				.t-td,.t-th{
					box-sizing: border-box;
					flex:1;
					padding: 35upx 10upx;
					font-size: $uni-font-size-base;
					display: inline-flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					// border-top: solid 1px $border-color;
					// border-left: solid 1px $border-color;
				}
				.t-td:nth-of-type(even),.t-th:nth-of-type(even){
					background-color: #F3F7FF;
				}
				.t-td:last-child,.t-th:last-child{
					// border-right: solid 1px $border-color;
				}
			}
			.t-row:last-child{
				.t-td,.t-th{
					// border-bottom: solid 1px $border-color;
				}
			}
			
		}
	}
	.m-title{
		font-size: $uni-font-size-lg;
		font-weight: bold;
		color: $main-text-color;
		padding: 27upx 32upx;
		background: #FFFFFF;
		border-bottom: solid 1upx $main-dividing-line1;
	}
	
	.m-btn{
		position: fixed;
		bottom: 30upx;
		right: 75upx;
		width: 600upx;
		height: 48upx;
		border-radius: 48upx;
		padding: 20upx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to top,#6A43FE,#4795F9);
		color: #FFFFFF;
		font-size: $uni-font-size-lg;
	}
</style>
