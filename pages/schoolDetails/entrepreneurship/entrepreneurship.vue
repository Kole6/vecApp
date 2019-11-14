<template>
	<view class="content">
		<view class="have-data" v-if="haveData">
			<QSTabs ref="tabs" :current="current" :tabs="tabs" width="300" swiperWidth="750" activeColor="#6451FC"
			 backgroundColor="#fff" @change="change($event)" />
			<swiper :style="{height:`${scrollH-83}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="qiun-columns">
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">就业占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie" id="canvasPie1" class="charts" @touchstart="touchPie"></canvas>
							</view>
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">创业占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie2" id="canvasPie2" class="charts" @touchstart="touchPie2"></canvas>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="qiun-columns">
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">就业占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie" id="canvasPie1" class="charts" @touchstart="touchPie"></canvas>
							</view>
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">创业占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie2" id="canvasPie2" class="charts" @touchstart="touchPie2"></canvas>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="qiun-columns">
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">就业占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie" id="canvasPie1" class="charts" @touchstart="touchPie"></canvas>
							</view>
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">创业占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie2" id="canvasPie2" class="charts" @touchstart="touchPie2"></canvas>
							</view>
						</view>
					</scroll-view>
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
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaPie = null;
	var canvaPie2 = null;
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				haveData: true,
				tabs: ["2017-2018学年", "2016-2017学年","2015-2016学年"],
				current: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: ''
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
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
			getServerData() {
				let Pie = {
					series: [{
						"name": "就业率",
						"data": 80
					}, {
						"name": "未就业率",
						"data": 20
					}]
				};
				let Pie2 = {
					series: [{
						"name": "创业率",
						"data": 23
					}, {
						"name": "未创业率",
						"data": 77
					}]
				};
				_self.showPie("canvasPie", Pie);
				_self.showPie2("canvasPie2", Pie2);
			
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors:['#3ECBCB', '#E8E9E9', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			showPie2(canvasId, chartData) {
				canvaPie2 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors:['#3fa1ff', '#E8E9E9', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						console.log(item.name + ':' + item.data);
						return item.name + ':' + item.data
					}
				});
			},
			touchPie2(e) {
				canvaPie2.showToolTip(e, {
					format: function(item) {
						console.log(item.name + ':' + item.data);
						return item.name + ':' + item.data
					}
				});
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.have-data {
		border-top: 1px solid rgba(238, 238, 238, 1)
	}

	.swiper-item {
		background-color: #F7F7F7;
	}
	.qiun-padding {
		padding: 2%;
		width: 96%;
	}
	
	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	
	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}
	
	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}
	
	.qiun-common-mt {
		margin-top: 10upx;
	}
	
	.qiun-bg-white {
		background: #FFFFFF;
	}
	
	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}
	
	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}
	
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
