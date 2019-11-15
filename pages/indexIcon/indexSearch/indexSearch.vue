<template>
	<view class="content">
		<view class="search">
			<uni-search-bar radius="100" clearButton="left" @confirm="search" placeholder=" 学校 / 人名 / 专业 "/>
		</view>
		<view class="have-data">
			<QSTabs ref="tabs" :current="current" :tabs="tabs" width="250" swiperWidth="750" activeColor="#6451FC"
			 backgroundColor="#fff" @change="change($event)" />
			<swiper :style="{height:`${scrollH - 200}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view v-for="(ite, ind) in 30" :key="ind" class="sc-it" hover-class="navigator-hover" @tap="toSchoolDetail()">
							上海电子职业技术学院{{ind+1}}
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view v-for="(ite, ind) in 30" :key="ind" class="sc-it" hover-class="navigator-hover" @tap="toSchoolDetail()">
							计算机应用专业{{ind+1}}
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view v-for="(ite, ind) in 30" :key="ind" class="sc-it" hover-class="navigator-hover" @tap="toSchoolDetail()">
							计算机应用专业{{ind+1}}
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			uniSearchBar,
			QSTabs
		},
		data() {
			return {
				tabs: ["全部","学校", "专业"],
				current: 0
			}
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
		methods: {
			search(res) {
				uni.showModal({
					content: '搜索：' + res.value,
					showCancel: false
				})
			},
			change(index) {
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
		},
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.search{
		// border-top: 1px solid rgb(238,238,238);
		padding: 0 32upx;
	}
	.have-data {
		border-top: 1px solid rgba(238, 238, 238, 1)
	}
	.swiper-item {
		background-color: #fff;
		.sc-it {
			background-color: #fff;
			border-bottom: 8upx solid #F6F8FE;
			height: 100upx;
			font-size: 28upx;
			line-height: 100upx;
			padding-left: 30upx;
	
			&:first-child {
				border-top: 17upx solid #F6F8FE;
			}
		}
	}
</style>
