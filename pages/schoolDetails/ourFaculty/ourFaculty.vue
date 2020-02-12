<template>
  <view class="content">
    <view class="have-data">
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
      <!--scrollH-83-->
      <swiper
        :style="{height:`${scrollH-83}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
        :current="current"
        @change="swiperChange"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="m-w" v-if="rankshow">
              <image src="/static/no-ava.png" mode="aspectFill" />
              <view class="tip">
                <text>抱歉！数据正在整理中～</text>
              </view>
            </view>
            <view class="qiun-columns" v-else>
              <view class="qiun-new">
                <view class="new-tip">
                  <text>教师性别占比</text>
                </view>
                <view class="qiun-charts">
                  <view class="charts-man">
                    <view class="male">
                      <image src="/static/p602.png" mode="aspectFill" />
                      <p>
                        {{teacherPec[0].name}}教师
                        <br />
                        <span class="persent">{{teacherPec[0].value}}%</span>
                      </p>
                    </view>
                    <view class="female">
                      <image src="/static/p603.png" mode="aspectFill" />
                      <p>
                        {{teacherPec[1].name}}教师
                        <br />
                        <span class="persent">{{teacherPec[1].value}}%</span>
                      </p>
                    </view>
                  </view>
                </view>
              </view>
              <view class="qiun-new">
                <view class="new-tip">
                  <text>教师学历占比</text>
                </view>
                <view class="qiun-charts">
                  <canvas
                    class="charts"
                    canvas-id="canvasPie2"
                    id="canvasPie2"
                    @touchstart="touchPie2"
                  ></canvas>
                </view>
              </view>
              <view class="qiun-new">
                <view class="new-tip">
                  <text>教师年龄占比</text>
                </view>
                <view class="qiun-charts">
                  <canvas
                    canvas-id="canvasPie3"
                    id="canvasPie3"
                    class="charts"
                    @touchstart="touchPie3"
                  ></canvas>
                </view>
              </view>
              <view class="qiun-new">
                <view class="new-tip">
                  <text>专业教师“双师”占比</text>
                </view>
                <view class="qiun-charts">
                  <canvas
                    canvas-id="canvasPie4"
                    id="canvasPie4"
                    class="charts"
                    @touchstart="touchPie4"
                  ></canvas>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="m-w" v-if="rankshow2">
              <image src="/static/no-ava.png" mode="aspectFill" />
              <view class="tip">
                <text>抱歉！数据正在整理中～</text>
              </view>
            </view>
            <view class="m-list" v-else v-for="(item,index) in dataArr" :key="index">
              <view class="avatar">{{item.name.substr(0,1)}}</view>
              <view class="name">{{item.name}}</view>
              <view class="position">
                <text>{{item.position}}</text>
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
export default {
  onLoad(e) {
    _self = this;
    this.sid = e.sid;
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
    this.apiGetTeacherInfo();
    this.apiGetGgjs();
  },
  components: {
    QSTabs
  },
  data() {
    return {
      haveData: true,
      tabs: ["专任教师", "骨干名师"],
      current: 0,
      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      serverData: "",
      sid: "",
      rankshow: false,
      rankshow2: false,
      teacherPec: [
        {
          name: "男",
          value: 57.0
        },
        {
          name: "女",
          value: 43.0
        }
      ],
      dataArr: []
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
  methods: {
    apiGetTeacherInfo() {
      this.$http({
        url: "/zjq/College/GetTeacherInfo",
        header: "form",
        load: true,
        data: {
          sid: this.sid,
          token: uni.getStorageSync("token")
        }
      }).then(res => {
        if (res.code == 0) {
          var pie2 = [],
            pie3 = [],
            pie4 = [];
          for (let i of res.data) {
            if (i.title == "教师性别分布") {
              this.teacherPec = i.content;
              if (!i.content || i.content[0].value == 0) {
                this.rankshow = true;
              }
            }
            if (i.title == "教师学历分布") {
              pie2 = this.getSeries(i.content);
            }
            if (i.title == "教师年龄分布") {
              pie3 = this.getSeries(i.content);
            }
            if (i.title == "专业教师“双师”占比") {
              pie4 = this.getSeries(i.content);
            }
          }
          this.getServerData(
            {
              series: pie2
            },
            {
              series: pie3
            },
            {
              series: pie4
            }
          );
        } else {
          uni.showToast({
            icon: "none",
            title: res.message
          });
        }
      });
    },
    /* 查询学校骨干教师 */
    apiGetGgjs() {
      this.$http({
        url: "/zjq/College/GetGgjs",
        header: "form",
        data: {
          sid: this.sid,
          token: uni.getStorageSync("token")
        }
      }).then(res => {
        if (res.code == 0) {
          this.dataArr = res.data;
          if (res.data.length == 0) {
            this.rankshow2 = true;
          }
        } else {
          uni.showToast({
            title: res.message,
            icon: "none"
          });
        }
      });
    },
    getSeries(content) {
      let o = [];
      for (let i of content) {
        o.push({
          name: i.name,
          data: i.value
        });
      }
      return o;
    },
    getServerData(Pie2, Pie3, Pie4) {
      _self.showPie2("canvasPie2", Pie2);
      _self.showPie3("canvasPie3", Pie3);
      _self.showPie4("canvasPie4", Pie4);
    },
    showPie2(canvasId, chartData) {
      canvaPie2 = new uCharts({
        $this: _self,
        canvasId: canvasId,
        colors: [
          "#3fa1ff",
          "#3ecbcb",
          "#facc14",
          "#f04864",
          "#8543e0",
          "#90ed7d"
        ],
        type: "ring",
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
          pie: {
            lableWidth: 15
          }
        }
      });
    },
    showPie3(canvasId, chartData) {
      canvaPie3 = new uCharts({
        $this: _self,
        canvasId: canvasId,
        colors: [
          "#3fa1ff",
          "#3ecbcb",
          "#50cb74",
          "#fbd444",
          "#8543e0",
          "#90ed7d"
        ],
        type: "ring",
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
          pie: {
            lableWidth: 15
          }
        }
      });
    },
    showPie4(canvasId, chartData) {
      canvaPie4 = new uCharts({
        $this: _self,
        canvasId: canvasId,
        colors: [
          "#3fa1ff",
          "#3ecbcb",
          "#50cb74",
          "#fbd444",
          "#8543e0",
          "#90ed7d"
        ],
        type: "ring",
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
          pie: {
            lableWidth: 15
          }
        }
      });
    },
    touchPie2(e) {
      canvaPie2.showToolTip(e, {
        format: function(item) {
          console.log(item.name + ":" + item.data);
          return item.name + ":" + item.data;
        }
      });
    },
    touchPie3(e) {
      canvaPie3.showToolTip(e, {
        format: function(item) {
          console.log(item.name + ":" + item.data);
          return item.name + ":" + item.data;
        }
      });
    },
    touchPie4(e) {
      canvaPie4.showToolTip(e, {
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
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 33upx;
    margin: 20upx 0;
    min-height: 300upx;

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

.m-list {
  padding: 15upx 30upx;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: solid 1upx $main-dividing-line1;
  font-size: $uni-font-size-lg;

  &:first-child {
    border-top: solid 1upx $main-dividing-line1;
  }

  .avatar {
    box-sizing: border-box;
    display: inline-flex;
    width: 110upx;
    height: 110upx;
    border-radius: 110upx;
    background: #ffffff;
    border: solid 1px #68bcf5;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    font-size: 45upx;
    color: #fff;
    background-color: #68bcf5;
  }

  .name {
    margin-left: 20upx;
    font-size: $uni-font-size-lg;
    color: $main-text-color;
  }

  .position {
    text {
      margin-left: 20upx;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2upx 11upx;
      border-radius: 5upx;
      background: #6451fc;
      color: #ffffff;
      // border: solid 1upx $main-base-color;
      font-size: $uni-font-size-base;
    }
  }
}
.m-w {
  image {
    padding: 150upx 184upx 50upx 184upx;
    width: 382upx;
    height: 318upx;
  }
  .tip {
    color: #999999;
    text-align: center;
    font-size: $uni-font-size-base;
  }
}
</style>
