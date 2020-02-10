<template>
  <view class="h-top">
    <!-- #ifdef APP-PLUS -->
    <view style="height: 35px;background: #FFFFFF;"></view>
    <!-- #endif -->
    <uni-nav-bar
      @clickLeft="handleBack"
      left-icon="arrowleft"
      :shadow="false"
      border
      fixed
      title="开设学校"
    >
      <view class="f-sc" slot="right" @tap="handlePkOne">
        <text>{{schoolType}}</text>
      </view>
    </uni-nav-bar>
    <HMfilterDropdown
      :filterData="filterData"
      :defaultSelected="defaultSelected"
      :updateMenuName="true"
      :key="filterKey"
      @confirm="confirm"
    ></HMfilterDropdown>
    <!-- 占位 -->
    <view class="place"></view>
    <!-- 列表 -->
    <view class="goods-list">
      <school-list :showType="4" :listArr="dataArr"></school-list>
      <uni-load-more :status="more"></uni-load-more>
    </view>
  </view>
</template>

<script>
import HMfilterDropdown from "@/components/HM-filterDropdown/HM-filterDropdown.vue";
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import city from "@/common/city.js";
export default {
  components: {
    HMfilterDropdown,
    schoolList,
    uniLoadMore,
    uniNavBar
  },
  data() {
    return {
      dataArr: [],
      filterDropdownValue: [],
      defaultSelected: [],
      pageIndex: 1,
      more: "more",
      schoolType: "高职",
      zyid: "510102",
      filterKey: 0,
      filterData: [
        {
          name: "城市",
          type: "hierarchy",
          submenu: [...city]
        },
        {
          name: "性质类别",
          type: "hierarchy",
          submenu: []
        },
        {
          name: "学校属性",
          type: "hierarchy",
          submenu: []
        }
      ],
      resValue: ["", "", ""]
    };
  },
  /* 上拉 */
  onReachBottom() {
    if (this.more == "more") {
      this.more = "loading";
      this.apiData();
    }
  },
  /* 下拉 */
  onPullDownRefresh() {
    this.pageIndex = 1;
    this.apiData();
  },
  onLoad(e) {
    //获取性质类别和学校属性 高职和中职不同
    this.zyid = e.zyid;
    this.getProperty();
    this.apiData();
  },
  methods: {
    confirm(e) {
      this.resValue = this.$tool.toolHMfilter(e.value);
      console.log("this.resValue", this.resValue);
      this.pageIndex = 1;
      this.apiData();
    },
    async getProperty() {
      let xxsx = await this.$api.apiGetDict(this, {
        type: this.schoolType == "高职" ? "xxsx_gz" : "xxsx_zz",
        pid: "0"
      });
      let xxxz = await this.$api.apiGetDict(this, {
        type: this.schoolType == "高职" ? "xxlx_gz" : "xxxz_zz",
        pid: "0"
      });
      this.filterData[1].submenu = this.$tool.toolHMfilterDict(xxsx);
      this.filterData[2].submenu = this.$tool.toolHMfilterDict(xxxz);
    },
    async apiData() {
      let list = await this.$api.apiGetXxByZy(this, {
        zyid: this.zyid,
        schoolType: this.schoolType == "高职" ? 1 : 2,
        cityId: this.resValue[0],
        type: this.resValue[1], //性质类别
        property: this.resValue[2], //学校属性
        pageIndex: this.pageIndex
      });
      uni.stopPullDownRefresh();
      this.pageIndex = this.$tool.toolMore(
        this,
        "dataArr",
        "more",
        this.pageIndex,
        this.$tool.toolSchoolList(list)
      );
    },
    handleBack() {
      uni.navigateBack();
    },
    handlePkOne() {
      this.schoolType = this.schoolType == "高职" ? "中职" : "高职";
      this.filterData = [
        {
          name: "城市",
          type: "hierarchy",
          submenu: [...city]
        },
        {
          name: "性质类别",
          type: "hierarchy"
        },
        {
          name: "学校属性",
          type: "hierarchy"
        }
      ];
      this.resValue = ["", "", ""];
      this.pageIndex = 1;
      this.filterKey++;
      this.apiData();
      this.getProperty();
    }
  }
};
</script>
<style scoped>
page {
  background-color: #fff;
}
.place {
  height: 44px;
}
.f-sc {
  color: #4021df;
  font-size: 24upx;
  width: 300upx;
  margin-top: -8upx;
}
</style>
