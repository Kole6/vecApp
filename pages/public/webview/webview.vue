<template>
  <web-view :src="src"></web-view>
</template>
<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
export default {
  components: { uniNavBar },
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
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: this.title
    });
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    }
  }
};
</script>