 <!-- 专业对比-详细 -->
<template>
  <view>
    <!-- 搜索框 -->
    <view class="m-top">
      <view class="content">
        <view class="left">
          <view class="item" v-for="(item,index) in bodyList" :key="index">{{item.majorname}}</view>
        </view>
        <view class="right">
          <image
            src="/static/indexIcon/pk-vs.png"
            mode="aspectFit"
            style="width: 183upx; height: 106upx;"
          />
        </view>
      </view>
    </view>
    <view class="m-title">
      <text>专业对比信息</text>
    </view>
    <!-- <view style="height:600upx"></view> -->
    <view class="m-table">
      <table-show
        showType="1"
        :tableHeight="tableHeight"
        :tableWidth="tableWidth"
        :bodyList="bodyList"
      ></table-show>
    </view>
  </view>
</template>

<script>
import tableShow from "./table-show.vue";
export default {
  components: { tableShow },
  data() {
    return {
      tableHeight: "0",
      tableWidth: "750upx",
      bodyList: []
    };
  },
  onLoad(e) {
    this.tableHeight = uni.getSystemInfoSync().windowHeight+"px";
    this.getData(e.ids);
  },
  methods: {
    async getData(zyids) {
      this.bodyList = await this.$api.apiMyZydb(this, zyids);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./pkDetail.scss";
</style>
