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
				categoryArr:[]
			}
		},
		mounted(){
			this.getData()
		},
		methods:{
			handleTap(item){
				uni.navigateTo({
					url:`./GaozhiPageDetail?province=${item.name}&provinceId=${item.provinceid}`,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			getData(){
				this.$HTTP({
					url:'/zjq/College/GetYxsl',
					header:'form',
					data:{
						token: uni.getStorageSync('token'),
						region:'',
						pageIndex:1,
						pageSize:100,
					}
				}).then(res=>{
					if(res.code == 0){
						let data = res.data.map(item=>{
							return{
								...item,
								desc:item.number+'所高职',
								name:item.provincename,
								IPC: '../../../static/indexIcon/city.png',	
								// IPC: item.ipc
							}
						})
						this.categoryArr = data;
					}
				})
			},
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
			border-right: solid 1upx $main-dividing-line1;
		}
		.item:nth-of-type(1),.item:nth-of-type(2){
			border-top: solid 1upx $main-dividing-line1;
		}
		
	}
</style>
