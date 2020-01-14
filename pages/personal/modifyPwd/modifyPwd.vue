<template>
  <view class="content">
    <view class="list">
      <view class="list-call">
        <input
          class="biaoti"
          v-model="password"
          type="text"
          maxlength="20"
          placeholder="请输入新密码"
          :password="!showPassword"
        />
        <image class="img" :src="showPassword?'/static/p702.png':'/static/p701.png'" @tap="display" />
      </view>
      <view class="list-call">
        <input
          class="biaoti"
          v-model="password2"
          type="text"
          maxlength="20"
          placeholder="确认新密码"
          :password="!showPassword2"
        />
        <image class="img" :src="showPassword2?'/static/p702.png':'/static/p701.png'" @tap="display2" />
      </view>
    </view>
    <view class="jieshi">
      <text>密码必须是6-20个英文字母、数字或者符号（除空格）。</text>
    </view>
    <view class="sign-in">
      <button class="vec-btn" type="primary" @tap="toSub()">提 交</button>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(e) {
    console.log("phone", e);
    this.phoneno = e.phoneno;
    this.code = e.code;
  },
  data() {
    return {
      phoneno: "",
      code: "",
      password: "",
      password2: "",
      showPassword: false,
      showPassword2: false
    };
  },
  methods: {
    display() {
      this.showPassword = !this.showPassword;
    },
    display2() {
      this.showPassword2 = !this.showPassword2;
    },
    apiResetPassword() {
      this.$http({
        url: "/zjq/User/ResetPassword",
        header: "form",
        data: {
          phone: this.phoneno,
          password: this.password,
          code: this.code
        }
      }).then(
        res => {
          if (res.code == 0) {
            uni.showToast({
              icon: "none",
              title: res.message
            });
            setTimeout(() => {
              uni.reLaunch({
                url: "/pages/login/signIn/signIn"
              });
            }, 500);
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
    toSub() {
      if (this.password == this.password2 && this.password) {
		let pl = this.password.length;
        if (pl > 5 && pl < 21) {
          this.apiResetPassword();
        } else {
          uni.showModal({
            content: "请设置6-20位密码！",
            showCancel: false
          });
        }
      } else {
        uni.showModal({
          content: "请输入相同的密码！",
          showCancel: false
        });
      }
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

.header {
  width: 161upx;
  height: 161upx;
  background: rgba(63, 205, 235, 1);
  box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
  border-radius: 50%;
  margin-top: 30upx;
  margin-left: auto;
  margin-right: auto;
}

.header image {
  width: 161upx;
  height: 161upx;
  border-radius: 50%;
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
  color: #333333;
  border-bottom: 1upx solid #999;
}

.list-call .img {
  width: 40upx;
  height: 40upx;
}

.list-call .biaoti {
  flex: 1;
  text-align: left;
  font-size: 32upx;
  line-height: 100upx;
  margin-left: 16upx;
}

.yzm {
  color: #ff7d13;
  font-size: 24upx;
  line-height: 64upx;
  padding-left: 10upx;
  padding-right: 10upx;
  width: auto;
  height: 64upx;
  border: 1upx solid #ffa800;
  border-radius: 50upx;
}

.yzms {
  color: #999999 !important;
  border: 1upx solid #999999;
}

.dlbutton {
  color: #ffffff;
  font-size: 34upx;
  width: 470upx;
  height: 100upx;
  background: linear-gradient(
    -90deg,
    rgba(63, 205, 235, 1),
    rgba(188, 226, 158, 1)
  );
  box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
  border-radius: 50upx;
  line-height: 100upx;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100upx;
}

.dlbutton-hover {
  background: linear-gradient(
    -90deg,
    rgba(63, 205, 235, 0.9),
    rgba(188, 226, 158, 0.9)
  );
}

.xieyi {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30upx;
  margin-top: 80upx;
  color: #ffa800;
  text-align: center;
  height: 40upx;
  line-height: 40upx;
}

.xieyi image {
  width: 40upx;
  height: 40upx;
}

.sign-in {
  margin-top: 25px;
  text-align: center;

  button {
    width: 540upx;
    background-color: #17d8a9;
  }
}

.jieshi {
  padding: 25upx 70upx;
  color: #808080;
  font-size: 26upx;
}
</style>
