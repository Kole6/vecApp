<!--人气榜，各大榜单-->
<template>
  <view>
    <view class="school-list">
      <view class="list-item" v-for="(item, index) in dataArr" :key="index">
        <view v-if="rankShow" class="rank">{{ index + 1 }}</view>
        <school-list-item :showBorder="false" showType="4" :item="item" :handleTaped="true" />
      </view>
    </view>
    <!-- <uni-load-more :status="more"></uni-load-more> -->
  </view>
</template>

<script>
import schoolListItem from "@/components/vec-school-list/SchoolListItem.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: { schoolListItem, uniLoadMore },
  data() {
    return {
      dataArr: [],
      pageIndex: 1,
      pageSize: 50,
      more: "more",
      title: "",
      type: "",
      rankShow: false
    };
  },
  /* onReachBottom() {
    if (this.more == "more") {
      this.more = "loading";
      this.getData();
    }
  }, */
  onLoad(e) {
    uni.setNavigationBarTitle({
      title: e.biao2
    });
    this.title = e.biao2;
    this.type = e.type;
    this.pageSize = e.size;
    this.getData();
  },
  methods: {
    async getData() {
      //人气榜和其他榜接口不同
      var list = [];
      if (this.type == "rqb") {
        this.rankShow = true;
        list = await this.$api.apiGetRqbd(this, {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      } else {
        list = await this.$api.getSchoolRank(this, {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          type: this.type
        });
      }
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

<style lang="scss" scoped>
.m-search {
  padding: 0 40upx;
  background: #ffffff;
}
.school-list {
  box-sizing: border-box;
  background: #ffffff;
}
.list-item {
  display: flex;
  position: relative;
  align-items: center;
  border-bottom: solid 1px $main-dividing-line1;
  &:first-child {
    border-top: solid 1px $main-dividing-line1;
  }
  .rank {
    position: absolute;
    top: 45upx;
    left: 115upx;
    width: 46upx;
    height: 46upx;
    border-radius: 46upx;
    line-height: 46upx;
    font-size: $uni-font-size-base;
    text-align: center;
    background-color: #ff750f;
    color: #ffffff;
  }
}
</style>
