<template>
	<view class="">
		<view class="m-list" v-for="(item,index) in dataArr" :key="index">
			<view class="avatar">{{item.name.substr(0,1)}}</view>	
			<view class="name">{{item.name}}</view>
			<view class="position">
				<text v-for="(tag,i) in item.tags" :key="i">
					{{tag.name}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				dataArr:[
					{
						name:'时建国',
						tags:[
							{
								name:'党委书记'
							}
						]
					},
					{
						name:'潘启明',
						tags:[
							{
								name:'院长'
							}
						]
					}
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.m-list{
		padding: 10upx 20upx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-bottom: solid 1upx $main-dividing-line1;
		font-size: $uni-font-size-lg;
		&:first-child{
			border-top: solid 1upx $main-dividing-line1;
		}
		.avatar{
			box-sizing: border-box;
			display: inline-flex;
			width:120upx;
			height:120upx;
			border-radius: 60upx;
			background: #FFFFFF;
			border: solid 1px $main-base-color;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			font-size: 45upx;
			color: $main-base-color;
		}
		.name{
			margin-left: 20upx;
			font-size: $uni-font-size-lg;
			color: $main-text-color;
		}
		.position{
			text{
				margin-left: 20upx;
				box-sizing: border-box;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				padding: 2upx 11upx;
				border-radius: 5upx;
				background: #6451FC;
				color: #FFFFFF;
				// border: solid 1upx $main-base-color;
				font-size: $uni-font-size-base;				
			}
		}
	}
</style>
