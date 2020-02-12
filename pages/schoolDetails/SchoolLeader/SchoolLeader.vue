<template>
  <view>
    <view class="m-list" v-for="(item, index) in dataArr" :key="index">
      <view class="avatar">{{ item.firstname }}</view>
      <view class="name">{{ item.name }}</view>
      <view class="position">
        <text>{{ item.position }}</text>
        <!-- <text v-for="(tag, i) in item.tags" :key="i">{{ tag }}</text> -->
      </view>
    </view>
  </view>
</template>

<script>
import loadMore from "@/components/loadMore/you-scroll.vue";
export default {
  components: { loadMore },
  data() {
    return {
      loadStatus: "noMore",
      systemInfo: uni.getSystemInfoSync(),
      page: {
        pageIndex: 1,
        pageSize: 10,
        sid: ""
      },
      dataArr: []
    };
  },
  onLoad(e) {
    this.page.sid = e.sid;
    this.getData();
  },
  methods: {
    onPullDown(done) {
      this.getData().then(() => {
        done();
      });
    },
    onLoadMore() {
      this.loadStatus = "loading";
      this.getData();
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$http({
          url: "/zjq/College/GetLeaderInfo",
          method: "POST",
          data: {
            sid: this.page.sid,
            token: uni.getStorageSync("token")
          },
          header: "form"
        })
          .then(data => {
            if (data.code == 0) {
              this.dataArr = [...data.data];
            } else {
              uni.showModal({
                content: data.message,
                icon: "none"
              });
            }
            resolve();
          })
          .catch(err => {
            reject();
          });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.m-list {
  padding: 30upx 30upx;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: solid 1upx $main-dividing-line1;
  font-size: $uni-font-size-lg;
  &:first-child {
    border-top: solid 1upx $main-dividing-line1;
  }
  .avatar {
    box-sizing: border-box;
    display: inline-flex;
    width: 100upx;
    height: 100upx;
    border-radius: 100upx;
    background: #ffffff;
    border: solid 1px #68bcf5;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    font-size: 45upx;
    color: #fff;
    background-color: #68bcf5;
  }
  .name {
    margin-left: 20upx;
    font-size: $uni-font-size-lg;
    color: $main-text-color;
  }
  .position {
    text {
      margin-left: 20upx;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 2upx 11upx;
      border-radius: 5upx;
      background: #6451fc;
      color: #ffffff;
      // border: solid 1upx $main-base-color;
      font-size: $uni-font-size-base;
    }
  }
}
</style>
