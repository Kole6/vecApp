<template>
  <view></view>
</template>

<script>
import { ConfigEdition } from "@/config";
export default {
  onLoad() {
    // #ifdef MP-WEIXIN
    uni.switchTab({
      url: "./index"
    });
    return;
    // #endif

    try {
      // 引导页，从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
      if (uni.getStorageSync(String("launchFlag" + ConfigEdition))) {
        uni.switchTab({
          url: "./index"
        });
      } else {
        uni.redirectTo({
          url: "./boot" //引导页
          // url: './guide' //快速注册
        });
      }
    } catch (e) {
      uni.switchTab({
        url: "./index"
      });
    }
  }
};
</script>