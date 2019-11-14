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
							<table>
								<tr>
									<th>项目名称</th>
									<th>级别</th>
									<th>表彰日期</th>
								</tr>
								<tr>
									<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
									<td>一等奖</td>
									<td>2019</td>
								</tr>
								<tr>
									<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
									<td>一等奖</td>
									<td>2019</td>
								</tr>
								<tr>
									<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
									<td>一等奖</td>
									<td>2019</td>
								</tr>
							</table>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="wy-table">
						<table>
							<tr>
								<th>项目名称</th>
								<th>级别</th>
								<th>表彰日期</th>
							</tr>
							<tr>
								<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
								<td>一等奖</td>
								<td>2019</td>
							</tr>
							<tr>
								<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
								<td>一等奖</td>
								<td>2019</td>
							</tr>
							<tr>
								<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
								<td>一等奖</td>
								<td>2019</td>
							</tr>
						</table>
					</view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="wy-table">
						<table>
							<tr>
								<th>项目名称</th>
								<th>级别</th>
								<th>表彰日期</th>
							</tr>
							<tr>
								<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
								<td>一等奖</td>
								<td>2019</td>
							</tr>
							<tr>
								<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
								<td>一等奖</td>
								<td>2019</td>
							</tr>
							<tr>
								<td>第十一届全国中等职业学校“文化风采”竞赛获优秀组织奖</td>
								<td>一等奖</td>
								<td>2019</td>
							</tr>
						</table>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="no-data">
			<image src="../../../static/no_data.png" mode="aspectFill"></image>
			<p>你目前还没有关注的学校哦～</p>
		</view> -->
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
				tabs: ["2018-2019学年", "2017-2018学年","2016-2017学年"],
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
	page {
		background-color: #fff;
		font-size: 28upx;
	}
	
	.wy-table {
		table {
			width: 100%;
			border-collapse: collapse;
			text-align: center;
		}
	
		table td {
			border: 1px solid #cad9ea;
			color: #666;
			padding: 15upx 20upx;
			min-width: 120upx;
	
		}
	
		table th {
			border: 1px solid #cad9ea;
			padding: 15upx 20upx;
			color: #fff;
			background-color: #199ED8;
			min-width: 120upx;
	
		}
	
		table thead th {
			// background-color: #cce8eb;
			background-color: #199ED8;
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

	.no-data {
		image {
			width: 444upx;
			height: 374upx;
			margin-top: 200upx;
			text-align: center;
		}

		p {
			text-align: center;
			margin-top: 10upx;
			font-size: 30upx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			font-family: PingFangSC-Regular, PingFang SC;
			line-height: 40px;
		}
	}
</style>
