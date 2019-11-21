<template>
	<view>
		<view class="m-top">
			<view class="content">
				<view class="left">
					<view class="item">北京电子科技职业技术学院</view>
					<view class="item">北京电子科技职业技术学院</view>
					<view class="item">北京电子科技职业技术学院</view>
					<view class="item">北京电子科技职业技术学院</view>
				</view>
				<view class="right"><image src="../../../static/indexIcon/pk-vs.png" mode="aspectFit" style="width: 183upx; height: 106upx;"></image></view>
			</view>
		</view>
		<view class="m-title"><text>学校对比信息</text></view>
		<!-- <view class="m-radar">
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @touchstart="touchPie($event, 'canvasRadar')"></canvas>
		</view> -->
		<view class="m-table">
			<!-- <view class="f-o">
			<image src="../../../static/indexIcon/selected.png" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
			<text>自动隐藏相同信息</text>
		</view> -->
			<view class="t-table" :style="{ height: tableHeight, width: tableWidth }">
				<view class="t-row t-title">
					<view class="t-th">学校名称</view>
					<view class="t-th" v-for="(item,index) in dataObj.title.data" :key="index">{{item}}</view>
				</view>
				<view class="t-row" v-for="(row,index) in dataObj.dataArr" :key = "index">
					<view class="t-td">{{row.name}}</view>
					<view class="t-td" v-for="(item,i) in row.data" :key="i">{{item}}</view>
				</view>
			</view>
		</view>

		<view class="m-btn"><text>下载对比报告</text></view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
