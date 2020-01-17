<template>
  <view>
    <view class="t-table" :style="{  maxHeight: tableHeight , width: tableWidth }">
      <view class="t-row t-title">
        <view class="t-th">学校名称</view>
        <view class="t-th" v-for="(item, index) in bodyList" :key="index">{{ item.schoolname }}</view>
      </view>
      <scroll-view scroll-y class="t-body">
        <view class="t-row" v-for="(row, index) in keyList" :key="index">
          <view class="t-td">{{row.name}}</view>
          <view class="t-td" v-for="(item, i) in bodyList" :key="i">{{item[row.value]}}</view>
        </view>
      </scroll-view>
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
        { name: "所在地", value: "city" },
        { name: "建校时间", value: "establishdate" },
        { name: "办学层次", value: "schooltype" },
        { name: "举办者", value: "organizer" },
        { name: "是否为重点（示范）学校", value: "sfzd" },
        { name: "在校生总数/人", value: "zxs" },
        { name: "学校占地面积/平方公里", value: "zdmj" },
        { name: "师生比", value: "ssb" },
        { name: "双师型教师占比", value: "ssjsb" },
        { name: "专业设置数", value: "zysz" },
        { name: "技能大赛获奖数", value: "jnds" },
        { name: "本科以上专任教师占比", value: "bkjsb" },
        { name: "高讲教师占比", value: "gjjsb" },
        { name: "就业率", value: "jyl" },
        { name: "兼职教师占专任教师比例", value: "jzjsb" }
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
  overflow: auto;
  $border-color: #fff;
  .t-title {
    position: fixed;
    top: 0;
    background: #ffffff;
    z-index: 10;
    padding: 0;
    width: 750upx;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    color: #666666;
    .t-th {
      font-weight: 600;
    }
  }
  .t-body {
    padding-top: 45upx;
    padding-bottom: 120upx;
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
      background-color: #f6f8fe;
    }
    .t-td {
      padding: 30upx 10upx;
    }
  }
  .m-btn {
    position: fixed;
    bottom: 0;
    background: #ffffff;
    z-index: 10;
    padding: 25upx 0;
    width: 750upx;
  }
  .wrap {
    margin: 20upx;
  }
}
</style>