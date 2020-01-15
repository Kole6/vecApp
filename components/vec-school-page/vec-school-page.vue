<template>
  <view class="category">
    <view @tap="handleTap(item)" class="item" v-for="(item,index) in categoryArr" :key="index">
      <image class="ipc" :src="item.IPC" mode="widthFix" />
      <view class="right">
        <view class="item-name">{{item.name}}</view>
        <view class="item-desc">{{item.desc}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    categoryArr: {
      type: Array
    },
    type: String
  },
  methods: {
    handleTap(i) {
      uni.navigateTo({
        url: `/pages/indexIcon/schoolDatabase/${
          this.type == "高职" ? "GaozhiPageDetail" : "ZhongzhiPageDetail"
        }?province=${i.name}&provinceId=${i.provinceid}&schoolType=${
          this.type == "高职" ? "1" : "2"
        }`,
        animationType: "pop-in",
        animationDuration: 200
      });
    }
  }
};
</script>

<style scoped lang="scss">
.category {
  box-sizing: border-box;
  padding-top: 20upx;

  .item {
    width: 50%;
    box-sizing: border-box;
    padding: 15upx 0 20upx 30upx;
    display: inline-block;
    background: #ffffff;
    border-bottom: solid 1upx #eeeeee;

    .ipc {
      width: 122upx;
      height: 122upx;
      display: inline-block;
      vertical-align: middle;
    }

    .right {
      display: inline-block;
      vertical-align: middle;
      padding-left: 15upx;

      .item-name {
        font-size: 40upx;
        color: #333;
        font-size: 34upx;
        font-weight: 600;
      }

      .item-desc {
        font-size: 30upx;
        margin-top: 18upx;
        color: #666;
      }
    }
  }

  .item:nth-of-type(2n + 1) {
    border-right: solid 1upx $main-dividing-line1;
  }

  .item:nth-of-type(1),
  .item:nth-of-type(2) {
    border-top: solid 1upx $main-dividing-line1;
  }
}
</style>
