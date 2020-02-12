<template>
  <view class>
    <!-- 标题 -->
    <view class="m-top">
      <view class="title">{{fileInfo.name}}</view>
      <view class="desc">
        <text class="special">{{fileInfo.number}}</text>人已下载
      </view>
    </view>
    <!-- 文档简介 -->
    <view class="m-desc">
      <view class="title">文档简介</view>
      <view class="top">
        <view class="item">
          <text>文档类型：</text>
          <text>{{fileInfo.fileType}}</text>文件
        </view>
        <view class="item">
          <text>来源：</text>
          <text>{{fileInfo.source}}</text>
        </view>
        <view class="item">
          <text>发布时间：</text>
          <text>{{fileInfo.createTime}}</text>
        </view>
        <view class="item">
          <text>类型：</text>
          <text>{{fileInfo.type}}</text>
        </view>
      </view>
      <view class="bottom">
        <text>{{fileInfo.desc}}</text>
      </view>
    </view>
    <!-- 文档简介(部分) -->
    <view class="m-desc-bottom">
      <view class="title">
        文档内容
        <!-- <text class="tips">(部分)</text> -->
      </view>
      <view class="content">
        <!-- <iframe
          style="width: 750upx;height:800px"
          src="http://61.132.95.170:10200/zjq/zy/zz/010800.pdf"
          frameborder="0"
        ></iframe> -->
		<!-- <iframe src="" frameborder="0"></iframe> -->
        <!-- <web-view src="http://61.132.95.170:10200/zjq/zy/zz/010800.pdf"></web-view> -->
        <!-- <image class="image" :src="fileInfo.fileImg" mode="aspectFit" /> -->
      </view>
    </view>
    <!-- <view class="m-btn-group">
			<view class="u-btn down" @tap="handleDownload">
				<image class="img" src="/static/indexIcon/down.png" mode="aspectFit" /> 下载文件
			</view>
			<view class="u-btn share" @tap="handleShare">
				<image class="img" src="/static/indexIcon/share.png" mode="aspectFit" />分享给好友
			</view>
    </view>-->
    <!-- <uni-popup ref="share" :type="type" :custom="true" @change="change">
			<view class="uni-share">
				<view class="uni-share-title">分享到</view>
				<view class="uni-share-content">
					<view v-for="(item, index) in bottomData" :key="index" class="uni-share-content-box" @tap="handleShareItem(item)">
						<view class="uni-share-content-image">
							<image :src="item.icon" class="image" />
						</view>
						<view class="uni-share-content-text">{{ item.text }}</view>
					</view>
				</view>
				<view class="uni-share-btn" @click="cancel('share')">取消分享</view>
			</view>
    </uni-popup>-->
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
  onLoad(e) {
    this.fileId = e.fileId;
    this.getDetailInfo();
  },
  components: {
    uniPopup,
    uniIcons
  },
  data() {
    return {
      type: "bottom",
      fileId: "",
      fileInfo: {
        name: "文件名称",
        number: 0,
        fileType: "docx",
        type: `院校&专业`,
        createTime: "",
        source: "",
        desc: ""
      },
      bottomData: [
        {
          text: "微信好友",
          icon: "https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png",
          name: "wx"
        },
        {
          text: "朋友圈",
          icon: "https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png",
          name: "wxp"
        },
        {
          text: "QQ",
          icon: "https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png",
          name: "qq"
        },
        {
          text: "新浪",
          icon: "https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png",
          name: "sina"
        }
      ]
    };
  },
  onNavigationBarButtonTap() {
    uni.navigateTo({
      url: "./SearchFile"
    });
  },
  methods: {
    handleDownload() {
      this.$api.apiGetFileDown(this, this.fileId);
    },
    getDetailInfo() {
      this.$http({
        url: "/zjq/mainpage/GetFileDetail",
        header: "form",
        data: {
          token: uni.getStorageSync("token"),
          fileid: this.fileId
        }
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          this.fileInfo.number = data.downloadnum;
          this.fileInfo.name = data.filename;
          this.fileInfo.source = data.filesource;
          this.fileInfo.fileType = data.fileavatar;
          this.fileInfo.createTime = data.createTime;
          this.fileInfo.desc = data.desc;
          this.fileInfo.fileImg = data.fileimg;
          this.fileInfo.filedownloadlink = data.filedownloadlink;
        }
      });
    },
    handleShareItem(item) {
      // console.log(item,'item')
      uni.getProvider({
        service: "share",
        success: res => {}
      });
      let params = {};
      if (item.name == "wx") {
        // 微信好友
        params = {
          provider: "weixin",
          type: 1,
          scene: "WXSceneSession",
          summary: "测试地址"
        };
      } else if (item.name == "wxp") {
        //微信朋友圈
        params = {
          provider: "weixin",
          type: 1,
          scene: "WXSenceTimeline",
          summary: "测试地址"
        };
      } else if (item.name == "qq") {
        //qq
        params = {
          provider: "qq",
          type: 3,
          summary: "qqsumary",
          title: "qq分享",
          href: "http://www.pthink.com.cn/",
          mediaUrl:
            "https://audiomicro-sources.s3.amazonaws.com/preview/295991/ceea70e41a4b013"
        };
      }
      uni.share({
        ...params,
        success(res) {
          console.log(success, "su");
        },
        fail(err) {
          uni.showToast({
            icon: "none",
            title: err.errMsg
          });
        },
        complete: res => {
          console.log(res);
        }
      });
      this.cancel("share");
    },
    change(e) {
      console.log(e);
    },
    cancel() {
      this.$refs["share"].close();
    },
    handleShare() {
      this.$refs["share"].open();
    }
  }
};
</script>

