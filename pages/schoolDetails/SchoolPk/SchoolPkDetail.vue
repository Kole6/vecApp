<template>
  <view>
    <view class="m-top">
      <view class="content">
        <view class="left">
          <view class="item" v-for="(item,i) of bodyList" :key="i">{{ item.schoolname }}</view>
        </view>
        <view class="right">
          <image
            src="/static/indexIcon/pk-vs.png"
            mode="aspectFit"
            style="width: 183upx; height: 106upx;"
          />
        </view>
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
        :style="{height:`${scrollH}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
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
  </view>
</template>

<script>
import uCharts from "@/components/u-charts/u-charts.js";
import tableShow from "./table-show.vue";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
import avaCompare from "./AvaCompare.vue";
var canvaRadar = null;
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
    _self = this;
    this.chartsInfo.cWidth = uni.upx2px(750);
    this.chartsInfo.cHeight = uni.upx2px(700);
    this.tableHeight = uni.getSystemInfoSync().windowHeight + "px";
    // console.log('uni.getSystemInfoSync().windowHeight',uni.getSystemInfoSync().windowHeight)
    this.getData(e.ids);
  },
  methods: {
    async getData(sids) {
      this.bodyList = await this.$api.apiMyXxdb(this, sids);
      this.getServerData();
      console.log("this.bodyList", this.bodyList);
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
      canvaRadar = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: "radar",
        fontSize: 11,
        xAxis: {
          rotateLabel: true
        },
        legend: {
          show: true,
          padding: 5,
          lineHeight: 11,
          margin: 0,
          position: "top"
        },
        // legend:{show:true},
        background: "#FFFFFF",
        pixelRatio: _self.chartsInfo.pixelRatio,
        animation: true,
        dataLabel: true,
        categories: chartData.categories,
        series: chartData.series,
        width: _self.chartsInfo.cWidth * _self.chartsInfo.pixelRatio,
        height: _self.chartsInfo.cHeight * _self.chartsInfo.pixelRatio,
        extra: {
          radar: {
            max: 200 //雷达数值的最大值
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
      let sd = [];
      let k = new Array(this.bodyList.length).fill(0);
      for (let i of this.bodyList) {
        sd.push({
          name: i.schoolname,
          data: k
        });
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
      let Radar = {};
      Radar.categories = categories;
      Radar.series = sd;
      console.log("Radar", Radar);
      this.showRadar("canvasRadar", Radar);
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
@import "../../indexIcon/majorDatabase/pkDetail.scss";
</style>
