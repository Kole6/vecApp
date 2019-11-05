<template>
	<view>
	<!-- 专业对比-详细 -->	
	<view class="m-top">
		<view class="left">
			汽
		</view>
		<view class="middle">
			pk对比
		</view>
		<view class="left">
			计
		</view>
	</view>
		
	<view class="m-title">
		专业对比信息
	</view>
	<view class="m-table" :style="{'height':tableHeight}">
		<view class="m-row m-title">
			<view class="m-th">专业名称</view>
			<view class="m-th">汽车运用与维护</view>
			<view class="m-th">计算机专业</view>
		</view>
		<view class="m-row">
			<view class="m-td">专业代码</view>
			<view class="m-td"></view>
			<view class="m-td">21</view>
		</view>
		<view class="m-row">
			<view class="m-td">学历层次</view>
			<view class="m-td">52</view>
			<view class="m-td">12</view>
		</view>
		<view class="m-row">
			<view class="m-td">修业年限</view>
			<view class="m-td">01</view>
			<view class="m-td">02</view>
		</view>
		<view class="m-row">
			<view class="m-td">学校开设数量</view>
			<view class="m-td">12</view>
			<view class="m-td">02</view>
		</view>
		<view class="m-row">
			<view class="m-td">主要对应职业类型</view>
			<view class="m-td">12</view>
			<view class="m-td">12</view>
		</view>
		<view class="m-row">
			<view class="m-td">衔接高职专业举例</view>
			<view class="m-td">02</view>
			<view class="m-td">03</view>
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
				tableHeight:'0'
			}
		},
		onLoad(){
			this.tableHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(350) + 'px'
			console.log(this.tableHeight)
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.m-top{
		display:flex;
		justify-content: space-around;
		align-items: center;
		padding: 50upx 50upx 20upx 50upx;
		.left,.right{
			box-sizing: border-box;
			width: 100upx;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 45upx;
			border-radius: 50upx;
			background: $main-base-color;
			padding: 10upx;
			color: #fff;
		}
		
	}
	.m-title{
		text-align: center;
		font-size: $uni-font-size-lg + 10;
		padding: 20upx 0;
	}
	.m-table{
		margin-bottom: $uni-font-size-lg + 60 ;
		box-sizing: border-box;
		width: 100%;
		padding: 10upx;
		overflow: auto;
		$border-color:#eee;
		.m-title{
			position: sticky;
			top: 0;
			background: #FFFFFF;
			z-index: 10;
			padding: 0;
		}
		.m-row{
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			.m-td,.m-th{
				box-sizing: border-box;
				flex:1;
				padding: 35upx 10upx;
				font-size: $uni-font-size-lg - 3;
				text-align: center;
				border-top: solid 1px $border-color;
				border-left: solid 1px $border-color;
			}
			.m-td:first-child,.m-th:first-child{
				background-color: #CCCCCC;
			}
			.m-td:last-child,.m-th:last-child{
				border-right: solid 1px $border-color;
			}
		}
		.m-row:last-child{
			.m-td,.m-th{
				border-bottom: solid 1px $border-color;
			}
		}
		
	}
	.m-btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		padding: 25upx 0;
		background: $main-base-color;
		color: #FFFFFF;
		font-size: $uni-font-size-lg + 10;

	}
</style>
