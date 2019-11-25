<template>
	<view class="content">
		<view class="have-data" v-if="haveData">
			<QSTabs ref="tabs" :current="current" :tabs="tabs" width="250" swiperWidth="750" activeColor="#6451FC"
			 backgroundColor="#fff" @change="change($event)" />
			<swiper :style="{height:`${scrollH-83}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="wy-table">
							<view class="table-th">
								<view class="td">项目名称</view>
								<view class="td">级别</view>
								<view class="td">表彰日期</view>
							</view>
							<view class="table-tr">
								<view class="td">第十三届全国中等职业学校“文化风采”优秀组织大赛</view>
								<view class="td">一等奖</view>
								<view class="td">2019</view>
							</view>
							<view class="table-tr">
								<view class="td">第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
							<view class="table-tr">
								<view class="td">第十二届全国中等职业学校“文化风采”竞赛获优秀组织奖</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
							<view class="table-tr">
								<view class="td">机器人大赛</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="wy-table">
							<view class="table-th">
								<view class="td">项目名称</view>
								<view class="td">级别</view>
								<view class="td">表彰日期</view>
							</view>
							<view class="table-tr">
								<view class="td">第十三届全国中等职业学校“文化风采”优秀组织大赛</view>
								<view class="td">一等奖</view>
								<view class="td">2019</view>
							</view>
							<view class="table-tr">
								<view class="td">第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
							<view class="table-tr">
								<view class="td">第十二届全国中等职业学校“文化风采”竞赛获优秀组织奖</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="wy-table">
							<view class="table-th">
								<view class="td">项目名称</view>
								<view class="td">级别</view>
								<view class="td">表彰日期</view>
							</view>
							<view class="table-tr">
								<view class="td">第十三届全国中等职业学校“文化风采”优秀组织大赛</view>
								<view class="td">一等奖</view>
								<view class="td">2019</view>
							</view>
							<view class="table-tr">
								<view class="td">第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
							<view class="table-tr">
								<view class="td">第十二届全国中等职业学校“文化风采”竞赛获优秀组织奖</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
							<view class="table-tr">
								<view class="td">机器人大赛</view>
								<view class="td">一等奖</view>
								<view class="td">2018</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				haveData: true,
				tabs: ["全国技能大赛", "世界技能大赛","教学能力比赛"],
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
			}
		}
	}
</script>

<style scoped lang="scss">
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
				border-top: 20upx solid #F6F8FE;
			}
		}
	}
</style>
