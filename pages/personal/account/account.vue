<template>
  <view>
    <view class="center_menu" hover-class="center_menu--hover">
      <!-- <view class="menu_item" @tap="handleModifyAvatar">
				<text class="menu_l">头像</text>
				<view class="menu_r">
					<image :src="picUrl" class="menu_r_png" mode="aspectFill" />
				</view>
      </view>-->
      <view class="menu_item" @tap="toPhone(userInfo.phone)">
        <text class="menu_l">手机</text>
        <view class="menu_r" v-if="userInfo.phone">
          <text class="menu_r_text">{{userInfo.phone}}</text>
        </view>
        <view class="menu_r" v-else>
          <text class="menu_r_text">未绑定</text>
        </view>
      </view>
      <view class="menu_item" @tap="toPwd()">
        <text class="menu_l">密码</text>
        <text class="menu_r">
          <text class="menu_r_text">修改密码</text>
        </text>
      </view>
      <view class="menu_item" @tap="toNi()">
        <text class="menu_l">昵称</text>
        <view class="menu_r">
          <text class="menu_r_text">{{nickname}}</text>
        </view>
      </view>
      <view class="menu_item" @tap="toMail(userInfo.email)">
        <text class="menu_l">邮箱</text>
        <view class="menu_r" v-if="userInfo.email">
          <text class="menu_r_text">{{userInfo.email}}</text>
        </view>
        <view class="menu_r" v-else>
          <text class="menu_r_text">未绑定</text>
        </view>
      </view>
      <!-- <view class="menu_item" @tap="clickYao()">
				<text class="menu_l">我的邀请码</text>
				<text class="menu_r"><text class="menu_r_text">9967</text></text>
      </view>-->
    </view>
    <view class="outSign">
      <button class="vec-btn" type="primary" @tap="toRecharge()">退出登录</button>
    </view>
    <view class="content">
      <chunLei-modal
        v-model="value"
        :mData="inputData"
        :type="type"
        @onConfirm="onConfirm"
        @onCancel="onCancel"
        navMask
      ></chunLei-modal>
    </view>
  </view>
</template>

<script>
import chunLeiModal from "@/components/chunLei-modal/chunLei-modal.vue";
export default {
  components: {
    chunLeiModal
  },
  onLoad() {
    this.userInfo = uni.getStorageSync("userInfo");
  },
  data() {
    return {
      userInfo: {},
      picUrl: "/static/p106.png",
      nickname: uni.getStorageSync("userInfo").nickname || "输入昵称",
      type: "input",
      value: false,
      inputData: {
        title: "修改昵称",
        content: [
          {
            content: "",
            placeholder: "请输入昵称"
          }
        ]
      }
    };
  },
  onShow() {
    this.picUrl = uni.getStorageSync("avatar") || "/static/p106.png";
  },
  methods: {
    // 修改头像
    handleModifyAvatar() {
      console.log("==");
      uni.navigateTo({
        url: "/pages/personal/avatarSet/AvatarSet"
      });
    },
    apiModifyNickName(nickname, token) {
      this.$http({
        url: "/zjq/User/ModifyNickName",
        header: "form",
        data: {
          nickname,
          token
        }
      }).then(
        res => {
          if (res.code == 0) {
            this.nickname = nickname;
            this.userInfo.nickname = nickname;
            uni.setStorage({
              key: "userInfo",
              data: this.userInfo
            });
            uni.showToast({
              title: "修改成功",
              icon: "none"
            });
          } else {
            uni.showModal({
              content: res.message,
              showCancel: false
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    //模态框确认
    onConfirm(e) {
      if (e[0].content) {
        this.apiModifyNickName(e[0].content, uni.getStorageSync("token"));
      } else {
        uni.showToast({
          title: "昵称为空，修改失败",
          icon: "none"
        });
      }
      e[0].content = "";
    },
    onCancel(e) {},
    toLogin() {
      uni.navigateTo({
        url: "/pages/login/signIn/signIn"
      });
    },
    toPhone(p) {
      uni.navigateTo({
        url: "/pages/personal/modifyPhone/modifyPhone"
      });
      /* if (p) {
        uni.showToast({
          title: "已绑定手机号"
        });
      } else {
        uni.navigateTo({
          url: "/pages/personal/modifyPhone/modifyPhone"
        });
      } */
    },
    toPwd() {
      uni.navigateTo({
        url: "/pages/login/forget/forget"
      });
    },
    toNi() {
      this.value = true;
    },
    toMail(p) {
      uni.navigateTo({
        url: "/pages/personal/verifyMailbox/verifyMailbox"
      });
    },
    toRecharge() {
      uni.reLaunch({
        url: "/pages/login/signIn/signIn"
      });
    },
    clickYao() {
      // #ifdef APP-PLUS
      uni.showToast({
        title: "复制邀请码成功",
        position: "bottom"
      });
      // #endif
      // #ifndef APP-PLUS
      uni.showToast({
        title: "复制成功",
        icon: "none"
      });
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: "9967",
        success: function() {
          console.log("copy success");
        }
      });
      // #endif
    }
  }
};
</script>

<style scoped lang="scss">
.center_menu {
  width: 100%;

  .menu_item {
    width: 100%;
    font-size: 28upx;
    height: 80upx;
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
      margin-top: 25upx;
    }

    .center_menu--hover {
      background-color: #f1f1f1;
    }

    .menu_l {
      width: 300upx;
      position: absolute;
      line-height: 80upx;
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
      line-height: 80upx;
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

.outSign {
  margin-top: 60px;
}
</style>
