<template>
  <view>
    <!-- 搜索栏 -->
    <view class="search">
      <uni-search-bar radius="100" clearButton="auto" @confirm="search" placeholder="资料名称" />
    </view>
    <!-- 文件列表区 -->
    <load-more
      ref="scroll"
      @onPullDown="onPullDown"
      @onLoadMore="onLoadMore"
      :styleObj="{ height: wrapperHeight}"
      :loadStatus="loadStatus"
    >
      <view class="school-list">
        <file-list :listArr="fileListArr"></file-list>
      </view>
    </load-more>
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
  components: { uniSearchBar, fileList, loadMore },
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
      searchValue: "",
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
          this.systemInfo.screenHeight - data.top - 85 + "px";
        // #ifdef H5
        this.wrapperHeight =
          this.systemInfo.screenHeight - data.top - 45 + "px";
        // #endif
        console.log(this.wrapperHeight);
      })
      .exec();
    this.onPullDown();
  },
  methods: {
    onPullDown(done) {
      this.page.pageIndex = 1;
      this.getData(true)
        .then(isLastPage => {
          if (isLastPage) {
            this.loadStatus = "noMore";
          } else {
            this.loadStatus = "more";
          }
        })
        .finally(() => {
          done && done();
        });
    },
    onLoadMore() {
      this.loadStatus = "loading";
      this.getData().then(isLastPage => {
        if (isLastPage) {
          this.loadStatus = "noMore";
        } else {
          this.loadStatus = "more";
        }
      });
    },
    getData(isRefresh) {
      return new Promise((resolve, reject) => {
        this.$http({
          url: "/zjq/mainpage/GetFile",
          header: "form",
          data: {
            key: this.searchValue,
            type: "4",
            token: uni.getStorageSync("token"),
            pageIndex: this.page.pageIndex,
            pageSize: this.page.pageSize
          }
        }).then(res => {
          if (res.code == 0) {
            let data = res.data.list.map(item => {
              return {
                ...item,
                name: item.filename,
                hasDownloaded: item.downloadnum,
                fileSize: item.filesize,
                src:
                  this.fileType[item.fileavatar] || "/static/indexIcon/p1.png"
              };
            });
            if (isRefresh) {
              this.fileListArr = data;
              this.page.pageIndex = 1;
            } else {
              this.fileListArr.push(...data);
              this.page.pageIndex++;
            }
            resolve(res.data.lastPage);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            reject();
          }
        });
      });
    },
    search({ value }) {
      this.searchValue = value;
      this.page.pageIndex = 1;
      this.onPullDown();
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 10upx 20upx;
}
</style>
