<template>
  <view>
    <view class="m-top">
      <view class="content">
        <view class="left">
          <view class="item" v-for='(item,i) of bodyList' :key='i'>{{ item.schoolname }}</view>
        </view>
        <view class="right"><image src="../../../static/indexIcon/pk-vs.png" mode="aspectFit" style="width: 183upx; height: 106upx;"></image></view>
      </view>
    </view>
    <view class="m-title">
      <text>学校对比信息</text>
    </view>
    <view class="m-radar">
      <canvas
        canvas-id="canvasRadar"
        id="canvasRadar"
        class="charts"
        @touchstart="touchPie($event, 'canvasRadar')"
      ></canvas>
    </view>
    <view class="m-table">
      <QSTabs
        ref="tabs"
        :current="current"
        :tabs="tabs"
        width="375"
        swiperWidth="750"
        activeColor="#6451FC"
        backgroundColor="#fff"
        @change="change($event)"
      />
      <swiper
        :style="{height:`${scrollH-400}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
        :current="current"
        @change="swiperChange"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item>
          <view class="swiper1">
            <table-show
              showType="1"
              :tableHeight="tableHeight"
              :tableWidth="tableWidth"
              :bodyList="bodyList"
            ></table-show>
          </view>
        </swiper-item>
        <swiper-item>
          <ava-compare></ava-compare>
        </swiper-item>
      </swiper>
    </view>

    <view class="m-btn" @tap="toEmail">
      <text>发送至邮箱</text>
    </view>
  </view>
</template>

<script>
import uCharts from "@/components/u-charts/u-charts.js";
import tableShow from "./table-show.vue";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
import avaCompare from "./AvaCompare.vue";
var canvaRadar=null;
var _self;
export default {
  components: { QSTabs, avaCompare, tableShow },
  data() {
    return {
      current: 0,
      systemInfo: uni.getSystemInfoSync(),
      tabs: ["信息对比", "画像对比"],
      bodyList: [],
      tableHeight: "0",
      tableWidth: "750upx",
      serverData: "",
      tips: "",
      sliderMax: "",
      chartsInfo: {
        cWidth: "",
        cHeight: "",
        tips: "",
        pixelRatio: 1,
        serverData: "",
        itemCount: 30, //x轴单屏数据密度
        sliderMax: 200
      }
    };
  },
  computed: {
    scrollH() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight;
    }
  },
  onLoad(e) {
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
	_self =this
    this.chartsInfo.cWidth = uni.upx2px(750);
    this.chartsInfo.cHeight = uni.upx2px(700);
    this.tableHeight =
	  uni.getSystemInfoSync().windowHeight - uni.upx2px(440) + "px";
	this.getData(e.ids);
  },
  methods: {
    async getData(sids) {
		  this.bodyList = await this.$api.apiMyXxdb(this, sids);
		  this.getServerData();
		console.log('this.bodyList',this.bodyList);
    },
    change(index) {
      this.current = index;
    },
    swiperChange({ detail: { current } }) {
      this.current = current;
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
    },
    
    showRadar(canvasId, chartData) {
		canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:11,
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
					// legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:_self.chartsInfo.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.chartsInfo.cWidth*_self.chartsInfo.pixelRatio,
					height: _self.chartsInfo.cHeight*_self.chartsInfo.pixelRatio,
					extra: {
						radar: {
							max: 200//雷达数值的最大值
						}
					}
				});
    },
    toEmail() {
      uni.showToast({
        title: "暂未开通",
        icon: "none"
      });
    },
    getServerData() {
      let categories = [
		"本科教师占比",
        "双型教师占比",
		"高讲教师占比",
		"兼职教师占比",
        "就业率"
        
	  ];
	  let sd =[]
	  let k=new Array(this.bodyList.length).fill(0)
	  for(let i of this.bodyList){
		  sd.push({
            name: i.schoolname,
            data: k
          })
	  }
	//   let series= [
    //       {
    //         name: "上海信息学校",
    //         data: [190, 210, 105, 21, 27]
    //       },
    //       {
    //         name: "天津第一商业学校",
    //         data: [190, 210, 105, 35, 27]
    //       },
    //       {
    //         name: "天津第一商业学校",
    //         data: [50, 40, 55, 80, 33]
    //       },
    //       {
    //         name: "天津第一商业学校",
    //         data: [70, 100, 30, 150, 80]
    //       }
	// 	]
		let Radar ={}
		Radar.categories=categories;
		Radar.series=sd;
		console.log('Radar',Radar)
		this.showRadar("canvasRadar",Radar);
    },
    touchPie(e, id) {
      /* canvaRadar.showToolTip(e, {
        format: function(item) {
          return item.name + ":" + item.data;
        }
      }); */
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
  .swiper1 {
    background: #ffffff;
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
  width: 100%;
  background: #ffffff;
  text-align: center;
  text {
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
  height: 550upx;
  background-color: #ffffff;
}
</style>
