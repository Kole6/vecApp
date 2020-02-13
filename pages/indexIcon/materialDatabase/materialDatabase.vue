<!-- 资料库 -->
<template>
  <view>
    <!-- 搜索栏 -->
    <!-- <view class="search">
			<uni-search-bar radius="100" clearButton="auto" @confirm="search" />
    </view>-->
    <!-- 分类栏 -->
    <view style="height:20upx"></view>
    <view class="m-category">
      <view
        class="item"
        v-for="(item, index) in categoryList"
        :key="index"
        @tap="handleRoute(item, false)"
      >
        <view class="title">{{ item.name }}</view>
        <view class="desc">{{ item.desc }}</view>
      </view>
    </view>
    <view class style="height:20upx"></view>
    <!-- 文件列表区 -->
    <!-- <load-more ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight }" :loadStatus="loadStatus"> -->
    <view class="school-list" :style="{ height: wrapperHeight ,overflow:'auto'}">
      <file-list :listArr="fileListArr"></file-list>
    </view>
    <!-- </load-more> -->
  </view>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import fileList from "./FileList.vue";
import loadMore from "@/components/loadMore/you-scroll.vue";
import docx from "@/static/indexIcon/word.jpg";
import xlsx from "@/static/indexIcon/xlsx.jpg";
import pdf from "@/static/indexIcon/pdf.jpg";
export default {
  components: {
    uniSearchBar,
    fileList,
    loadMore
  },
  data() {
    return {
      fileType: {
        docx,
        xlsx,
        pdf
      },
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      loadStatus: "more",
      systemInfo: uni.getSystemInfoSync(),
      wrapperHeight: "auto",
      categoryList: [
        {
          name: "职教文件",
          url: "./ZJFile",
          desc: "Vocational education documents"
        },
        {
          name: "教学标准",
          url: "./JXBZFile",
          desc: "Teaching standard"
        },
        {
          name: "质量年报",
          url: "./ZLFile",
          desc: "Quality Annual Report"
        },
        {
          name: "基础课程教学大纲",
          url: "./JXDGFile",
          desc: "Basics Course syllabus"
        }
      ],
      fileListArr: []
    };
  },
  mounted() {
    // 限制列表高度
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".school-list")
      .boundingClientRect(data => {
        this.wrapperHeight =
          this.systemInfo.screenHeight - data.top - 72 + "px";
        // #ifdef H5
        this.wrapperHeight =
          this.systemInfo.screenHeight - data.top - 45 + "px";
        // #endif
      })
      .exec();
    this.getData();
  },
  onNavigationBarButtonTap(option) {
    uni.navigateTo({
      url: "./SearchFile"
    });
  },
  methods: {
    onPullDown(done) {
      setTimeout(() => {
        done();
      }, 2000);
    },
    onScroll() {},
    onLoadMore() {
      this.loadStatus = "loading";
      // this.getData().then(()=>{
      // })
      setTimeout(() => {
        this.loadStatus = "more";
      }, 1000);
    },
    getData() {
      this.$http({
        url: "/zjq/mainpage/GetFile",
        header: "form",
        data: {
          token: uni.getStorageSync("token")
        }
      }).then(res => {
        if (res.code == 0) {
          let data = res.data.list.map(item => {
            return {
              ...item,
              name: item.filename,
              hasDownloaded: item.downloadnum,
              fileSize: item.filesize,
              src: this.fileType[item.fileavatar] || "/static/indexIcon/p1.png"
            };
          });
          this.fileListArr = data;
        } else {
          uni.showToast({
            title: res.message,
            icon: "none"
          });
          reject();
        }
      });
    },
    search() {},
    handleRoute(item, isDetail = true) {
      if (isDetail) {
      } else {
        uni.navigateTo({
          url: item.url
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 10upx 20upx;
}

.m-category {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 25upx 20upx 25upx;
  background: #ffffff;

  .item {
    width: 336upx;
    height: 180upx;
    background: #eee;
    margin-top: 20upx;
    box-sizing: border-box;
    padding-top: 35upx;
    padding-left: 15upx;

    .title {
      color: $main-text-color;
      font-size: $uni-font-size-lg;
      // max-width: 150upx;
      font-size: 34upx;
      line-height: 48upx;
    }

    .desc {
      margin-top: 10upx;
      color: #999999;
      font-size: 20upx;
      max-width: 250upx;
    }
  }
  .item:nth-child(1) {
    .desc {
      max-width: 288upx;
    }
  }

  @for $i from 1 through 4 {
    .item:nth-of-type(#{$i}) {
      background: url("../../../static/indexIcon/p"+$i+".png");
      background-size: 100% 100%;
    }
  }
}
</style>
