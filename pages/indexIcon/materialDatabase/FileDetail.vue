<template>
	<view class="">
		<!-- 标题 -->
		<view class="m-top">
			<view class="title">2018年中国大学学科评估结果和双一流数据库(全)</view>
			<view class="desc"><text class="special">216</text> 人已下载</view>
		</view>
		<!-- 文档简介 -->
		<view class="m-desc">
			<view class="title">
				文档简介
			</view>
			<view class="top">
				<view class="item">
					<text>文档类型 : </text>
					<text>xls</text>文件
				</view>
				<view class="item">
					<text>来源 : </text>
					<text>辽宁郑老师整理提供</text>
				</view>
				<view class="item">
					<text>发布时间 : </text>
					<text>2019-04-30</text>
				</view>
				<view class="item">
					<text>类型 : </text>
					<text>院校&专业</text>
				</view>
			</view>
			<view class="bottom">
				<text>教育部第四轮学科评估结果,和双一流学科评定结果,是评估各所大学优秀在专业在全国院校中地位的官方数据!相当于官方出文说明哪些大学好,哪些专业好</text>
			</view>
		</view>
		<!-- 文档简洁(部分) -->
		<view class="m-desc-bottom">
			<view class="title">
				文档简介<text class="tips">(部分)</text>
			</view>
			<view class="content">
				<view class="image"></view>
			</view>
		</view>
		<view class="m-btn-group">
			<view class="btn down">下载文件</view>
			<view class="btn share" @tap="handleShare">分享给好友</view>
		</view>
		<uni-popup ref="share" :type="type" :custom="true" @change="change">
			<view class="uni-share">
				<view class="uni-share-title">分享到</view>
				<view class="uni-share-content">
					<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box">
						<view class="uni-share-content-image">
							<image :src="item.icon" class="image" />
						</view>
						<view class="uni-share-content-text">{{ item.text }}</view>
					</view>
				</view>
				<view class="uni-share-btn" @click="cancel('share')">取消分享</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components:{uniPopup,uniIcons},
		data(){
			return{
				type:'bottom',
				bottomData: [{
						text: '微信',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						name: 'wx'
					},
					{
						text: '支付宝',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						name: 'qq'
					},
					{
						text: '新浪',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
						name: 'sina'
					},
					{
						text: '百度',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
						name: 'copy'
					},
					{
						text: '其他',
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						name: 'more'
					}
				]
			}
		},
		onLoad(options) {
			console.log(options)
		},
		mounted(){
		},
		methods:{
			change(e){
				console.log(e)
			},
			cancel(){
				this.$refs['share'].close()
			},
			handleShare(){
				this.$refs['share'].open()
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 页面整体样式 */
	.m-top{
		padding: 25upx;
		margin-bottom: 20upx;
		background: #FFFFFF;
		.title{
			font-size: $uni-font-size-lg + 5;
		}
		.desc{
			margin-top: 15upx;
			font-size: $uni-font-size-base;
			.special{
				color: #007AFF;
			}
		}
	}
	.m-desc{
		padding: 10upx 20upx;
		background: #FFFFFF;
		.title{
			font-size: $uni-font-size-lg;
			font-weight: bold;
			padding-left: 30upx;
			border-left: solid 5upx #47AAB5;
			vertical-align: middle;
			margin: 20upx 0;
		}
		.top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			background: #D7F3F6;
			padding: 15upx;
			.item{
				font-size: $uni-font-size-base;
				line-height: 1.6;
				color: #A8B6BC;
				width: calc(50% - 4upx);
			}
		}
		.bottom{
			margin-top: 15upx;
			font-size: $uni-font-size-base;
			color: #A8B6BC;
		}
	}
	.m-desc-bottom{
		padding: 10upx 20upx;
		background: #FFFFFF;
		margin-top: 15upx;
		margin-bottom: 82upx;
		.title{
			font-size: $uni-font-size-lg;
			font-weight: bold;
			padding-left: 30upx;
			border-left: solid 5upx #47AAB5;
			vertical-align: middle;
			margin: 20upx 0;
		}
		.content{
			.image{
				width: 100%;
				min-height: 400upx;
				background-color: $main-base-color;
				padding-bottom: 20upx;
			}
		}
	}
	.m-btn-group{
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		.btn{
			box-sizing: border-box;
			width: 50%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		.down,.share{
			font-size: $uni-font-size-lg;
			padding: 25upx 40upx;
			background-color: #FFFFFF;
			border: solid 3upx $main-border-light-color;
		}
	}
	/* 底部分享 */
	.uni-share {
		background: #fff;
	}
	
	.uni-share-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
		text-align: center;
	}
	
	.uni-share-content {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
	}
	
	.uni-share-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		box-sizing: border-box;
	}
	
	.uni-share-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60upx;
		height: 60upx;
		overflow: hidden;
		border-radius: 10upx;
	}
	
	.uni-share-content-image .image {
		width: 100%;
		height: 100%;
	}
	
	.uni-share-content-text {
		font-size: 26upx;
		color: #333;
		padding-top: 5px;
		padding-bottom: 10px;
	}
	
	.uni-share-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
		text-align: center;
		color: #666;
	}
</style>
