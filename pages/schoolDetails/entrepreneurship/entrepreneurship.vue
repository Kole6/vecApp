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
							<view class="qiun-new">
								<view class="new-tip">
									<text>就业占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie" id="canvasPie1" class="charts" @touchstart="touchPie"></canvas>
								</view>
							</view>
							<view class="qiun-new">
								<view class="new-tip">
									<text>创业占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie2" id="canvasPie2" class="charts" @touchstart="touchPie2"></canvas>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="qiun-columns">
							<view class="qiun-new">
								<view class="new-tip">
									<text>就业占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie3"  class="charts"></canvas>
								</view>
							</view>
							<view class="qiun-new">
								<view class="new-tip">
									<text>创业占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie4"  class="charts"></canvas>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="qiun-columns">
							<view class="qiun-new">
								<view class="new-tip">
									<text>就业占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie5"  class="charts" ></canvas>
								</view>
							</view>
							<view class="qiun-new">
								<view class="new-tip">
									<text>创业占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie6"  class="charts"></canvas>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="no-data">
			<image src="../../../static/no_data.png" mode="aspectFill" />
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
	var canvaPie3 = null;
	var canvaPie4 = null;
	var canvaPie5 = null;
	var canvaPie6 = null;
	
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
				canvaPie = _self.showPie("canvasPie", Pie);
				canvaPie2 = _self.showPie2("canvasPie2", Pie2);
				canvaPie3 = _self.showPie("canvasPie3", Pie);
				canvaPie4 = _self.showPie2("canvasPie4", Pie2);
				canvaPie5 = _self.showPie("canvasPie5", Pie);
				canvaPie6 = _self.showPie2("canvasPie6", Pie2);
			
			},
			showPie(canvasId, chartData) {
				let pie =  new uCharts({
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
				return pie;
			},
			showPie2(canvasId, chartData) {
				let pie = new uCharts({
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
				return pie;
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
		align-items: center;
		.qiun-new{
			width: 730upx;
			z-index: 999;
			background:rgba(255,255,255,1);
			min-height: 300upx;
			box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
			border-radius:33upx;
			margin: 20upx 0;
			.new-tip{
				font-size: 22upx;
				text-align: center;
				position: absolute;
				padding: 9upx 34upx;
				margin-top: -14upx;
				margin-left: 80upx;
				color: #fff;
				background: url('../../../static/p601.png') no-repeat;
				background-size: 100% 50upx;
			}
			.qiun-charts{
				.charts-man{
					height: 400upx;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					color: #666;
					font-size: 30upx;
					.male{
						margin:0 90upx;
						image{
							width: 191upx;
							height: 206upx;
						}
						.persent{
							color: #3FA1FF;
						}
					}
					.female{
						margin:0 90upx;
						image{
							width: 150upx;
							height: 189upx;
							padding-bottom: 17upx;
						}
						.persent{
							color: #FC6C6D;
						}
					}
				}
				.charts{
					width: 720upx;
					height: 500upx;
					margin-top: 14upx;
				}
			}
			
		}
	}
</style>
