<template>
	<view class="content">
		<!-- <view class="have-data" v-if="haveData">
			
		</view> -->
		<view class="no-data">
			<image src="/static/no_data.png" mode="aspectFill" />
			<p>你目前还没有关注的学校哦～</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return { 
				haveData:true
			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	page {  
	    width: 100%;  
	    height: 70%;  
	    display: flex;  
	    align-items: center;  
		justify-content: center;
	}
	// .have-data{
	// 	border-top:1px solid rgba(238,238,238,1);
	// 	width: 750upx;
	// 	height:88upx;
	// 	background-color: #fff;
	// }
	.no-data {
		image{
			width: 444upx;
			height: 374upx;
			margin-top: 200upx;
			text-align: center;
		}
		p{
			text-align: center;
			margin-top: 10upx;
			font-size:30upx;
			font-weight:400;
			color:rgba(153,153,153,1);
			font-family:PingFangSC-Regular,PingFang SC;
			line-height:40px;
		}
	}
</style>
