<template>
  <view class="m-b">
    <!-- 头像设置 -->
    <!-- <view class="">{{imageSrc}}</view> -->
    <!-- <view class="m-c">
			<image :src="imageSrc" mode="aspectFit" class="image" />
    </view>-->
    <view class="m-c">
      <upload-file
        selWidth="300upx"
        selHeight="300upx"
        @upload="myUpload"
        :avatarSrc="url"
        avatarStyle="width: 200upx; height: 200upx; border-radius: 100%;"
      ></upload-file>
    </view>
    <view class="m-btns">
      <button class="vec-btn" type="primary" @tap="handleConfirm">修改</button>
    </view>
  </view>
</template>

<script>
import uploadFile from "@/components/uploadImage/UploadImage.vue";
export default {
  components: { uploadFile },
  data() {
    return {
      imageSrc: "",
      url: "/static/p106.png"
    };
  },
  mounted() {},
  onShow() {
    this.url = uni.getStorageSync("avatar") || "/static/p106.png";
  },
  methods: {
    handleConfirm() {
      uni.setStorageSync("avatar", this.url);
      uni.showToast({
        title: "保存成功",
        icon: "none",
        duration: 1000
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
      // uni.uploadFile({
      // 	url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
      // 	filePath: tempFilePaths[0],
      // 	name: 'file',
      // 	formData: {
      // 		user: 'test'
      // 	},
      // 	success: uploadFileRes => {
      // 		console.log(uploadFileRes.data);
      // 	}
      // });
    },
    myUpload(params) {
      console.log(params, "params");
      this.url = this.imageSrc = params.path;
    }
  }
};
</script>

<style scoped lang="scss">
.m-c {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500upx;
}
</style>
