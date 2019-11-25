<template>
	<view class="wy-table">
		<view class="table-th">
			<view class="td">项目名称</view>
			<view class="td">项目种类</view>
			<view class="td">奖助范围</view>
		</view>
		<view class="table-tr">
			<view class="td">天津市中等职业学校国家助学金</view>
			<view class="td">助学金</view>
			<view class="td">国家级</view>
		</view>
		<view class="table-tr">
			<view class="td">天津市中等职业学校国家助学金</view>
			<view class="td">助学金</view>
			<view class="td">国家级</view>
		</view>
		<view class="table-tr">
			<view class="td">天津市中等职业学校国家助学金</view>
			<view class="td">助学金</view>
			<view class="td">国家级</view>
		</view>
		<view class="table-tr">
			<view class="td">天津市中等职业学校国家助学金</view>
			<view class="td">助学金</view>
			<view class="td">国家级</view>
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
	.wy-table {
		background-color: #fff;
		.table-th,.table-tr{
			width: 750upx;
			min-height: 100upx;
			text-align: center;
			display: flex;
			align-items: center;
		}
		.table-th{
			border-bottom: 1px solid #ddd;
			border-top: 1px solid #ddd;
			font-size:32upx;
			color: #333;
		}
		.table-tr{
			border-bottom: 1px solid #eee;
			font-size:26upx;
			line-height: 38upx;
			color: #666;
			&:nth-child(2n+1){
				background:rgba(247,247,247,1);
			}
		}
		.td{
			margin: 10upx;
			&:nth-child(1){
				width: 300upx;
			}
			&:nth-child(2){
				width: 210upx;
			}
			&:nth-child(3){
				width: 170upx;
			}
		}
	}
</style>
