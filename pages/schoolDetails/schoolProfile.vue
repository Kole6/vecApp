<template>
  <view>
    <web-view :src="src"></web-view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      src: ""
    };
  },
  onLoad(option) {
    if (option.schoolName) {
      this.src = `https://baike.baidu.com/item/${option.schoolName}`;
    } else if (option.website) {
      /* uni.setNavigationBarTitle({
        title: "学校官网"
      }); */
      if (option.website.includes("http")) {
        this.src = option.website;
      } else {
        this.src = "http://" + option.website;
      }
    } else if (option.baike) {
      this.src = option.baike;
    }
    console.log("web-view-src ", this.src);
  }
};
</script>

<style lang="scss">
</style>