<style scoped lang="scss">
.img {
  height: 40upx;
  width: 40upx;
  margin-right: 20upx;
}

.title,
.uni-share {
  color: $main-text-color;
}

/* 页面整体样式 */
.m-top {
  padding: 25upx;
  margin-bottom: 20upx;
  background: #ffffff;

  .title {
    font-size: $uni-font-size-lg + 5;
  }

  .desc {
    margin-top: 15upx;
    font-size: $uni-font-size-base;
    color: #999999;
  }
}

.m-desc {
  padding: 10upx 20upx;
  background: #ffffff;

  .title {
    font-size: $uni-font-size-lg;
    font-weight: bold;
    padding-left: 30upx;
    border-left: solid 5upx #47aab5;
    vertical-align: middle;
    margin: 20upx 0;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: #f3f4fc;
    padding: 15upx;

    .item {
      font-size: $uni-font-size-base;
      line-height: 1.6;
      color: #999999;
      width: calc(50% - 4upx);
    }
  }

  .bottom {
    margin-top: 15upx;
    font-size: $uni-font-size-base;
    color: #666666;
  }
}

.m-desc-bottom {
  padding: 10upx 20upx;
  background: #ffffff;
  margin-top: 15upx;
  margin-bottom: 82upx;

  .title {
    font-size: $uni-font-size-lg;
    font-weight: bold;
    padding-left: 30upx;
    border-left: solid 5upx #47aab5;
    vertical-align: middle;
    margin: 20upx 0;
  }

  .content {
    // padding-bottom: 120upx;
    .image {
      width: 100%;
      min-height: 800upx;
      padding-bottom: 20upx;
    }
  }
}

.m-btn-group {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;

  .u-btn {
    box-sizing: border-box;
    width: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .down,
  .share {
    font-size: $uni-font-size-lg;
    padding: 25upx 40upx;
    background-color: #ffffff;
    border: solid 3upx $main-border-light-color;
  }
}

/* 底部分享 */
.uni-share {
  background: #fff;
}

.uni-share-title {
  line-height: 60upx;
  font-size: 24upx;
  padding: 15upx 0;
  text-align: center;
}

.uni-share-content {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
}

.uni-share-content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  box-sizing: border-box;
}

.uni-share-content-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60upx;
  height: 60upx;
  overflow: hidden;
  border-radius: 10upx;
}

.uni-share-content-image .image {
  width: 100%;
  height: 100%;
}

.uni-share-content-text {
  font-size: 26upx;
  color: #333;
  padding-top: 5px;
  padding-bottom: 10px;
}

.uni-share-btn {
  height: 90upx;
  line-height: 90upx;
  border-top: 1px #f5f5f5 solid;
  text-align: center;
  color: #666;
}
</style>