export default {
	data() {
		return {
			dataObj:{
				title:{
					name:'学校名称',
					data:['北京电子科技职业技术学院','北京电子科技职业技术学院','北京电子科技职业技术学院','北京电子科技职业技术学院',]
				},
				dataArr:[
					{
						name:'所在地',
						data:[
							'北京','北京','北京','北京'
						]
					},
					{
						name:'建校时间',
						data:[
							'1999','1999','1999','1999'
						]
					},
					{
						name:'办学层次',
						data:[
							'高职','高职','高职','高职'
						]
					},
					{
						name:'举办者',
						data:[
							'马云','马云','马云','马云'
						]
					},
					{
						name:'是否为重点（示范）学校',
						data:[
							'是','是','否','否'
						]
					},
					{
						name:'在校生总数/人',
						data:[
							11220,5544,4414,2224
						]
					},
					{
						name:'学校占地面积/平方公里',
						data:[
							1000,500,600,800
						]
					},
					{
						name:'师生比',
						data:[
							'1:20','1:20','1:20','1:20'
						]
					},
					{
						name:'双师型教师占比',
						data:[
							'1:20','1:20','1:20','1:20'
						]
					},
					{
						name:'专业设置数',
						data:[
							50,40,30,20
						]
					},
					{
						name:'本科以上专任教师占比',
						data:[
							'1:3','1:3','1:3','1:3'
						]
					},
					{
						name:'高讲教师占比',
						data:[
							'1:3','1:3','1:3','1:3'
						]
					},
					{
						name:'就业率',
						data:[
							'99%','99%','99%','99%'
						]
					},
					{
						name:'兼职教师占专任教师比例',
						data:[
							'60%','60%','60%','60%'
						]
					}
				]
			},
			tableHeight: '0',
			tableWidth: '750upx',
			serverData: '',
			tips: '',
			sliderMax: '',
			chartsInfo: {
				cWidth: '',
				cHeight: '',
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				gaugeWidth: '', //仪表盘宽度,此设置可使各端宽度一致
				tips: '',
				pixelRatio: 1,
				serverData: '',
				itemCount: 30, //x轴单屏数据密度
				sliderMax: 50
			},
			radar: ''
		};
	},
	onLoad() {
		// this.tableHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(360) + 'px';
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: res => {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					this.chartsInfo.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.chartsInfo.cWidth = uni.upx2px(750);
		this.chartsInfo.cHeight = uni.upx2px(700);
		this.chartsInfo.cWidth2 = uni.upx2px(700);
		this.chartsInfo.cHeight2 = uni.upx2px(1100);
		this.chartsInfo.cWidth3 = uni.upx2px(250);
		this.chartsInfo.cHeight3 = uni.upx2px(250);
		this.chartsInfo.arcbarWidth = uni.upx2px(24);
		this.chartsInfo.gaugeWidth = uni.upx2px(30);
		// this.getServerData();
		this.tableHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(240) + 'px';
	},
	methods: {
		fillData(data) {
			this.serverData = data;
			this.tips = data.tips;
			this.sliderMax = data.Candle.categories.length;
			let categories = ['双型教师占比', '本科以上专任教师占比', '高讲教师占比', '就业率', '兼职教师占专任教师比例'];
			let Radar = {
				categories: ['双型教师占比', '本科以上', '高讲教师占比', '就业率', '兼职教师'],
				series: [
					{
						name: '上海信息学校',
						data: [90, 110, 165, 195, 187]
					},
					{
						name: '天津第一商业学校',
						data: [190, 210, 105, 35, 27]
					},{
						name: '天津第一商业学校',
						data: [50, 40, 55, 80, 33]
					},{
						name: '天津第一商业学校',
						data: [70, 100, 30, 150, 80]
					}
				]
			};
			// Radar.categories = data.Radar.categories;
			// Radar.series = data.Radar.series;

			this.showRadar('canvasRadar', Radar);
		},
		showRadar(canvasId, chartData) {
			this.radar = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'radar',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				xAxis: {
					rotateLabel: true
				},
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0,
					position: 'top'
				},
				background: '#FFFFFF',
				pixelRatio: this.chartsInfo.pixelRatio,
				animation: false,
				dataLabel: true,
				categories: chartData.categories,
				series: chartData.series,
				width: this.chartsInfo.cWidth * this.chartsInfo.pixelRatio,
				height: this.chartsInfo.cHeight * this.chartsInfo.pixelRatio,
				extra: {
					radar: {
						max: 200 //雷达数值的最大值
					}
				}
			});
		},
		getServerData() {
			uni.showLoading({
				title: '正在加载数据...'
			});
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
				data: {},
				success: res => {
					this.fillData(res.data);
				},
				fail: () => {
					console.log('网络错误!');
				},
				complete() {
					uni.hideLoading();
				}
			});
		},
		touchPie(e, id) {
			this.radar.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.m-top {
	background: url(../../../static/indexIcon/pk-header-bg.png) no-repeat;
	background-size: 100% 100%;
	height: 300upx;
	position: relative;
	margin-bottom: 174upx;
	.content {
		box-sizing: border-box;
		position: absolute;
		top: 164upx;
		right: 32upx;
		width: 686upx;
		height: 280upx;
		background: #ffffff;
		border-radius: 20upx;
		padding: 16upx 50upx;
		.left {
			display: inline-flex;
			flex-direction: column;
			justify-content: space-around;
			height: 100%;
			font-size: $uni-font-size-lg;
			color: $main-text-color;
		}
		.right {
			position: absolute;
			top: 87upx;
			right: 69upx;
		}
	}
}
.m-table {
	background: #ffffff;
	overflow: auto;
	margin-bottom: 140upx;
	.f-o {
		padding: 22upx 30upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		text {
			font-size: $uni-font-size-base;
			color: #999999;
			padding-left: 10upx;
		}
	}
	.t-table {
		box-sizing: border-box;
		width: 100%;
		padding: 0 10upx;
		overflow: auto;
		$border-color: #fff;
		.t-title {
			position: sticky;
			top: 0;
			background: #ffffff;
			z-index: 10;
			padding: 0;
			color: #666666;
		}
		.t-row {
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			color: #666666;
			.t-td,
			.t-th {
				box-sizing: border-box;
				flex: 1;
				padding: 35upx 10upx;
				font-size: $uni-font-size-base;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				// border-top: solid 1px $border-color;
				// border-left: solid 1px $border-color;
			}
			.t-td:nth-of-type(even),
			.t-th:nth-of-type(even) {
				background-color: #f3f7ff;
			}
			.t-td:last-child,
			.t-th:last-child {
				// border-right: solid 1px $border-color;
			}
		}
		.t-row:last-child {
			.t-td,
			.t-th {
				// border-bottom: solid 1px $border-color;
			}
		}
	}
}
.m-title {
	font-size: $uni-font-size-lg;
	font-weight: bold;
	color: $main-text-color;
	padding: 27upx 32upx;
	background: #ffffff;
	border-bottom: solid 1upx $main-dividing-line1;
}

.m-btn {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	padding-bottom: 30upx;
	right: 0;
	z-index: 10;
	width:100%;
	background: #FFFFFF;
	text-align: center;
	text{
		width: 600upx;
		height: 48upx;
		border-radius: 48upx;
		padding: 20upx 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to top, #6a43fe, #4795f9);
		color: #ffffff;
		font-size: $uni-font-size-lg;
		
	}
}
.m-radar,.charts {
	width: 750upx;
	height: 700upx;
	background-color: #FFFFFF;
}
</style>
