<template>
	<view class="">
		<view class="category">
			<view @tap="handleTap(item)" class="item" v-for="(item,index) in categoryArr" :key="index">
				<image class="ipc" :src="item.IPC" mode="widthFix"></image>
				<view class="right">
					<view class="item-name">{{item.name}}</view>
					<view class="item-desc">{{item.desc}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				categoryArr:[
					{
						name:'天津市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},{
						name:'北京市',
						desc:'45所高职',
						IPC:'../../../static/indexIcon/city.png'
					},
				]
			}
		},
		methods:{
			handleTap(item){
				uni.navigateTo({
					url:'./GaozhiPageDetail?province='+item.name,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.category{
		box-sizing: border-box;
		padding-top: 20upx;
		.item{
			width: 50%;
			box-sizing: border-box;
			padding: 15upx 0 20upx 30upx;
			display: inline-block;
			background: #FFFFFF;
			border-bottom: solid 1upx #EEEEEE;
			.ipc{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				vertical-align: middle;
			}
			.right{
				display: inline-block;
				vertical-align: middle;
				padding-left: 10upx;
				.item-name{
					font-size: 40upx;
				}
				.item-desc{
					font-size: 35upx;
					margin-top: 20upx;
				}
			}
		}
		.item:nth-of-type(2n+1){
			border-right: solid 1upx #EEEEEE;
		}
		
	}
</style>
