<template>
  <view>
    <school-list :showType="4" :listArr="dataArr" :handleTaped="false"></school-list>
    <uni-load-more :status="more"></uni-load-more>
  </view>
</template>

<script>
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    schoolList,
    uniLoadMore
  },
  data() {
    return {
      dataArr: [],
      pageIndex: 1,
      more: "more"
    };
  },
  mounted() {
    this.apiGet();
  },
  onReachBottom() {
    if (this.more == "more") {
      this.more = "loading";
      this.apiGet();
    }
  },
  methods: {
    async apiGet(key) {
      let list = await this.$api.apiGetSchoolSearchList(this, "", {
        sfbkcc: 1, //是否是本科院校
        pageIndex: this.pageIndex
      });
      if (list.length) {
        this.dataArr.push(...this.$tool.toolSchoolList(list));
        this.pageIndex += 1;
        this.more = "more";
      } else {
        this.more = "noMore";
      }
    }
  }
};
</script>
<style>
page {
  background-color: #fff;
}
</style>
<style scoped lang="scss">
.search {
  padding: 5upx 30upx;
  border-bottom: solid 1px $uni-border-color;
}
.list {
  background: #ffffff;
}
</style>
