<template>
	<view class="">
		<view class="m-card">
			<view :class="['card-item', activeIndex == 1 ? 'active' : '']" @tap="handleTab(1)">我的关注</view>
			<view :class="['card-item', activeIndex == 2 ? 'active' : '']" @tap="handleTab(2)">专业学生分布</view>
		</view>
		<block v-if="activeIndex === 1">
			<my-follow></my-follow>
		</block>
		<block v-if="activeIndex === 2">
			<profession-student></profession-student>
		</block>
	</view>
</template>

<script>
import myFollow from './MyFollow.vue'
import professionStudent from './Part2.vue'
export default {
	components:{myFollow,professionStudent},
	data() {
		return {
			activeIndex:1,
			
		};
	},
	methods:{
		handleTab(tabIndex){
			this.activeIndex = tabIndex
		}
	}
};
</script>

<style lang="scss" scoped>
.m-card {
	display: flex;
	justify-content: space-between;
	align-content: center;
	padding: 0 110upx;
	background: #ffffff;
	.card-item {
		box-sizing: border-box;
		padding: 21upx 10upx;
		font-size: $uni-font-size-lg;
		color: $main-text-color;
	}
	.card-item.active {
		border-bottom: solid 4upx $main-base-color;
		color: $main-base-color;
	}
}
</style>
