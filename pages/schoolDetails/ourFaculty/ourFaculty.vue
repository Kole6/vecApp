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
							<view class="qiun-new">
								<view class="new-tip">
									<text>教师性别占比</text>
								</view>
								<view class="qiun-charts">
									<view class="charts-man">
										<view class="male">
											<image src="../../../static/p602.png" mode="aspectFill"></image>
											<p>男教师 <span class="persent">40%</span></p>
										</view>
										<view class="female">
											<image src="../../../static/p603.png" mode="aspectFill"></image>
											<p>女教师 <span class="persent">60%</span></p>
										</view>
									</view>
								</view>
							</view>
							<view class="qiun-new">
								<view class="new-tip">
									<text>专职兼职教师占比</text>
								</view>
								<view class="qiun-charts">
									<canvas class="charts" canvas-id="canvasPie2" id="canvasPie2" @touchstart="touchPie2"></canvas>
								</view>
							</view>
							<view class="qiun-new">
								<view class="new-tip">
									<text>教师学历占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie3" id="canvasPie3" class="charts" @touchstart="touchPie3"></canvas>
								</view>
							</view>
							<view class="qiun-new">
								<view class="new-tip">
									<text>教师年龄占比</text>
								</view>
								<view class="qiun-charts">
									<canvas canvas-id="canvasPie4" id="canvasPie4" class="charts" @touchstart="touchPie4"></canvas>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="m-list" v-for="(item,index) in dataArr" :key="index">
							<view class="avatar">{{item.teachername.substr(0,1)}}</view>	
							<view class="name">{{item.teachername}}</view>
							<view class="position">
								<text v-for="(tag,i) in item.tags" :key="i">
									{{tag}}
								</text>
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
				serverData: '',
				dataArr:[
					{
						teachername:'时志福',
						tags:['国家级名师']
					},
					{
						teachername:'潘宏义',
						tags:['国家级名师']
					},
					{
						teachername:'杨道德',
						tags:['副校长','国家级名师']
					}
				]
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
		align-items: center;
		.qiun-new{
			width: 730upx;
			z-index: 999;
			background:rgba(255,255,255,1);
			box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
			border-radius:33upx;
			margin: 20upx 0;
			min-height: 300upx;
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
	
	
	.m-list{
		padding: 10upx 30upx;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-bottom: solid 1upx $main-dividing-line1;
		font-size: $uni-font-size-lg;
		&:first-child{
			border-top: solid 1upx $main-dividing-line1;
		}
		.avatar{
			box-sizing: border-box;
			display: inline-flex;
			width:120upx;
			height:120upx;
			border-radius: 60upx;
			background: #FFFFFF;
			border: solid 1px #68BCF5;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			font-size: 45upx;
			color: #fff;
			background-color: #68BCF5;
		}
		.name{
			margin-left: 20upx;
			font-size: $uni-font-size-lg;
			color: $main-text-color;
		}
		.position{
			text{
				margin-left: 20upx;
				box-sizing: border-box;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				padding: 2upx 11upx;
				border-radius: 5upx;
				background: #6451FC;
				color: #FFFFFF;
				// border: solid 1upx $main-base-color;
				font-size: $uni-font-size-base;				
			}
		}
	}
</style>
