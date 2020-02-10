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
  props: {
    sid: String,
    listArr: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      indexArr: "",
      valueArr: "",
      loadingText: "正在加载...",
      filterDropdownValue: [],
      defaultSelected: [],
      filterData: [
        {
          name: "重点专业", //type:zdzy
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
          name: "产业大类", //type:cydl
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
          name: "学历层次", //这个前端定义
          type: "hierarchy",
          submenu: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "高职",
              value: "1"
            },
            {
              name: "中职",
              value: "2"
            }
          ]
        }
      ]
    };
  },
  /* filters: {
    outData(value) {
      return JSON.stringify(value);
    }
  }, */
  methods: {
    confirm(e) {
      // this.indexArr = e.index;
      // this.valueArr = e.value;
      this.$emit('searchSetting',e.value)
    },
    handleListTaped({ item, index }) {
      this.$tool.toolistoolTiaoToken(
        `/pages/indexIcon/majorDatabase/ProfessionDesc?id=${
          item.majorcode
        }&name=${item.majorname}&type=${item.xlcc == "中职" ? 2 : 1}`
      );
    }
  }
};
</script>
<style lang="scss">
.place {
  height: 44px;
}
</style>
