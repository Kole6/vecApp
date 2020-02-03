<template>
  <view class="content">
    <view class="search">
      <uni-search-bar placeholder="搜索" radius="100" @input="input" @confirm="search" />
    </view>
    <view class="cai"></view>
    <zi-xun :newList="newList" />
    <uni-load-more :status="more"></uni-load-more>
  </view>
</template>

<script>
import ziXun from "@/components/ziXun/ziXunLeft.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
export default {
  components: {
    ziXun,
    uniLoadMore,
    uniSearchBar
  },
  data() {
    return {
      newList: [],
      pageIndex: 1,
      more: "more",
      resValue: ""
    };
  },
  onLoad() {
    this.apiGetNews();
  },
  /* 上拉 */
  onReachBottom() {
    if (this.more == "more") {
      this.more = "loading";
      this.apiGetNews();
    }
  },
  /* 下拉 */
  onPullDownRefresh() {
    this.pageIndex = 1;
    this.apiGetNews();
  },
  methods: {
    search(res) {
      this.pageIndex = 1;
      this.more = "loading";
      this.apiGetNews();
    },
    input(res) {
      this.resValue = res.value;
    },
    async apiGetNews() {
      let list = await this.$api.apiGetNews(this, {
        pageIndex: this.pageIndex,
        key: this.resValue
      });
      uni.stopPullDownRefresh();
      this.pageIndex = this.$tool.toolMore(
        this,
        "newList",
        "more",
        this.pageIndex,
        list
      );
    }
  }
};
</script>
<style scoped lang="scss">
.search {
  width: 690upx;
  border-top: 1px solid rgb(238, 238, 238);
  padding: 0 30upx;
  position: fixed;
  z-index: 100;
  background-color: #f6f8fe;
}
.cai {
  height: 50px;
}
</style>
