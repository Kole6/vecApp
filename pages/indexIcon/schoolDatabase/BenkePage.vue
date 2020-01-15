<template>
  <view>
    <school-list :showType="4" :listArr="dataArr" :handleTaped="false"></school-list>
  </view>
</template>

<script>
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
export default {
  components: {
    schoolList
  },
  data() {
    return {
      dataArr: [],
      page: {
        pageIndex: "1",
        pageSize: "10"
      }
    };
  },
  mounted() {
    this.apiGet();
  },
  methods: {
    async apiGet(key) {
      let list = await this.$api.apiGetSchoolSearchList(this, "", {
        sfbkcc: 1, //是否是本科院校
        pageSize: 1000
      });
      this.dataArr = this.$tool.toolSchoolList(list);
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 5upx 30upx;
  border-bottom: solid 1px $uni-border-color;
}
.list {
  background: #ffffff;
}
</style>
