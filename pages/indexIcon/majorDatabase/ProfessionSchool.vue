<template>
  <view class="h-top">
    <HMfilterDropdown
      :filterData="filterData"
      :defaultSelected="defaultSelected"
      :updateMenuName="true"
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
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import city from "@/common/city.js";
export default {
  components: {
    HMfilterDropdown,
    schoolList,
    uniLoadMore
  },
  data() {
    return {
      dataArr: [],
      filterDropdownValue: [],
      defaultSelected: [],
      pageIndex: 1,
      more: "more",
      filterData: [
        {
          name: "城市",
          type: "hierarchy",
          submenu: [...city]
        },
        {
          name: "高职", //这个前端定义
          type: "hierarchy",
          submenu: [
            {
              name: "高职",
              value: "1"
            },
            {
              name: "中职",
              value: "2"
            }
          ]
        },
        {
          name: "性质类别",
          type: "hierarchy",
          submenu: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "一产",
              value: "1"
            },
            {
              name: "二产",
              value: "2"
            },
            {
              name: "三产",
              value: "3"
            }
          ]
        },
        {
          name: "学校属性",
          type: "hierarchy",
          submenu: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "一产",
              value: "1"
            },
            {
              name: "二产",
              value: "2"
            },
            {
              name: "三产",
              value: "3"
            }
          ]
        },
        
      ],
      resValue:[]
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
  onLoad() {
    //获取性质类别和学校属性 高职和中职不同
    
    this.apiData();
  },
  methods: {
    confirm(e) {
      this.resValue = this.$tool.toolHMfilter(e.value)
      console.log('this.resValue',this.resValue)
      this.pageIndex = 1;
      this.apiData();
    },
    async apiData() {
      let list = await this.$api.apiGetXxByZy(this, {
        zyid: "510102",
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
</style>
