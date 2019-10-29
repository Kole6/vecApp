<template>
	<view class="list">
		<view class="list-item" 
			v-for="(item,index) in listArr" 
			:key="index">
			<view class="left">
				{{item.title.substr(0,1)}}
			</view>
			<view class="right">
				<view class="">
					{{item.title}}
				</view>
				<scroll-view  scroll-y="true" >
					<view class="tag"
					v-for="(tag,i) in item.tags" :key="i">
						{{tag.name}}
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			listArr:{
				type:Array,
				required:true,
			}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-item{
		padding: 30upx;
		border-bottom: solid 1px $uni-border-color;
		.left{
			display: inline-flex;
			width:120upx;
			height:120upx;
			border-radius: 60upx;
			background: #4CD964;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			font-size: 50upx;
		}
		.right{
			display: inline-block;
			width: 550upx;
			vertical-align: middle;
			margin-left: 20upx;
			.tag{
				display: inline-block;
				font-size: 20upx;
				padding: 5upx 10upx;
				border-radius: 10upx;
				border: solid 1px #797979;
				margin: 10upx  10upx 0 10upx;
			}
		}
	}
</style>
