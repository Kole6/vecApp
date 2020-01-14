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
    <!-- 商品列表 -->
    <view class="goods-list">
      <school-list
        :showType="4"
        :is-special="true"
        :listArr="listArr"
        :handleTaped="false"
        @taped="handleListTaped"
      />
    </view>
  </view>
</template>

<script>
import HMfilterDropdown from "@/components/HM-filterDropdown/HM-filterDropdown.vue";
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
export default {
  components: {
    HMfilterDropdown,
    schoolList
  },
  data() {
    return {
      indexArr: "",
      valueArr: "",
      loadingText: "正在加载...",
      filterDropdownValue: [],
      defaultSelected: [],
      listArr: [],
      filterData: [
        {
          name: "重点专业",
          type: "hierarchy",
          submenu: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "国家级",
              value: "1"
            },
            {
              name: "省级",
              value: "2"
            }
          ]
        },
        {
          name: "产业大类",
          type: "hierarchy",
          submenu: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "一类",
              value: "1"
            },
            {
              name: "二类",
              value: "2"
            },
            {
              name: "三类",
              value: "3"
            }
          ]
        },
        {
          name: "修业年限",
          type: "hierarchy",
          submenu: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "1年",
              value: "1"
            },
            {
              name: "2年",
              value: "2"
            },
            {
              name: "3年",
              value: "3"
            }
          ]
        }
      ]
    };
  },
  filters: {
    outData(value) {
      return JSON.stringify(value);
    }
  },
  mounted() {
	  this.apiGetMajors("");
  },
  //上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
  onReachBottom() {
    uni.showToast({ title: "触发上拉加载" });
  },
  methods: {
    async apiGetMajors(key) {
      let list = await this.$api.apiGetCollegeMajorSetting(this, '4114013697');
      this.listArr = this.$tool.toolMajorList(list);
    },
    confirm(e) {
      this.indexArr = e.index;
      this.valueArr = e.value;
    },
    handleListTaped() {
      console.log("点击");
    }
  }
};
</script>
<style lang="scss">
.place {
  height: 44px;
}
</style>
