<template>
	<view class="wy-table">
		<view class="table-th">
			<view class="td">项目名称</view>
			<view class="td">项目种类</view>
			<view class="td">奖助范围</view>
		</view>
		<view class="table-tr" v-for="(item,i) of listArr" :key="i">
			<view class="td">{{item.projectname0}}</view>
			<view class="td">{{item.type0}}</view>
			<view class="td">{{item.range0}}</view>
		</view>
		<view class="table-null" v-show="listArr.length==0">无数据</view>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.sid = e.sid;
			this.apiGetSchoolarships()
		},
		data() {
			return {
				sid:'',
				listArr:[]
			};
		},
		methods:{
			apiGetSchoolarships(){
				this.$http({
					url: '/zjq/College/GetSchoolarships',
					header: 'form',
					data: {
						sid: this.sid,
						token: uni.getStorageSync('token')
					}
				}).then((res) => {
					if (res.code == 0) {
						this.listArr = res.data
					} else {
						uni.showToast({
							icon: "none",
							title: res.message
						});
					}
				})
			}
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
