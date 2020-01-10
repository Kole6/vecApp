<template>
  <view>
    <view>
      <view class="t-table" :style="{ height: tableHeight, width: tableWidth }">
        <view class="t-row t-title">
          <view class="t-th">专业名称</view>
          <view class="t-th" v-for="(item, index) in bodyList" :key="index">{{ item.majorname }}</view>
        </view>
        <view class="t-row" v-for="(row, index) in keyList" :key="index">
          <view class="t-td">{{row.name}}</view>
          <view class="t-td" v-for="(item, i) in bodyList" :key="i">{{item[row.value]}}</view>
          <!-- <view class="t-td">{{row.name}}</view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tableHeight: String,
    tableWidth: String,
    bodyList: Array,
    showType: [String, Number]
  },
  watch: {
    tableHeight() {
      this.refresh();
    }
  },
  data() {
    return {
      keyList: [
        { name: "专业代码", value: "majorcode" },
        { name: "学历层次", value: "xlcc" },
        { name: "修业年限", value: "zynx" },
        { name: "学校开设数量", value: "xxkszs" },
        { name: "主要对应职业类型", value: "mainzylx" },
        { name: "衔接高职专业举例", value: "xjgz" }
      ]
    };
  },
  methods: {
    refresh() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped lang="scss">
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
    .t-td:last-child,
    .t-th:last-child {
      // border-right: solid 1px $border-color;
    }
  }
  .t-row:last-child {
    .t-td,
    .t-th {
      // border-bottom: solid 1px $border-color;
    }
  }
}
.wrap {
  margin: 20upx;
}
</style>
