<!-- 院校库 -->
<template>
  <view>
    <view class="nav">
      <navigator url="/pages/indexIcon/schoolDatabase/BenkePage">
        <view class="nav-item nav-item-1">
          <text>本科层次职业教育</text>
        </view>
      </navigator>
      <navigator url="/pages/indexIcon/schoolDatabase/GaozhiPage">
        <view class="nav-item nav-item-2">
          <text>高职高专院校</text>
        </view>
      </navigator>
      <navigator url="/pages/indexIcon/schoolDatabase/ZhongzhiPage">
        <view class="nav-item nav-item-3">
          <text>中等职业技术学校</text>
        </view>
      </navigator>
    </view>
    <view class="list-title">
      <view class="hot">热门学校</view>
      <image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit" />
    </view>
    <load-more
      ref="scroll"
      @onPullDown="onPullDown"
      @onLoadMore="onLoadMore"
      :styleObj="{ height: wrapperHeight}"
      :loadStatus="loadStatus"
    >
      <view class="school-list">
        <school-list :showType="4" :listArr="dataArr"></school-list>
      </view>
    </load-more>
  </view>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import loadMore from "@/components/loadMore/you-scroll.vue";
import { schoolData } from "../mockData.js";
export default {
  components: { uniSearchBar, schoolList, uniNavBar, loadMore },
  data() {
    return {
      loadStatus: "noMore",
      systemInfo: uni.getSystemInfoSync(),
      wrapperHeight: "auto",
      dataArr: [],
      page: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  mounted() {
    let query = uni.createSelectorQuery().in(this); // 限制列表高度
    query
      .select(".school-list")
      .boundingClientRect(data => {
        let height = this.systemInfo.screenHeight - data.top - 45;
        this.wrapperHeight = height + "px";
      })
      .exec();
    this.getData(1);
  },
  onNavigationBarSearchInputClicked() {
    uni.navigateTo({
      url: "./SearchResult"
    });
  },
  methods: {
    onPullDown(done) {
      this.getData(1);
      done();
    },
    onLoadMore() {
      this.getData();
    },
    async getData(index) {
      this.loadStatus = "loading";
      let list = await this.$api.apiGetHotCollege(this, 2, {
        pageIndex: index || this.page.pageIndex
      });
      if (list.length) {
        this.dataArr.push(...this.$tool.toolSchoolList(list));
        this.page.pageIndex = index ? index + 1 : this.page.pageIndex + 1;
        this.loadStatus = "more";
      } else {
        this.loadStatus = "noMore";
      }
    },
    toBack() {
      uni.navigateBack();
    },
    toSearch() {}
  }
};
</script>

<style scoped lang="scss">
.search {
  padding: 10upx 50upx;
}
.nav {
  display: flex;
  justify-content: space-around;
  padding: 35upx 0;
  background: #ffffff;
}
.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220upx;
  text-align: center;
  box-sizing: border-box;
  padding: 20upx 40upx;
  color: #fff;
  border-radius: 20upx;
  font-size: 34upx;
  font-weight: 500;
  background: $main-base-color;
  height: 180upx;
  box-shadow: 5upx 10upx 10upx rgba($color: #7494ff, $alpha: 0.1);
}
@for $i from 1 through 3 {
  .nav-item-#{$i} {
    background: url("../../../static/indexIcon/bg"+$i+".png");
    background-size: 100% 100%;
  }
}
.list-title {
  padding: 15upx 10upx;
  margin-top: 20upx;
  background: #ffffff;
  border-bottom: solid 1upx $main-dividing-line1;
  image {
    width: 60upx;
    height: 60upx;
    vertical-align: middle;
  }
  .hot {
    font-size: $uni-font-size-lg;
    display: inline-block;
    margin-left: 20upx;
    font-weight: bold;
    color: #333333;
  }
  .hot-img {
    padding-left: 10upx;
    width: 28upx;
    height: 29upx;
    vertical-align: middle;
  }
}
.school-list {
  background: #ffffff;
}
</style>
