<template>
  <view>
    <view class="tui">
      <image src="/static/p406.png" mode="aspectFill" />
      <view class="tou">
        <view class="tou-img">
          <image :src="userInfo.photo || '/static/p106.png'" mode="aspectFill" />
        </view>
        <view class="tou-vip">
          <p>普通用户</p>
        </view>
        <view class="tou-name">
          <p>{{userInfo.nickname || userInfo.username}}</p>
        </view>
      </view>
    </view>
    <view class="box" :style="{height:`${scrollH - 520}upx`}">
      <view class="inner">
        <view class="order">
          <text class="line"></text>
          <text class="txt">分享给朋友</text>
          <text class="line"></text>
        </view>
        <!-- #ifdef APP-PLUS -->
        <view class="inner-fen">
          <view class="fen-item" hover-class="navigator-hover" @tap="toWeixin()">
            <p>
              <image src="/static/p401.png" mode="aspectFill" />
            </p>
            <p>微信好友</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toWeixinLine()">
            <p>
              <image src="/static/p402.png" mode="aspectFill" />
            </p>
            <p>朋友圈</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toQQ()">
            <p>
              <image src="/static/p403.png" mode="aspectFill" />
            </p>
            <p>QQ</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p404.png" mode="aspectFill" />
            </p>
            <p>QQ空间</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p405.png" mode="aspectFill" />
            </p>
            <p>微博</p>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifndef APP-PLUS -->
        <view class="inner-fen">
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p401.png" mode="aspectFill" />
            </p>
            <p>微信好友</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p402.png" mode="aspectFill" />
            </p>
            <p>朋友圈</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p403.png" mode="aspectFill" />
            </p>
            <p>QQ</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p404.png" mode="aspectFill" />
            </p>
            <p>QQ空间</p>
          </view>
          <view class="fen-item" hover-class="navigator-hover" @tap="toNotopen()">
            <p>
              <image src="/static/p405.png" mode="aspectFill" />
            </p>
            <p>微博</p>
          </view>
        </view>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {
    this.userInfo = uni.getStorageSync("userInfo");
  },
  computed: {
    scrollH() {
      let sys = uni.getSystemInfoSync();
      return parseInt(sys.windowHeight * (750 / sys.windowWidth));
    }
  },
  methods: {
    toQQ() {
      uni.share({
        provider: "qq",
        title: "职教圈",
        summary: "真实的职教，精准的圈子",
        imageUrl:
          "https://tva4.sinaimg.cn/crop.0.0.239.239.180/005yBM71gw1ej3w1571gfj306o06omxm.jpg",
        href: "https://weibo.com/u/5092062667",
        success: res => {
          console.log(res);
        },
        fail: e => {
          console.log(e);
        }
      });
    },
    toWeixin() {
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        title: "职教圈",
        summary: "真实的职教，精准的圈子",
        imageUrl:
          "https://tva4.sinaimg.cn/crop.0.0.239.239.180/005yBM71gw1ej3w1571gfj306o06omxm.jpg",
        href: "https://weibo.com/u/5092062667",
        success: res => {
          console.log(res);
        },
        fail: e => {
          console.log(e);
        }
      });
    },
    toWeixinLine() {
      uni.share({
        provider: "weixin",
        scene: "WXSenceTimeline",
        title: "职教圈",
        summary: "真实的职教，精准的圈子",
        imageUrl:
          "https://tva4.sinaimg.cn/crop.0.0.239.239.180/005yBM71gw1ej3w1571gfj306o06omxm.jpg",
        href: "https://weibo.com/u/5092062667",
        success: res => {
          console.log(res);
        },
        fail: e => {
          console.log(e);
        }
      });
    },
    toNotopen() {
      uni.showToast({
        icon: "none",
        title: "暂未开通",
        position: "bottom"
      });
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
.tui {
  image {
    height: 500upx;
    width: 750upx;
  }
  .tou {
    width: 230upx;
    height: 280upx;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    margin-top: -190upx;
    text-align: center;
    .tou-img {
      image {
        width: 200upx;
        height: 200upx;
      }
    }
    .tou-vip {
      width: 168upx;
      height: 45upx;
      background-color: #6451fc;
      border-radius: 10upx;
      color: #fff;
      font-size: 30upx;
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      margin-top: -38upx;
    }
    .tou-name {
      font-size: 36upx;
      color: rgba(51, 51, 51, 1);
      padding-top: 20upx;
    }
  }
}
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .inner {
    width: 750upx;
    height: 330upx;
    text-align: center;
    // border: 1px solid #007AFF;
    .inner-fen {
      margin-top: 120upx;
      .fen-item {
        text-align: center;
        display: inline-block;
        padding: 0 30upx;
        p:nth-child(1) {
          image {
            width: 59upx;
            height: 59upx;
          }
        }
        p:nth-child(2) {
          font-size: 28upx;
          color: rgba(102, 102, 102, 1);
          line-height: 40upx;
        }
      }
    }
  }
  .order {
    padding: 0upx 30upx;
    font-size: 28upx;
    display: flex;
    .line {
      flex: 1;
      border-top: 1px solid rgba($color: #ccc, $alpha: 0.8);
      position: relative;
      top: 18upx;
    }
    .txt {
      color: #333;
      padding: 0 18upx;
      vertical-align: middle;
    }
  }
}
</style>