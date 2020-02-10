<template>
  <view>
    <uni-nav-bar @clickLeft="handleBack" left-icon="arrowleft" :shadow="false" :border="false">
      <uni-search-bar
        ref="search"
        style="width: 100%;"
        radius="100"
        placeholder="搜索专业"
        clearButton="auto"
        @confirm="search"
      />
    </uni-nav-bar>
    <view class>
      <message-info :message="searchResultMessage" :isShow.sync="isShow" @close="handleClose"></message-info>
    </view>
    <view class="list-wrapper">
      <block v-if="dataArr.length">
        <load-more
          ref="scroll"
          @onPullDown="onPullDown"
          @onLoadMore="onLoadMore"
          :styleObj="{ height: wrapperHeight }"
          :loadStatus="loadStatus"
        >
          <view class="list">
            <school-list
              :showType="4"
              :is-special="true"
              :listArr="dataArr"
              :handleTaped="false"
              @taped="handleListTaped"
            />
          </view>
        </load-more>
      </block>
    </view>
  </view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import loadMore from "@/components/loadMore/you-scroll.vue";
import messageInfo from "@/components/vec-message-info/vec-message-info.vue";
export default {
  components: { uniNavBar, uniSearchBar, schoolList, loadMore, messageInfo },
  data() {
    return {
      dataArr: [],
      loadStatus: "noMore",
      systemInfo: uni.getSystemInfoSync(),
      searchResultMessage: "",
      isShow: false,
      wrapperHeight: "auto",
      firstHeight: "0",
      searchValue: "",
      page: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    this.$refs.search.searchClick();
    this.calcScrollHeight(true);
  },
  methods: {
    handleClose() {
      this.isShow = false;
      this.calcScrollHeight();
    },
    calcScrollHeight(isFirst = false) {
      setTimeout(() => {
        // 限制列表高度
        let query = uni.createSelectorQuery().in(this);
        query
          .select(".list-wrapper")
          .boundingClientRect(data => {
            // TODO 待验证app中列表高度
            let height = "";
            height = this.systemInfo.screenHeight - data.top - 10;
            if (height && isFirst) {
              this.wrapperHeight = height + "px";
              this.firstHeight = height;
            } else if (!isFirst) {
              // 有message
              if (this.isShow) {
                this.wrapperHeight = this.firstHeight + "px";
              } else {
                this.wrapperHeight = this.firstHeight + 40 + "px";
              }
            }
          })
          .exec();
      }, 300);
    },
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
    onScroll() {},
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
          url: "/zjq/College/GetMajors",
          header: "form",
          data: {
            token: uni.getStorageSync("token"),
            pageIndex: this.page.pageIndex,
            pageSize: this.page.pageSize,
            key: this.searchValue
          }
        }).then(res => {
          if (res.code == 0) {
            let data = this.$tool.toolMajorListSearch(
              res.data.list,
              this.searchValue
            );
            if (isRefresh) {
              this.searchResultMessage = `一共${res.data.totalRow}条搜索数据`;
              this.dataArr = data;
              this.page.pageIndex = 1;
              this.isShow = true;
            } else {
              this.dataArr.push(...data);
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
    handleBack() {
      let data = getCurrentPages();
      if (data.length < 1) {
        uni.switchTab({
          url: "/pages/tabBar/index/index"
        });
      } else {
        // pro
        uni.navigateBack({});
      }
    },
    search({ value }) {
      this.searchValue = value;
      this.page.pageIndex = 1;
      this.onPullDown();
    },
    handleListTaped({ item, index }) {
      this.$tool.toolistoolTiaoToken(
        `/pages/indexIcon/majorDatabase/ProfessionDesc?id=${item.majorcode}&name=${item.majorname}&type=${item.xlcc == "中职" ? 2 : 1}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  background: #ffffff;
}
</style>
