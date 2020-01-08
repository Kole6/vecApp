<template>
  <view class>
    <load-more
      ref="scroll"
      @onPullDown="onPullDown"
      @onLoadMore="onLoadMore"
      :styleObj="{ height: systemInfo.screenHeight - 80 + 'px' }"
      :loadStatus="loadStatus"
    >
      <view class="list">
        <school-list showType="4" :listArr="dataArr" />
      </view>
    </load-more>
  </view>
</template>

<script>
import schoolList from '@/components/vec-school-list/vec-school-list.vue';
import { schoolData } from "../mockData.js";
import loadMore from "@/components/loadMore/you-scroll.vue";
export default {
  components: { schoolList, loadMore },
  data() {
    return {
      dataArr: [],
      loadStatus: "more",
      systemInfo: uni.getSystemInfoSync(),
      page: {
        pageIndex: "1",
        pageSize: "10"
      }
    };
  },
  mounted() {
    this.onLoadMore();
  },
  methods: {
    testData() {},
    onPullDown(done) {
      this.page.pageIndex = 1;
      this.getData(true).finally(() => {
        done();
      });
    },
    onScroll() {},
    onLoadMore() {
      this.loadStatus = "loading";
      this.getData().then(isLastPage => {
        if (isLastPage) {
          this.loadStatus = "noMore";
        } else {
          this.loadStatus = "more";
        }
      });
    },
    getData(refresh = false) {
      return new Promise((resolve, reject) => {
        this.$HTTP({
          url: "/zjq/College/GetSchoolSearchList",
          header: "form",
          data: {
            token: uni.getStorageSync("token"),
            key: "",
            pageIndex: this.page.pageIndex,
            pageSize: this.page.pageSize,
            sfbkcc: "1" //是否是本科院校
          }
        })
          .then(res => {
            if (res.code == 0) {
              let data = res.data.list.map(item => {
                return {
                  ...item,
                  title: item.schoolname,
                  cards: item.tags.split(",").map(item => {
                    return {
                      name: item
                    };
                  }),
                  tags: [
                    { name: "地区", value: item.area },
                    { name: "层次", value: item.level }
                  ]
                };
              });
              if (refresh) {
                this.dataArr = data;
                this.page.pageIndex = "1";
              } else {
                this.dataArr.push(...data);
                this.page.pageIndex = res.data.pageNumber + 1 + "";
              }
            }
            resolve(res.data.lastPage);
          })
          .catch(err => {
            reject(err);
          });
      });
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
