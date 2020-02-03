<template>
  <view>
    <view class="box">
      <view class="title">校企合作情况</view>
      <view class="txt">
        <view class="txt-box">
          <p>产学合作总数（个）</p>
          <p>{{listObj.totalNum || '-'}}</p>
        </view>
        <view class="txt-box">
          <p>订单培养数（人）</p>
          <p>{{listObj.orderNum || '-'}}</p>
        </view>
      </view>
      <view class="txt">
        <view class="txt-box">
          <p>共同开发课程（门）</p>
          <p>{{listObj.course || '-'}}</p>
        </view>
        <view class="txt-box">
          <p>共同开发教材（种）</p>
          <p>{{listObj.gtkfjcNum || '-'}}</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad(e) {
    this.sid = e.sid;
    this.apiGetCooperation();
  },
  data() {
    return {
      sid: "",
      listObj: {}
    };
  },
  methods: {
    apiGetCooperation() {
      this.$http({
        url: "/zjq/College/GetCooperation",
        header: "form",
        data: {
          sid: this.sid,
          token: uni.getStorageSync("token")
        }
      }).then(res => {
        if (res.code == 0) {
          this.listObj = res.data;
        } else {
          uni.showToast({
            icon: "none",
            title: res.message
          });
        }
      });
    }
  }
};
</script>
<style scoped>
page {
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
@import "./base64.scss";
.box {
  width: 684upx;
  height: 480upx;
  background: $cooperation_bg no-repeat;
  background-size: 100% 100%;
  box-shadow: 0px 0px 10px 0px rgba(100, 81, 252, 0.1);
  border-radius: 31upx;
  margin: 20upx auto;
  .title {
    font-size: 40upx;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 48upx;
    padding: 40upx 35upx;
  }
  .txt {
    font-size: 28upx;
    font-weight: 500;
    display: flex;
    line-height: 45upx;
    color: #fff;
    .txt-box {
      text-align: center;
      flex: 1;
      p:nth-child(2) {
        color: #fff;
        font-weight: 700;
        font-size: 42upx;
        padding-top: 25upx;
      }
      margin: 28upx 0;
    }
  }
}
</style>
