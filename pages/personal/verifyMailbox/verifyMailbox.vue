<template>
  <view class="content">
    <view class="list">
      <view class="list-call">
        <input class="biaoti" v-model="mailno" type="text" placeholder="请输入邮箱号" />
      </view>
      <view class="list-call">
        <input class="biaoti" v-model="code" type="number" maxlength="6" placeholder="请输入验证码" />
        <view
          class="yzm"
          :class="{ yzms: second>0 }"
          @tap="getcode"
        >{{yanzhengma}}{{second>0?'s':''}}</view>
      </view>
    </view>
    <view class="sign-in">
      <button class="vec-btn" type="primary" @tap="toIndex()">提 交</button>
    </view>
  </view>
</template>

<script>
var tha, js;
export default {
  onLoad() {
    tha = this;
  },
  onShow() {
    clearInterval(js);
    this.second = 0;
  },
  data() {
    return {
      mailno: "",
      password: "",
      code: "",
      vcode: "",
      invitation: "",
      xieyi: true,
      showPassword: false,
      second: 0
    };
  },
  computed: {
    yanzhengma() {
      if (this.second == 0) {
        return "获取验证码";
      } else {
        if (this.second < 10) {
          return "重新获取0" + this.second;
        } else {
          return "重新获取" + this.second;
        }
      }
    }
  },
  methods: {
    display() {
      this.showPassword = !this.showPassword;
    },
    xieyitong() {
      this.xieyi = !this.xieyi;
    },
    getcode() {
      if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.mailno)) {
        uni.showToast({
          title: "邮箱号格式错误！",
          icon: "none"
        });
        return;
      }
      if (this.second > 0) {
        return;
      }
      this.second = 60;
      js = setInterval(function() {
        tha.second--;
        if (tha.second == 0) {
          clearInterval(js);
        }
      }, 1000);
      this.apiSendEmailCode();
    },
    apiSendEmailCode() {
      //获取邮箱验证码
      this.$http({
        url: "/zjq/User/SendEmailCode",
        data: {
          email: this.mailno
        },
        header: "form"
      }).then(res => {
        console.log("res", res);
        if (res.code == 0) {
          this.vcode = res.data.vcode;
          uni.showToast({
            title: "发送成功，请查看邮箱！",
			icon:'none'
          });
        } else {
          uni.showModal({
            content: res.message,
            showCancel: false
          });
        }
      });
    },
    apiModiUser() {
      //修改邮箱
      this.$http({
        url: "/zjq/User/ModiUser",
        data: {
          token: uni.getStorageSync("token"),
          email: this.mailno,
          code: this.code
        },
        header: "form"
      }).then(res => {
        if (res.code == 0) {
          uni.showModal({
            content: res.message,
            showCancel: false
          });
          let userInfo = uni.getStorageSync("userInfo");
          userInfo.email = this.mailno;
          uni.setStorage({
            key: "userInfo",
            data: userInfo,
            success() {
              uni.navigateBack({
                delta: 1
              });
            }
          });
        } else {
          uni.showModal({
            content: res.message,
            showCancel: false
          });
        }
      });
    },
    toIndex() {
      if (this.code != this.vcode) {
        uni.showToast({
          title: "验证码不正确！",
          icon: "none"
        });
        return;
      }
      if (!this.mailno) {
        uni.showToast({
          title: "请输入邮箱号！",
          icon: "none"
        });
        return;
	  }
	  if (!this.code) {
        uni.showToast({
          title: "请输入验证码！",
          icon: "none"
        });
        return;
      }
	  this.apiModiUser();
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
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list {
  display: flex;
  flex-direction: column;
  padding-top: 60upx;
  padding-left: 70upx;
  padding-right: 70upx;
}

.list-call {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100upx;
  color: rgba(170, 170, 170, 1);
  border-bottom: 1upx solid #999;
}

.list-call .img {
  width: 40upx;
  height: 40upx;
}

.list-call .biaoti {
  flex: 1;
  text-align: left;
  font-size: 30upx;
  line-height: 100upx;
  margin-left: 16upx;
}

.yzm {
  color: $main-base-color;
  font-size: 25upx;
  line-height: 64upx;
  padding-left: 50upx;
  padding-right: 50upx;
  width: auto;
  height: 64upx;
  border-left: 2upx solid #999999;
}

.yzms {
  color: #999999 !important;
}

.sign-in {
  margin-top: 50px;
}
</style>
