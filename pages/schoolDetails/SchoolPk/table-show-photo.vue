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
          <view class="t-td" v-for="(item, i) in bodyList" :key="i">{{item[row.value] || '-'}}</view>
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
  },
  watch: {
    tableHeight() {
      this.refresh();
    }
  },
  data() {
    return {
      keyList: []
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
@import './tableShow.scss';
</style>