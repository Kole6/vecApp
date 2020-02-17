<template>
  <view class="content">
    <view class="have-data" v-if="haveData">
      <QSTabs
        ref="tabs"
        :current="current"
        :tabs="tabs"
        :width="tabs.length?750/tabs.length:750"
        swiperWidth="750"
        activeColor="#6451FC"
        backgroundColor="#fff"
        @change="change($event)"
      />
      <swiper
        :style="{height:`${scrollH-83}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
        :current="current"
        @change="swiperChange"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item" v-for="(item,i) of tabs.length" :key="i">
          <scroll-view scroll-y style="height: 100%;">
            <view class="qiun-columns" v-if="jyshow">
              <view class="qiun-new">
                <view class="new-tip">
                  <text>就业占比</text>
                </view>
                <view class="qiun-charts">
                  <canvas
                    canvas-id="canvasPie"
                    id="canvasPie1"
                    class="charts"
                    @touchstart="touchPie"
                  ></canvas>
                </view>
              </view>
              <view class="qiun-new" v-if="cyshow">
                <view class="new-tip">
                  <text>创业占比</text>
                </view>
                <view class="qiun-charts">
                  <canvas
                    canvas-id="canvasPie2"
                    id="canvasPie2"
                    class="charts"
                    @touchstart="touchPie2"
                  ></canvas>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
import uCharts from "@/components/u-charts/u-charts.js";
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
      tabs: ["2017年"],
      current: 0,
      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      serverData: "",
      jyshow: true,
      cyshow: false
    };
  },
  onLoad(e) {
    _self = this;
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
    this.apiData(e.sid);
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
  methods: {
    async apiData(sid) {
      let list = await this.$api.apiGetJycy(this, sid);
      let jyb = list[0].jyb;
      let cyb = list[0].cyb;
      if (jyb == 0) {
        this.jyshow = false;
      }
      if (cyb == 0) {
        this.cyshow = false;
      }
      this.getServerData(jyb, cyb);
    },
    getServerData(jyb, cyb) {
      let Pie = {
        series: [
          {
            name: "就业率",
            data: jyb
          },
          {
            name: "其他",
            data: 100 - jyb
          }
        ]
      };
      let line = {
        categories: ["创业率（%）"],
        series: [
          {
            name: "创业率",
            data: [cyb]
          }
        ]
      };
      canvaPie = _self.showPie("canvasPie", Pie);
      canvaPie2 = _self.showColumn("canvasPie2", line);
    },
    showColumn(canvasId, chartData) {
      let line = new uCharts({
        $this: this,
        canvasId: canvasId,
        type: "column",
        padding: [15, 15, 15, 15],
        legend: {
          show: false
        },
        fontSize: 11,
        background: "#FFFFFF",
        pixelRatio: _self.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        colors: ["#6451FC"],
        xAxis: {
          disableGrid: true,
          rotateLabel: true
        },
        yAxis: {
          gridColor: "#eee",
          min: 10,
          max: 100
        },
        dataLabel: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          column: {
            type: "group",
            width: 35
          }
        }
      });
      return line;
    },
    touchPie2(e) {
      canvaPie2.showToolTip(e, {
        format: function(item, category) {
          if (typeof item.data === "object") {
            return category + " " + item.name + ":" + item.data.value;
          } else {
            return category + " " + item.name + ":" + item.data;
          }
        }
      });
    },
    showPie(canvasId, chartData) {
      let pie = new uCharts({
        $this: _self,
        canvasId: canvasId,
        colors: ["#6451FC", "#E8E9E9", "#f04864", "#8543e0", "#90ed7d"],
        type: "rose",
        fontSize: 11,
        legend: {
          show: true
        },
        background: "#FFFFFF",
        pixelRatio: _self.pixelRatio,
        series: chartData.series,
        animation: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        dataLabel: true,
        extra: {
          rose: {
            type: "radius",
            minRadius: 50,
            labelWidth: 15
          }
        }
      });
      return pie;
    },
    touchPie(e) {
      canvaPie.showToolTip(e, {
        format: function(item) {
          console.log(item.name + ":" + item.data);
          return item.name + ":" + item.data;
        }
      });
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
    }
  }
};
</script>

<style scoped lang="scss">
.have-data {
  border-top: 1px solid rgba(238, 238, 238, 1);
}

.swiper-item {
  background-color: #f7f7f7;
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
  .qiun-new {
    width: 730upx;
    z-index: 999;
    background: rgba(255, 255, 255, 1);
    min-height: 300upx;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 33upx;
    margin: 20upx 0;
    .new-tip {
      font-size: 22upx;
      text-align: center;
      position: absolute;
      padding: 9upx 34upx;
      margin-top: -14upx;
      margin-left: 80upx;
      color: #fff;
      background: url("../../../static/p601.png") no-repeat;
      background-size: 100% 50upx;
    }
    .qiun-charts {
      .charts-man {
        height: 400upx;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #666;
        font-size: 30upx;
        .male {
          margin: 0 90upx;
          image {
            width: 191upx;
            height: 206upx;
          }
          .persent {
            color: #3fa1ff;
          }
        }
        .female {
          margin: 0 90upx;
          image {
            width: 150upx;
            height: 189upx;
            padding-bottom: 17upx;
          }
          .persent {
            color: #fc6c6d;
          }
        }
      }
      .charts {
        width: 720upx;
        height: 500upx;
        margin-top: 14upx;
      }
    }
  }
}
</style>
