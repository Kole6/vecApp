<template>
	<view class="">
		<!-- 高职院校 -->
		<QSTabs ref="tabs" :current="current" :tabs="tabs" width="375" swiperWidth="750" activeColor="#6451FC"
		 backgroundColor="#fff" @change="change($event)" />
		<swiper :style="{height:`${scrollH-85}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
			<swiper-item v-for="item in 3" :key="item">
				<view class="">item</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import myFollow from './MyFollow.vue'
import professionStudent from './Part2.vue'
import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
export default {
	components:{myFollow,professionStudent,QSTabs},
	data() {
		return {
			tabs: ["本市", "本省","全国"],
			current:0,
		};
	},
	computed: {
		scrollH() {
			let sys = uni.getSystemInfoSync();
			let winWidth = sys.windowWidth;
			let winrate = 750 / winWidth;
			let winHeight = parseInt(sys.windowHeight * winrate)
			return winHeight
		}
	},
	methods:{
		change(index){
			this.current = index;
		},
		swiperChange({detail: { current }}) {
			this.current = current;
		},
		transition({detail: { dx }}) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({detail: { current }}) {
			this.$refs.tabs.setFinishCurrent(current);
		},
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
