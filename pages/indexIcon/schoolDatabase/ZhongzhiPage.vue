<template>
	<view class="">
		<view class="category" v-if="showCategory">
			<view @tap="handleTap(item)" class="item" v-for="(item,index) in categoryArr" :key="index">
				<view class="ipc">{{item.IPC}}</view>
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
				showCategory:true,
				categoryArr:[
					{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},{
						name:'北京市',
						desc:'45所中职',
						IPC:'IPC'
					},
				]
			}
		},
		methods:{
			handleTap(item){
				uni.navigateTo({
					url:'./ZhongzhiPageDetail?province='+item.name,
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.category{
		padding:30upx 0 0 50upx;
		.item{
			width: 50%;
			display: inline-block;
			margin-bottom: 30upx;
			.ipc{
				width: 120upx;
				height: 120upx;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				vertical-align: top;
				background: #F2F2F2;
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
		
	}
</style>
