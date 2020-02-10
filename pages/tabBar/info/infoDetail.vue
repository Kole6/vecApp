<template>
  <view class="content">
    <view class="png" v-if="selectNews.picurl">
      <image :src="selectNews.picurl" mode="aspectFill" />
    </view>
    <view class="info-art">
      <text class="art-title">{{selectNews.newstitle}}</text>
      <p
        class="art-info"
      >时间：{{selectNews.createtime}} &nbsp;&nbsp;&nbsp;&nbsp; 来源：{{selectNews.source}}</p>
      <text class="art-text">{{selectNews.newscontent}}</text>
    </view>
    <view class="extend">
      <view class="example-title">
        <span>延伸阅读</span>
      </view>
      <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
        <view
          class="scroll-view-item_H uni-bg-red"
          v-for="(item,index) of hotNewsList"
          :key="index"
          @tap="openInfo(item)"
        >
          <image :src="item.picurl || '/static/blank.png'" mode="aspectFill" />
          <p class="ex-title">{{item.newstitle}}</p>
          <p class="ex-time">{{item.createtime}}</p>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectNews: {},
      hotNewsList: []
    };
  },
  onShow() {
    this.selectNews = uni.getStorageSync("selectNews");
    this.hotNewsList = uni.getStorageSync("hotNewsList");
  },
  methods: {
    openInfo(i) {
      uni.setStorage({
        key: "selectNews",
        data: i
      });
      uni.redirectTo({
        url: "/pages/tabBar/info/infoDetail"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.png {
  background-color: #fff;

  image {
    width: 750upx;
  }
}

.info-art {
  font-family: PingFangSC-Regular, PingFang SC;
  background-color: #fff;
  padding: 10upx 30upx 30upx 30upx;

  .art-title {
    font-size: 34upx;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    // line-height: 70upx;
  }

  .art-info {
    font-size: 24upx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 30upx;
    margin-top: 10upx;
  }

  .art-text {
    font-size: 26upx;
    font-weight: 400;
    color: #777;
    line-height: 33upx;
  }
}

.extend {
  background-color: #fff;

  .example-title {
    font-size: 34upx;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding: 12px 14px;
    margin-top: 15upx;
    background-color: #fff;
  }
  .scroll-view_H {
    padding-bottom: 30upx;
    white-space: nowrap;
    width: 100%;
  }
  .scroll-view-item_H {
    display: inline-block;
    position: static;
    vertical-align: top;
    width: 320upx;
    text-align: center;
    image {
      padding-top: 15upx;
      width: 260upx;
      height: 240upx;
    }
    .ex-title {
      margin: 0 auto;
      white-space: normal;
      text-align: left;
      font-size: 28upx;
      color: rgba(51, 51, 51, 1);
      line-height: 38upx;
      width: 260upx;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .ex-time {
      width: 260upx;
      margin: 0 auto;
      text-align: left;
      font-size: 24upx;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 50upx;
    }
  }
}
</style>
