<template>
  <view class="content">
    <view class="have-data" v-if="haveData">
      <QSTabs
        ref="tabs"
        :current="current"
        :tabs="tabs"
        width="150"
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
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="wy-table">
              <view class="table-th">
                <view class="td">项目名称</view>
                <view class="td">级别</view>
                <view class="td">表彰日期</view>
              </view>
              <view class="table-tr" v-for="(item,i) of listArr.y2020" :key="i">
                <view class="td">{{item.projectname}}</view>
                <view class="td">{{item.level}}</view>
                <view class="td">{{item.date}}</view>
              </view>
              <view class="table-null" v-show="isShowNo(listArr.y2020)">无数据</view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="wy-table">
              <view class="table-th">
                <view class="td">项目名称</view>
                <view class="td">级别</view>
                <view class="td">表彰日期</view>
              </view>
              <view class="table-tr" v-for="(item,i) of listArr.y2019" :key="i">
                <view class="td">{{item.projectname}}</view>
                <view class="td">{{item.level}}</view>
                <view class="td">{{item.date}}</view>
              </view>
              <view class="table-null" v-show="isShowNo(listArr.y2019)">无数据</view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="wy-table">
              <view class="table-th">
                <view class="td">项目名称</view>
                <view class="td">级别</view>
                <view class="td">表彰日期</view>
              </view>
              <view class="table-tr" v-for="(item,i) of listArr.y2018" :key="i">
                <view class="td">{{item.projectname}}</view>
                <view class="td">{{item.level}}</view>
                <view class="td">{{item.date}}</view>
              </view>
              <view class="table-null" v-show="isShowNo(listArr.y2018)">无数据</view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="wy-table">
              <view class="table-th">
                <view class="td">项目名称</view>
                <view class="td">级别</view>
                <view class="td">表彰日期</view>
              </view>
              <view class="table-tr" v-for="(item,i) of listArr.y2017" :key="i">
                <view class="td">{{item.projectname}}</view>
                <view class="td">{{item.level}}</view>
                <view class="td">{{item.date}}</view>
              </view>
              <view class="table-null" v-show="isShowNo(listArr.y2017)">无数据</view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="wy-table">
              <view class="table-th">
                <view class="td">项目名称</view>
                <view class="td">级别</view>
                <view class="td">表彰日期</view>
              </view>
              <view class="table-tr" v-for="(item,i) of listArr.y2016" :key="i">
                <view class="td">{{item.projectname}}</view>
                <view class="td">{{item.level}}</view>
                <view class="td">{{item.date}}</view>
              </view>
              <view class="table-null" v-show="isShowNo(listArr.y2016)">无数据</view>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
export default {
  onLoad(e) {
	this.sid = e.sid;
	this.apiGetSchoolAwards("2020");
	this.apiGetSchoolAwards("2019");
    this.apiGetSchoolAwards("2018");
    this.apiGetSchoolAwards("2017");
    this.apiGetSchoolAwards("2016");
  },
  components: {
    QSTabs
  },
  data() {
    return {
      haveData: true,
      tabs: ["2020", "2019", "2018", "2017", "2016"],
      current: 0,
      sid: "3633000526",
      listArr: {
        y2020: [],
        y2019: [],
        y2018: [],
        y2017: [],
        y2016: []
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
  methods: {
    apiGetSchoolAwards(year) {
      this.$http({
        url: "/zjq/College/GetSchoolAwards",
        header: "form",
        data: {
          sid: this.sid,
          token: uni.getStorageSync("token"),
          year: year
        }
      }).then(res => {
        if (res.code == 0) {
          this.listArr[`y${year}`] = res.data[0].list;
        } else {
          uni.showToast({
            icon: "none",
            title: res.message
          });
        }
      });
    },
    isShowNo(d) {
      if (d.length) {
        return false;
      } else {
        return true;
      }
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
.wy-table {
  background-color: #fff;

  .table-th,
  .table-tr {
    width: 750upx;
    min-height: 100upx;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .table-th {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    font-size: 32upx;
    color: #333;
  }

  .table-tr {
    border-bottom: 1px solid #eee;
    font-size: 26upx;
    line-height: 38upx;
    color: #666;

    &:nth-child(2n + 1) {
      background: rgba(247, 247, 247, 1);
    }
  }

  .td {
    margin: 10upx;

    &:nth-child(1) {
      width: 370upx;
    }

    &:nth-child(2) {
      width: 170upx;
    }

    &:nth-child(3) {
      width: 150upx;
    }
  }
}

.have-data {
  border-top: 1px solid rgba(238, 238, 238, 1);
}

.swiper-item {
  background-color: #fff;

  .sc-it {
    background-color: #fff;
    border-bottom: 8upx solid #f6f8fe;
    height: 100upx;
    font-size: 28upx;
    line-height: 100upx;
    padding-left: 30upx;

    &:first-child {
      border-top: 20upx solid #f6f8fe;
    }
  }
}
</style>
