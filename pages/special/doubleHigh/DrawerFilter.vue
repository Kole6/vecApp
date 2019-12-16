<template>
	<uni-drawer :visible="isShow" mode="right" @close="handleEmit('close')">
		<!-- <view class="m-title">筛选标签</view> -->
		<!-- 筛选项 -->
		<view class="m-drawer-content">
			<view class="item-list" v-for="(item, index) in tagList" :key="index">
				<view class="item-title" @click="handleClick(item,index)">
					<text >{{ item.title? item.title.name:'暂无标题' }}</text>
					<uni-icons
					  :type="item.title.isShow?'arrowup':'arrowdown'"/>
				</view>
				<view class="item-wrapper" v-show="item.title.isShow">
					<text v-for="(tag, i) in item.list" :key="i" :class="{ item: true, selected: tag.selected }" @tap="handleItemTap(item,index,tag,i)">{{ tag.name }}</text>
				</view>
			</view>
		</view>
		<view class="m-btn-group">
			<view class="left-btn" @tap="handleEmit('reset')">重置</view>
			<view class="right-btn" @tap="handleEmit('confirm')">确定</view>
		</view>
	</uni-drawer>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniIcons from '@/components/uni-icons/uni-icons';
export default {
	components: { uniDrawer ,uniIcons },
	props:{
		isShow:{
			type:Boolean,
			default:false,
		},
		tagList:Array,
	},
	data() {
		return {};
	},
	methods:{
		//app 内无法直接操作对象，只能通过传出事件在外部进行解决
		handleItemTap(item,itemIndex,tag,tagIndex){
			this.$emit('IClick',{item,itemIndex,tag,tagIndex})
		},
		handleClick(item,index){
			this.$emit('CClick',{item,index})
		},
		handleEmit(eventString){
			this.$emit(eventString)
		},
	}
};
</script>

<style lang="scss" scoped>
	.m-drawer-content {
		height: 100vh;
		overflow: auto;
		box-sizing: border-box;
		padding-top: 60upx ;
		padding-bottom: 50upx + $uni-font-size-lg;
		background: #ffffff;
		.item-list {
			box-sizing: border-box;
			font-size: $uni-font-size-base;
			padding-bottom: 20upx;
			.item-title {
				padding: 0 46upx;
				font-size: $uni-font-size-lg;
				height: 40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $main-text-color;
				border-bottom: solid 1upx $main-dividing-line1;
			}
			.item-wrapper {
				padding-left: 90upx;
				border-bottom: solid 1upx $main-dividing-line1;
			}
			.item {
				display: inline-block;
				padding: 10upx 20upx;
				margin-right: 20upx;
				margin-top: 20upx;
				background: #fff;
				color: #333;
				border: solid 1upx $main-border-light-color;
				border-radius: 10upx;
			}
			.item.selected {
				color: #ffffff;
				background: $main-base-color;
			}
		}
	}
	.m-btn-group {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: #ffffff;
		z-index: 10;
		.left-btn,
		.right-btn {
			box-sizing: border-box;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			font-size: $uni-font-size-lg;
			width: 50%;
			padding: 25upx 0;
			border-top: solid 1upx #ccc;
		}
		.left-btn {
			border-right: solid 1upx #ccc;
		}
		.right-btn {
			background: $main-base-color;
			color: #ffffff;
		}
	}
</style>
