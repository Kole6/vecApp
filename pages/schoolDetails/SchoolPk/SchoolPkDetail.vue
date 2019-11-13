<template>
	<view>
		<!-- 专业对比-详细 -->
		<view class="m-top">
			<view class="left">上</view>
			<view class="middle">pk对比</view>
			<view class="left">上</view>
		</view>

		<view class="m-title">学校对比信息</view>
		<view class="m-radar">
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @touchstart="touchPie($event,'canvasRadar')"></canvas>
			<!--#endif-->
		</view>
		<view class="m-table" :style="{ height: tableHeight }">
			<view class="m-row m-title">
				<view class="m-th">学校名称</view>
				<view class="m-th">上海市江电职业学校</view>
				<view class="m-th">上海市江电职业学校</view>
			</view>
			<view class="m-row" v-for="(item, index) in listData" :key="index">
				<view class="m-td">{{ item.name }}</view>
				<view class="m-td">{{ item.a }}</view>
				<view class="m-td">{{ item.b }}</view>
			</view>
		</view>
		<view class="m-btn"><text>下载对比报告</text></view>
	</view>
</template>

<script>
import uCharts from '../../../components/u-charts/u-charts.js';
export default {
	data() {
		return {
			tableHeight: '400px',
			listData: [
				{
					name: '所在地',
					a: '',
					b: ''
				},
				{
					name: '建校时间',
					a: '',
					b: ''
				},
				{
					name: '办学层次',
					a: '',
					b: ''
				},
				{
					name: '举办者',
					a: '',
					b: ''
				},
				{
					name: '是否为重点（示范）学校',
					a: '',
					b: ''
				},
				{
					name: '在校生总数',
					a: '',
					b: ''
				},
				{
					name: '学校占地面积',
					a: '',
					b: ''
				},
				{
					name: '师生比',
					a: '',
					b: ''
				},
				{
					name: '双师型教师占比',
					a: '',
					b: ''
				},
				{
					name: '专业设置数',
					a: '',
					b: ''
				},
				{
					name: '技能大赛获奖数',
					a: '',
					b: ''
				},
				{
					name: '本科以上专任教师占比',
					a: '',
					b: ''
				},
				{
					name: '高讲教师占比',
					a: '',
					b: ''
				},
				{
					name: '就业率',
					a: '',
					b: ''
				},
				{
					name: '兼职教师占专任教师比例',
					a: '',
					b: ''
				}
			],
			serverData:'',
			tips:'',
			sliderMax:'',
			chartsInfo:{
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
			radar:'',
		};
	},
	onLoad() {
		// this.tableHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(360) + 'px';
		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: (res)=>{
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
		fillData(data){
			this.serverData = data;
			this.tips = data.tips;
			this.sliderMax = data.Candle.categories.length;
			let categories = ["双型教师占比","本科以上专任教师占比","高讲教师占比","就业率","兼职教师占专任教师比例"]
			let Radar = {
				categories:["双型教师占比","本科以上","高讲教师占比","就业率","兼职教师"],
				series: [
					{
						"name":"上海信息学校",
						"data":[90,110,165,195,187],
					},{
						"name":"天津第一商业学校",
						"data":[190,210,105,35,27],
					}]
			};
			// Radar.categories = data.Radar.categories;
			// Radar.series = data.Radar.series;
			
			this.showRadar("canvasRadar", Radar);
		},
		showRadar(canvasId, chartData) {
			console.log(JSON.stringify(chartData) ,'chartData')
			this.radar = new uCharts({
				$this: this,
				canvasId: canvasId,
				type: 'radar',
				fontSize: 11,
				padding:[15,15,0,15],
				xAxis:{
					rotateLabel:true,
				},
				legend:{
					show:true,
					padding:5,
					lineHeight:11,
					margin:0,
					position:'top'
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
				title: "正在加载数据..."
			})
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/hello-uniapp-ucharts-data.json',
				data: {},
				success: (res)=>{
					this.fillData(res.data);
				},
				fail: () => {
					console.log('网络错误!')
				},
				complete() {
					uni.hideLoading();
				}
			});
		},
		touchPie(e,id) {
		  this.radar.showToolTip(e, {
		      format: function(item) {
		          return item.name + ':' + item.data
		      }
		  });
		},
	}
};
</script>

<style scoped lang="scss">
.m-top {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 50upx 50upx 20upx 50upx;
	.left,
	.right {
		box-sizing: border-box;
		width: 100upx;
		height: 100upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 45upx;
		border-radius: 50upx;
		background: $main-base-color;
		padding: 10upx;
		color: #fff;
	}
}
.m-title {
	text-align: center;
	font-size: $uni-font-size-lg + 10;
	padding: 20upx 0;
}
.m-table {
	margin-bottom: $uni-font-size-lg + 60;
	box-sizing: border-box;
	width: 100%;
	padding: 0 10upx 10upx 10upx;
	overflow: auto;
	color: $main-text-color;
	$border-color: #eee;
	.m-title {
		position: sticky;
		top: 0;
		background: #ffffff;
		z-index: 10;
		padding: 0;
	}
	.m-row {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		.m-td,
		.m-th {
			box-sizing: border-box;
			padding: 35upx 10upx;
			flex: 1;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			font-size: $uni-font-size-lg - 3;
			text-align: center;
			border-top: solid 1px $border-color;
			border-left: solid 1px $border-color;
		}
		.m-td:first-child,
		.m-th:first-child {
			background-color: #cccccc;
		}
		.m-td:last-child,
		.m-th:last-child {
			border-right: solid 1px $border-color;
		}
	}
	.m-row:last-child {
		.m-td,
		.m-th {
			border-bottom: solid 1px $border-color;
		}
	}
}
.m-btn {
	position: fixed;
	bottom: 0;
	width: 100%;
	text-align: center;
	padding: 25upx 0;
	background: $main-base-color;
	color: #ffffff;
	font-size: $uni-font-size-lg + 10;
}
.m-radar,.charts {
	width: 750upx;
	height: 700upx;
	background-color: #FFFFFF;
}
</style>
