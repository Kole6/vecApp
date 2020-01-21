<template>
  <view class="m-bar">
    <view class="table-null" v-show="cans">无数据</view>
    <canvas
      canvas-id="canvasColumn"
      id="canvasColumn"
      class="charts"
      @touchstart="touchIt($event, 'canvasColumn')"
    ></canvas>
    <view class="m-tips">百分比为专业学生占全校学生的占比，此处只展示前7个专业</view>
  </view>
</template>

<script>
import uCharts from "@/components/u-charts/u-charts.js";
var column = null;
export default {
  props: {
    sid: String
  },
  data() {
    return {
      chartsInfo: {
        cWidth: "",
        cHeight: "",
        cWidth2: "", //横屏图表
        cHeight2: "", //横屏图表
        cWidth3: "", //圆弧进度图
        cHeight3: "", //圆弧进度图
        arcbarWidth: "", //圆弧进度图，进度条宽度,此设置可使各端宽度一致
        gaugeWidth: "", //仪表盘宽度,此设置可使各端宽度一致
        tips: "",
        pixelRatio: 1,
        serverData: "",
        itemCount: 30, //x轴单屏数据密度
        sliderMax: 50
      },
      column: "",
      cans: false
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
    this.apiData();
  },
  methods: {
    /* 获取专业学生分布数据 取前七位 */
    async apiData() {
      let list = await this.$api.apiGetXxzyfb(this, this.sid);
      if (list.length > 7) {
        list = list.slice(0, 7);
      }
      let categories = list.map(t => {
        return t.majorname;
        // return '5646<br />64'
      });
      let color = [
        "#68BCF5",
        "#67A6F9",
        "#69F5C7",
        "#68F5E4",
        "#6D68F6",
        "#FF750F",
        "#E08972"
      ];
      let sd = list.map((t, i) => {
        return { value: Math.floor(t.zyzb * 100) / 100, color: color[i] };
      });
      if (categories.length) {
        this.fillData(categories, sd);
      } else {
        this.cans = true;
      }
    },
    fillData(categories, sd) {
      let series = [
        {
          legendShape: "rect",
          pointShape: "circle",
          show: true,
          type: "column",
          data: sd
        }
      ];
      let Column = {
        categories: categories,
        series: series
      };
      this.showColumn("canvasColumn", Column);
    },
    showColumn(canvasId, chartData) {
      column = new uCharts({
        $this: this,
        canvasId: canvasId,
        type: "column",
        padding: [15, 15, 0, 15],
        legend: {
          show: false
        },
        fontSize: 11,
        background: "#FFFFFF",
        pixelRatio: this.chartsInfo.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        // rotate:true,
        // enableScroll:true,
        padding: [15, 20, 5, 32],
        xAxis: {
          disableGrid: false,
          rotateLabel: true
        },
        yAxis: {
          min: 0,
          // max: 100,
          format: val => {
            return val.toFixed(0) + "%";
          }
        },
        dataLabel: true,
        width: this.chartsInfo.cWidth * this.chartsInfo.pixelRatio,
        height: this.chartsInfo.cHeight * this.chartsInfo.pixelRatio,
        extra: {
          column: {
            type: "group",
            width:
              (this.chartsInfo.cWidth * this.chartsInfo.pixelRatio * 0.45) /
              chartData.categories.length
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
          return category + ":" + item.data.value + "%";
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
.m-bar {
  border-top: 1px solid #eee;
}
.m-tips {
  padding: 20upx;
  text-align: center;
  font-size: 26upx;
  color: #666666;
  margin-top: 40upx;
  background: #ffffff;
}
</style>
