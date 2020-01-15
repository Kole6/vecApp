<template>
  <view class="content">
    <swiper class="swiper" :autoplay="autoplay" :duration="duration" @change="change">
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img1">
            <image src="/static/guide/p002_1.png" mode="widthFix" />
          </view>
          <view class="swiper-item-img2">
            <image src="/static/guide/p002_2.png" mode="aspectFill" />
          </view>
          <view class="spot">
            <view
              v-for="(item,index) in 4"
              :key="item"
              :class="[index==selIndex ? 'spot-s' : '','spot-t']"
            ></view>
          </view>
        </view>
        <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img1">
            <image src="/static/guide/p001_1.png" mode="widthFix" />
          </view>
          <view class="swiper-item-img2">
            <image src="/static/guide/p001_2.png" mode="aspectFill" />
          </view>
          <view class="spot">
            <view
              v-for="(item,index) in 4"
              :key="item"
              :class="[index==selIndex ? 'spot-s' : '','spot-t']"
            ></view>
          </view>
        </view>
        <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img1">
            <image src="/static/guide/p004_1.png" mode="widthFix" />
          </view>
          <view class="swiper-item-img2">
            <image src="/static/guide/p004_2.png" mode="aspectFill" />
          </view>
          <view class="spot">
            <view
              v-for="(item,index) in 4"
              :key="item"
              :class="[index==selIndex ? 'spot-s' : '','spot-t']"
            ></view>
          </view>
        </view>
        <view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item">
          <view class="swiper-item-img1">
            <image src="/static/guide/p003_1.png" mode="widthFix" />
          </view>
          <view class="swiper-item-img2">
            <image src="/static/guide/p003_2.png" mode="aspectFill" />
          </view>
          <view class="spot">
            <view class="experience" @tap="launchFlag()">{{experience}}</view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { ConfigEdition } from "@/config";
export default {
  data() {
    return {
      autoplay: false,
      duration: 500,
      jumpover: "跳过",
      experience: "立即体验",
      selIndex: 0
    };
  },
  methods: {
    launchFlag: function() {
      /**
       * 向本地存储中设置launchFlag的值，即启动标识；
       */
      uni.setStorage({
        key: String("launchFlag" + ConfigEdition),
        data: true
      });
      uni.switchTab({
        url: "/pages/tabBar/index/index"
      });
    },
    change(e) {
      this.selIndex = e.detail.current;
    }
  }
};
</script>
<style>
page,
.content {
  width: 100%;
  height: 100%;
  background-size: 100% auto;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.swiper-item {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
}

.swiper-item-img1,
.swiper-item-img2 {
  width: 100%;
}

.swiper-item-img1 image {
  width: 750upx;
  height: 780upx;
}

.swiper-item-img2 image {
  width: 750upx;
  height: 100upx;
}

.swiper-item-img2 {
  margin-top: 100upx;
}

.jump-over {
  position: absolute;
  height: 60upx;
  line-height: 60upx;
  padding: 0 40upx;
  border-radius: 30upx;
  font-size: 32upx;
  color: #6451fc;
  border: 1px solid #6451fc;
  z-index: 999;
  right: 45upx;
  top: 85upx;
}

.experience {
  border-radius: 30upx;
  font-size: 32upx;
  color: #6451fc;
  border: 1px solid #6451fc;
  padding: 11upx 50upx;
  margin-top: 20upx;
}

.spot {
  height: 80upx;
  margin: 0 auto;
}

.spot-t {
  display: inline-block;
  margin-left: 15upx;
  width: 28upx;
  height: 7upx;
  background: #eee;
}

.spot-s {
  background: #6451fc;
}
</style>
