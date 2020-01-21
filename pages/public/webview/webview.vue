<template>
  <web-view :src="src"></web-view>
</template>
<script>
export default {
  data() {
    return {
      src: ""
    };
  },
  onLoad(e) {
    this.src = e.src + "?" + e.query.replace("***", "&");
    console.log("Webview", this.src);
    if (e.title) {
      uni.setNavigationBarTitle({
        title: e.title
      });
    }
  }
};
</script>