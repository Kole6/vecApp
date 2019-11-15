<template>
	<view class="list-content" :class="{'has':showBorder}" @tap="handleTap">
		<view class="left">
			{{item.title.substr(0,1)}}
		</view>
		<view class="right">
			<view class="title">
				{{item.title}}
			</view>
			<scroll-view v-if="showType == 2 || showType ==4"  scroll-x="true" style="white-space: nowrap;">
				<view class="tag tag-text"
				v-for="(tag,i) in item.tags" :key="i">
					<block >
						{{ tag.name + ':' + tag.value }}
					</block>
				</view>
			</scroll-view>
			<scroll-view v-if="showType == 4 || showType == 3" scroll-x="true" style="white-space: nowrap;">
				<block v-if="isSpecial">
					<view  class="tag tag-text" v-for="(card,index) in item.cards" :key="index">
							{{ card.name + ':' + card.value }}
					</view>
				</block>
				<block v-else>
					<view  class="card" v-for="(card,index) in item.cards" :key="index">
							{{card.name}}
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showType:{
				type:[Number,String],
				default:'1'
			},
			item:{
				type:Object,
				default(){
					return{}
				}
			},
			showBorder:{
				type:Boolean,
				default:true,
			},
			handleTaped:Boolean,
			url:String,
			// 是否特殊显示cards
			isSpecial:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			handleTap(){
				if(!this.handleTaped){
					this.$emit('taped',this.item)
					return;
				}
				if(this.url){
					
				}else{
					uni.navigateTo({
						url:'../../schoolDetails/SchoolDetail'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-content{
		padding: 30upx;
		&.has{
			border-bottom: solid 1px $main-dividing-line1;	
		}
		.left{
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
		.right{
			display: inline-block;
			width: calc(100% - 150upx);
			vertical-align: middle;
			margin-left: 20upx;
			font-size: $uni-font-size-lg;
			.title{
				color: #333333;
			}
			.tag,.card{
				display: inline-block;
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				border-radius: 10upx;
				border: solid 1px #FF750F;
				color: #666666;
				margin: 10upx  10upx 0 10upx;
			}
			.card{
				color: #FF750F;;
			}
			.tag.tag-text {
				display: inline-block;
				font-size: $uni-font-size-base;
				padding: 0 10upx;
				margin: 0;
				border-radius: 0;
				border: none;
				border-right: solid 1px $uni-border-color;
			}
			.tag.tag-text:last-child {
				border: none;
			}
		}
	}
</style>
