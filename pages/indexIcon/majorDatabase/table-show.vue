<template>
  <view>
    <view class="t-table" :style="{ maxHeight: tableHeight, width: tableWidth }">
      <view class="t-row t-title">
        <view class="t-th">专业名称</view>
        <view class="t-th" v-for="(item, index) in bodyList" :key="index">{{ item.majorname }}</view>
      </view>
      <view class="t-row" v-for="(row, index) in keyList" :key="index">
        <view class="t-td">{{row.name}}</view>
        <view
          class="t-td"
          v-for="(item, i) in bodyList"
          :key="i"
        >{{row.value=='x1'?'-': (item[row.value] || '-')}}</view>
      </view>
      <view class="m-btn">
        <button class="vec-btn" type="primary" @tap="toEmail()">下载对比报告</button>
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
        { name: "衔接高职专业举例", value: "xjgz" },
        { name: "当年招生人数", value: "x1" },
        { name: "当年在校生人数", value: "x1" },
        { name: "当年毕业生人数", value: "x1" },
        { name: "本专业教师总数", value: "x1" }
      ]
    };
  },
  methods: {
    refresh() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    toEmail() {
      uni.showToast({
        title: "暂未开通",
        icon: "none"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.t-table {
  box-sizing: border-box;
  width: 100%;
  padding: 0 0upx;
  overflow: auto;
  $border-color: #fff;
  .t-title {
    position: sticky;
    top: 0;
    background: #ffffff;
    z-index: 10;
    padding: 0;
    color: #666666;
    .t-th {
      font-weight: 600;
    }
  }
  .m-btn {
    position: sticky;
    bottom: 0;
    background: #f6f8fe;
    z-index: 10;
    padding: 35upx 0 25upx 0;
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
    }
    .t-td:nth-of-type(even),
    .t-th:nth-of-type(even) {
      background-color: #eaeff8;
    }
    .t-td {
      padding: 20upx 10upx;
    }
  }
  .wrap {
    margin: 20upx;
  }
}
</style>
