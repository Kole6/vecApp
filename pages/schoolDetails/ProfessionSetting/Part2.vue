<template>
	<view class="m-bar">
		<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchIt($event, 'canvasColumn')"></canvas>
		<view class="m-tips">
			百分比为专业学生占全校学生的占比
		</view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
var column = null;
export default {
	data() {
		return {
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
			column: ''
		};
	},
	mounted() {
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
		this.getServerData();
	},
	methods: {
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
		fillData(data) {
			this.chartsInfo.serverData = data;
			this.chartsInfo.tips = data.tips;
			this.chartsInfo.sliderMax = data.Candle.categories.length;
			let categories = ['计算机网络', '室内设计', '建筑室内设计', '食品生物工艺', '工业分析与检验','汽车运用与维修','化工品制作与检验'];
			let series = [
				{
					legendShape:'rect',
					pointShape:"circle",
					show:true,
					type:'column',
					data:[
						{color:'#68BCF5',value:17},
						{color:'#67A6F9',value:12.5},
						{color:'#69F5C7',value:10},
						{color:'#68F5E4',value:10},
						{color:'#6D68F6',value:9},
						{color:'#FF750F',value:7},
						{color:'#E08972',value:5}
					]
				}
			]
			let Column = {
				categories: categories,
				series: series
			};
			this.showColumn('canvasColumn', Column);
		},
		showColumn(canvasId, chartData) {
			column = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 15, 0, 15],
				legend: {
					show: false
				},
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: this.chartsInfo.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				// enableScroll: true,//开启图表拖拽功能
				xAxis: {
					disableGrid: true,
					rotateLabel:true,
					// itemCount:4,
					// scrollShow:true,
				},
				yAxis: {
					format: val => {
						return val.toFixed(0) + '%';
					}
				},
				dataLabel: true,
				width: this.chartsInfo.cWidth * this.chartsInfo.pixelRatio,
				height: this.chartsInfo.cHeight * this.chartsInfo.pixelRatio,
				extra: {
					column: {
						type: 'group',
						width: (this.chartsInfo.cWidth * this.chartsInfo.pixelRatio * 0.45) / chartData.categories.length
					}
				}
			});
		},
		touchIt(e, id) {
			column.touchLegend(e, {
				animation: true
			});
			column.showToolTip(e, {
				format: function(item, category) {
					return category+':'+item.data.value+'%'
					// if (typeof item.data === 'object') {
					// 	return category + ' ' + item.name + ':' + item.data.value;
					// } else {
					// 	return category + ' ' + item.name + ':' + item.data;
					// }
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.m-bar,
.charts {
	width: 750upx;
	height: 800upx;
	background-color: #ffffff;
}
.m-bar{
	border-top: 1px solid #eee;
}
.m-tips{
	padding: 20upx;
	text-align: center;
	font-size: 30upx;
	color: #666666;
	margin-top: 40upx;
	background: #FFFFFF;
}
</style>
