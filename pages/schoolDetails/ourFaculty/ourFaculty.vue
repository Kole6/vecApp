<template>
	<view class="content">
		<view class="have-data" v-if="haveData">
			<QSTabs ref="tabs" :current="current" :tabs="tabs" width="375" swiperWidth="750" activeColor="#6451FC"
			 backgroundColor="#fff" @change="change($event)" />
			<swiper :style="{height:`${scrollH-83}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="qiun-columns">
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">教师性别占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie" id="canvasPie1" class="charts" @touchstart="touchPie"></canvas>
							</view>
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">专职兼职教师占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie2" id="canvasPie2" class="charts" @touchstart="touchPie2"></canvas>
							</view>
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">教师学历占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie3" id="canvasPie3" class="charts" @touchstart="touchPie3"></canvas>
							</view>
							<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
								<view class="qiun-title-dot-light">教师年龄占比</view>
							</view>
							<view class="qiun-charts">
								<canvas canvas-id="canvasPie4" id="canvasPie4" class="charts" @touchstart="touchPie4"></canvas>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<label>
							时建国
						</label>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
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
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				haveData: true,
				tabs: ["教师分类", "骨干名师"],
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
						"name": "男教师",
						"data": 40
					}, {
						"name": "女教师",
						"data": 60
					}]
				};
				let Pie2 = {
					series: [{
						"name": "专职教师",
						"data": 72
					}, {
						"name": "兼职教师",
						"data": 28
					}]
				};
				let Pie3 = {
					series: [{
						"name": "本科",
						"data": 23
					}, {
						"name": "硕士",
						"data": 77
					},{
						"name": "博士",
						"data": 17
					}, {
						"name": "其他",
						"data": 28
					}]
				};
				let Pie4 = {
					series: [{
						"name": "35岁以下",
						"data": 90
					}, {
						"name": "35-45岁",
						"data": 50
					},{
						"name": "45-55岁",
						"data": 57
					}, {
						"name": "55岁以上",
						"data": 14
					}]
				};
				_self.showPie("canvasPie", Pie);
				_self.showPie2("canvasPie2", Pie2);
				_self.showPie3("canvasPie3", Pie3);
				_self.showPie4("canvasPie4", Pie4);
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: ['#69b8ff', '#fd7677', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
					type: 'ring',
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
					colors: ['#3fa1ff', '#3ecbcb', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
					type: 'ring',
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
			showPie3(canvasId, chartData) {
				canvaPie3 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: ['#3fa1ff', '#3ecbcb', '#50cb74', '#fbd444', '#8543e0', '#90ed7d'],
					type: 'ring',
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
			showPie4(canvasId, chartData) {
				canvaPie4 = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: ['#3fa1ff', '#3ecbcb', '#50cb74', '#fbd444', '#8543e0', '#90ed7d'],
					type: 'ring',
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
			touchPie3(e) {
				canvaPie3.showToolTip(e, {
					format: function(item) {
						console.log(item.name + ':' + item.data);
						return item.name + ':' + item.data
					}
				});
			},
			touchPie4(e) {
				canvaPie4.showToolTip(e, {
					format: function(item) {
						console.log(item.name + ':' + item.data);
						return item.name + ':' + item.data
					}
				});
			},
			change(index) {
				this.current = index;
			},
			swiperChange({
				detail: {
					current
				}
			}) {
				this.current = current;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
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
