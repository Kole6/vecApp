<template>
	<view class="list-wrapper">
		<view class="item" @tap="handleTap(item)" v-for="(item,index) in listArr" :key="index">
			<view class="left">item.src</view>
			<view class="right">
				<view class="title">
					<view class="image"></view>
					<text>{{item.name}}</text>
				</view>
				<view class="tag">
					<text class="special">{{item.hasDownloaded}}</text>
					人已下载|
					<text>{{item.fileSize}}</text>
					|
					<text class="special">{{item.other}}</text>
					有据点
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			listArr:Array
		},
		data(){
			return{
				
			}
		},
		methods:{
			handleTap(){
				uni.navigateTo({
					url:'./FileDetail'
				})
				// this.$emit()
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.list-wrapper{
		padding: 20upx 50upx;
		.item{
			display: flex;
			align-items: center;
			margin-bottom: 20upx;
			.left{
				width: 200upx;
				height: 160upx;
				background: #eee;
				margin-right: 20upx;
			}
			.right{
				.title{
					font-size: $uni-font-size-lg;
					margin-bottom: 20upx;
					.image{
						display: inline-block;
						width: 40upx;
						height: 40upx;
						background: #FF0000;
						vertical-align: middle;
					}
				}
				.tag{
					font-size: $uni-font-size-base;
					.special{
						color: #007AFF;
					}
				}
			}
		}
	}
</style>
