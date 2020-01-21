<template>
  <view>
    <view class="logo">
      <p>
        <image src="/static/1024.png" mode="aspectFill" />
      </p>
      <p>真实的职教，精准的圈子</p>
      <p>android v1.2</p>
    </view>
    <view class="center_menu">
      <view class="menu_item" @tap="toYijian()" hover-class="navigator-hover">
        <text class="menu_l">意见反馈</text>
      </view>
      <view class="menu_item" @tap="toXin()" hover-class="navigator-hover">
        <text class="menu_l">检查新版本</text>
      </view>
      <!-- <view class="menu_item" @tap="toIntroduce()" hover-class="navigator-hover">
				<text class="menu_l">职教圈介绍</text>
			</view>
			<view class="menu_item" hover-class="navigator-hover" @tap="toShowWeixin()">
				<text class="menu_l">官方微信</text>
			</view>
			<view class="menu_item" hover-class="navigator-hover" @tap="toPhone()">
				<text class="menu_l">联系我们</text>
      </view>-->
    </view>
    <view class="box" :style="{height:`${scrollH - 580}upx`}">
      <view class="inner">
        <p>
          <span @tap="toUserAgree()">用户协议</span>
          <span class="mail">|</span>
          <span @tap="toUserAgree2()">隐私政策</span>
        </p>
        <p class="mail">公司邮箱：zhijiaoquan123@163.com</p>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    scrollH() {
      let sys = uni.getSystemInfoSync();
      return parseInt(sys.windowHeight * (750 / sys.windowWidth));
    }
  },
  methods: {
    toIntroduce() {
      uni.navigateTo({
        url: "./introduce"
      });
    },
    toShowWeixin() {
      uni.showModal({
        content: "请搜索微信公众号: 职教圈",
        showCancel: false
      });
    },
    toPhone() {
      uni.showModal({
        content: "拨打: 021-62866809",
        success: function(res) {
          if (res.confirm) {
            uni.makePhoneCall({
              phoneNumber: "021-62866809"
            });
          } else if (res.cancel) {
            console.log("取消拨打");
          }
        }
      });
    },
    toNotopen() {
      uni.showToast({
        icon: "none",
        title: "暂未开通",
        position: "bottom"
      });
    },
    toUserAgree() {
      this.$tool.toolWeb("用户协议");
    },
    toUserAgree2() {
      this.$tool.toolWeb("隐私政策");
    },
    toYijian() {
      uni.navigateTo({
        url: "/pages/personal/feedback/feedback"
      });
    },
    toXin() {
      uni.showToast({
        title: "当前已经是最新的版本！",
        icon: "none"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.logo {
  border-top: 1px solid rgba(238, 238, 238, 1);
  width: 750upx;
  height: 340upx;
  background-color: #fff;
  text-align: center;

  image {
    width: 125upx;
    height: 125upx;
    border-radius: 20upx;
  }

  p:nth-child(1) {
    padding-top: 40upx;
  }

  p:nth-child(2) {
    font-size: 30upx;
    font-weight: 700;
    color: #666;
    padding-top: 22upx;
  }

  p:nth-child(3) {
    font-size: 30upx;
    font-weight: 400;
    color: #999;
    padding-top: 18upx;
  }
}

.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .inner {
    width: 500upx;
    height: 80upx;
    text-align: center;
    font-size: 26upx;
    color: rgba(114, 97, 253, 1);
    line-height: 40upx;

    .mail {
      font-size: 24upx;
      color: rgba(153, 153, 153, 1);
      padding: 0 5px;
    }
  }
}

.center_menu {
  width: 100%;

  .menu_item {
    width: 100%;
    font-size: 30upx;
    height: 90upx;
    letter-spacing: 1px;
    background: #fff;
    overflow: hidden;
    display: inline-block;
    border-bottom: 1px solid #efefef;

    &::after {
      content: "";
      width: 30upx;
      height: 30upx;
      position: absolute;
      right: 3%;
      background: url("../../../static/right.png") no-repeat;
      background-size: 100%;
      margin-top: 30upx;
    }

    .center_menu--hover {
      background-color: #f1f1f1;
    }

    .menu_l {
      width: 300upx;
      position: absolute;
      line-height: 90upx;
      padding-left: 5%;
    }

    .menu_r {
      position: absolute;
      color: #808080;
      right: 9%;
      width: 350upx;
      text-align: right;
    }

    .menu_r_png {
      width: 60upx;
      height: 60upx;
      margin-top: 10upx;
    }

    .menu_r_text {
      line-height: 90upx;
    }

    .icon-menu {
      font-size: 36upx;
      color: #15d9a8;
    }

    &:nth-child(1) {
      margin-top: 5px;
    }
  }
}
</style>
