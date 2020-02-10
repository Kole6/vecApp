<template>
  <view>
    <view
      class="ziXun"
      hover-class="navigator-hover"
      v-for="(item,index) in newList"
      :key="index"
      @tap="openInfo(item)"
    >
      <view class="z-left">
        <image mode="aspectFill" :src="item.picurl || '/static/blank.png'" class="image1" />
      </view>
      <view class="z-right">
        <p class="left-title">{{item.newstitle}}</p>
        <p class="left-text">{{`时间：${item.createtime} 来源：${item.source}`}}</p>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    newList: {
      type: Array
    }
  },
  methods: {
    openInfo(i) {
      uni.setStorage({
        key: "selectNews",
        data: i
      });
      uni.navigateTo({
        url: "/pages/tabBar/info/infoDetail"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ziXun {
  width: 750upx;
  height: 200upx;
  background-color: white;
  border-bottom: 1px #f8faff solid;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .z-right {
    padding-right: 26upx;
	// border: 1px solid red;
    .left-title {
      width: 445upx;
      height: 80upx;
      font-size: 28upx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 40upx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .left-text {
	  width: 445upx; 
      font-size: 20upx;
	  line-height: 36upx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-top: 10upx;
    }
  }

  .image1 {
    margin-left: 26upx;
    width: 210upx;
    height: 140upx;
    border-radius: 10px;
  }
}
</style>
