<template>
  <view class="content">
    <view class="search">
      <uni-search-bar radius="100" @confirm="search" placeholder=" 学校 / 专业 " />
    </view>
    <view class="have-data">
      <QSTabs
        ref="tabs"
        :current="current"
        :tabs="tabs"
        width="250"
        swiperWidth="750"
        activeColor="#6451FC"
        backgroundColor="#fff"
        @change="change($event)"
      />
      <swiper
        :style="{height:`${scrollH - 185}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
        :current="current"
        @change="swiperChange"
        @transition="transition"
        @animationfinish="animationfinish"
      >
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view class="list-title">
              <p>院校</p>
            </view>
            <view class="school-list">
              <school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
            </view>
            <view class="list-title">
              <p>专业</p>
            </view>
            <view class="school-list">
              <school-list
                :showType="4"
                :is-special="true"
                :listArr="dataArr2"
                :handleTaped="false"
                @taped="handleListTaped"
              />
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;" @scrolltolower="onLoadMore">
            <school-list :showType="4" :listArr="dataArr"></school-list>
            <uni-load-more :status="more"></uni-load-more>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;" @scrolltolower="onLoadMore2">
            <school-list
              :showType="4"
              :is-special="true"
              :listArr="dataArr2"
              :handleTaped="false"
              @taped="handleListTaped"
            />
            <uni-load-more :status="more2"></uni-load-more>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    uniSearchBar,
    QSTabs,
    schoolList,
    uniLoadMore
  },
  onLoad() {
    this.apiGetSchoolSearchListMore("");
    this.apiGetMajorsMore("");
  },
  data() {
    return {
      tabs: ["全部", "院校", "专业"],
      current: 0,
      dataArr: [],
      dataArr2: [],
      pageIndex: 1,
      more: "more",
      pageIndex2: 1,
      more2: "more",
      searchValue: ""
    };
  },
  computed: {
    scrollH() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight;
    }
  },
  methods: {
    onLoadMore() {
      if (this.more == "more") {
        this.more = "loading";
        this.apiGetSchoolSearchListMore();
      }
    },
    onLoadMore2() {
      if (this.more2 == "more") {
        this.more2 = "loading";
        this.apiGetMajorsMore();
      }
    },
    search(res) {
      this.pageIndex = 1;
      this.pageIndex2 = 1;
      this.searchValue = res.value;
      this.apiGetSchoolSearchListMore(res.value);
      this.apiGetMajorsMore(res.value);
    },
    async apiGetSchoolSearchListMore() {
      let list = await this.$api.apiGetSchoolSearchList(
        this,
        this.searchValue,
        { pageIndex: this.pageIndex }
      );
      this.pageIndex = this.$tool.toolMore(
        this,
        "dataArr",
        "more",
        this.pageIndex,
        this.$tool.toolSchoolList(list)
      );
    },
    async apiGetMajorsMore() {
      let list = await this.$api.apiGetMajors(this, this.searchValue, {
        pageIndex: this.pageIndex2
      });
      this.pageIndex2 = this.$tool.toolMore(
        this,
        "dataArr2",
        "more2",
        this.pageIndex2,
        this.$tool.toolMajorList(list)
      );
      /* if (list.length) {
        this.dataArr2.push(...this.$tool.toolMajorList(list));
        this.pageIndex2 += 1;
        this.more2 = "more";
      } else {
        this.more2 = "noMore";
      } */
    },
    handleListTaped({ item, index }) {
      this.$tool.toolistoolTiaoToken(
        `/pages/indexIcon/majorDatabase/ProfessionDesc?id=${
          item.majorcode
        }&name=${item.majorname}&type=${item.xlcc == "中职" ? 2 : 1}`
      );
    },
    change(index) {
      this.current = index;
    },
    swiperChange({ detail: { current } }) {
      this.current = current;
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
    }
  }
};
</script>
<style>
page {
  background-color: #fff;
}
</style>
<style scoped lang="scss">
.search {
  padding: 0 32upx;
}

.have-data {
  border-top: 1px solid rgba(238, 238, 238, 1);
}

.swiper-item {
  background-color: #fff;

  .sc-it {
    background-color: #fff;
    border-bottom: 8upx solid #f6f8fe;
    height: 100upx;
    font-size: 28upx;
    line-height: 100upx;
    padding-left: 30upx;

    &:first-child {
      border-top: 17upx solid #f6f8fe;
    }
  }
}

.list-title {
  padding-left: 30upx;
  height: 98upx;
  font-size: 32upx;
  font-weight: 700;
  color: rgba(51, 51, 51, 1);
  line-height: 98upx;
}

.school-list {
  background: #ffffff;
  overflow: auto;
}
</style>
