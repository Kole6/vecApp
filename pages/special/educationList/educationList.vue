<!--职教榜单-->
<template>
  <view>
    <view class="nav">
      <view @tap="navto(item.url)" class="nav-l" v-for="(item,i) of bangList" :key="i">
        <image :src="item.img" mode="aspectFill" />
        <view class="tiao"></view>
        <view class="biao1">{{item.biao1}}</view>
        <view class="biao2">{{item.biao2}}</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      bangList: [
        {
          img: "/static/p901.png",
          biao1: "2018年高等职业院校",
          biao2: "育人成效50强"
        },
        {
          img: "/static/p902.png",
          biao1: "2018年高等职业院校",
          biao2: "教学资源50强"
        },
        {
          img: "/static/p903.png",
          biao1: "2018年高等职业院校",
          biao2: "国际影响力50强"
        },
        {
          img: "/static/p904.png",
          biao1: "2018年高等职业院校",
          biao2: "服务贡献50强"
        },
        {
          img: "/static/p905.png",
          biao1: "全国职业院校",
          biao2: "教学管理50强"
        },
        {
          img: "/static/p906.png",
          biao1: "全国职业院校",
          biao2: "学生管理50强"
        },
        {
          img: "/static/p907.png",
          biao1: "全国职业院校",
          biao2: "实习管理50强"
        },
        {
          img: "/static/p908.png",
          biao1: "",
          biao2: "人气榜",
          url: "/pages/special/educationList/LikeList"
        }
      ]
    };
  },
  methods: {
    navto(url) {
      if (!url) {
        uni.showToast({
          title: "暂未开通~",
          icon: "none"
        });
        return;
      }
      uni.navigateTo({
        url
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.nav {
  width: 750upx;
  margin-bottom: 40upx;
  .nav-l {
    display: inline-block;
    vertical-align: top;
    width: 312upx;
    height: 320upx;
    margin-top: 40upx;
    margin-left: 42upx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 5px 5px 10px 0px rgba(1, 149, 255, 0.02);
    border-radius: 20px;
    text-align: center;
    image {
      width: 90upx;
      height: 90upx;
      margin-top: 65upx;
    }
    .tiao {
      height: 38upx;
    }
    .biao1 {
      font-size: 26upx;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .biao2 {
      font-size: 26upx;
      font-weight: 400;
      color: #333;
      line-height: 60upx;
    }
  }
}
</style>