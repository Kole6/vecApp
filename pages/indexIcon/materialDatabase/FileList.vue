<template>
	<view class="list-wrapper">
		<view class="item" @tap="handleTap(item)" v-for="(item,index) in listArr" :key="index">
			<view class="left">
				<block v-if="item.src">
					<image :src="item.src" mode="aspectFill" />
				</block>
				<block v-else>
					item.src
				</block>
			</view>
			<view class="right">
				<view class="title">
					<!-- <view class="image"></view> -->
					<text>{{item.name}}</text>
				</view>
				<view class="tag">
					<text>下载次数:<text class="tag-content">{{item.hasDownloaded}}</text> </text>|<text class="tag-content"></text>
					<text>文件大小:<text class="tag-content">{{item.fileSize}}</text> </text>
					
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
			handleTap(item){
				uni.navigateTo({
					url:`./FileDetail?fileId=${item.id}`
				})
				// this.$emit()
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.list-wrapper{
		// padding: 20upx 50upx;
		.item{
			display: flex;
			align-items: center;
			// margin-bottom: 10upx;
			padding: 20upx 30upx;
			background: #FFFFFF;
			border-bottom: solid 1upx $main-dividing-line1;
			.left{
				width: 172upx;
				height: 128upx;
				margin-right: 20upx;
				image{
					width: 172upx;
					height: 128upx;
					border-radius: 10upx;
				}
			}
			.right{
				.title{
					font-size: $uni-font-size-lg;
					margin-bottom: 10upx;
					color: $main-text-color;
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
					color: #999999;
					.tag-content{
						padding: 0 10upx;
					}
				}
			}
		}
	}
</style>
