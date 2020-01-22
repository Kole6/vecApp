<template>
  <view>
    <view class="m-message">
      <message-info
        :message="`已添加 ${listPk.length} ${type==1?'所':'个'}${key1}到对比库`"
        :isShow.sync="isShowMessage"
        @close="handleMessageClose"
      ></message-info>
    </view>
    <view class="m-search">
      <uni-search-bar radius="100" clearButton="auto" @confirm="search" />
    </view>
    <!-- 可以选择的对比列表 -->
    <QSTabs
      ref="tabs"
      :current="current"
      :tabs="tabs"
      width="375"
      swiperWidth="750"
      activeColor="#6451FC"
      backgroundColor="#fff"
      @change="change($event)"
    />
    <swiper
      :style="{height:`${wrapperHeight}`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
      :current="current"
      @change="swiperChange"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <swiper-item>
        <scroll-view scroll-y style="height: 100%;" @scrolltolower="onLoadMore">
          <view class="wrapper">
            <view class="list-item" v-for="(item, index) in listArr2" :key="index">
              <view class="flag" @click="handleListTaped(item)">
                <block v-if="item.hasSelected">
                  <image
                    src="/static/indexIcon/selected.png"
                    mode="aspectFit"
                    style="height: 36upx; width:36upx"
                  />
                </block>
                <block v-else>
                  <view class="selecting"></view>
                </block>
              </view>
              <school-list-item
                :item="item"
                :showType="4"
                :handleTaped="false"
                @taped="handleListTaped(item)"
                :isSpecial="type!=1"
              ></school-list-item>
            </view>
          </view>
          <uni-load-more :status="more"></uni-load-more>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view scroll-y style="height: 100%;">
          <view class="wrapper">
            <view class="list-item" v-for="(item, index) in listArr" :key="index">
              <view class="flag" @click="handleListTaped(item)">
                <block v-if="item.hasSelected">
                  <image
                    src="/static/indexIcon/selected.png"
                    mode="aspectFit"
                    style="height: 36upx; width:36upx"
                  />
                </block>
                <block v-else>
                  <view class="selecting"></view>
                </block>
              </view>
              <school-list-item
                :item="item"
                :showType="4"
                :handleTaped="false"
                @taped="handleListTaped(item)"
                :isSpecial="type!=1"
              ></school-list-item>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <!-- 底部按钮 -->
    <view class="m-bottom">
      <view class="left" @tap="toBack">退出</view>
      <view class="right" @tap="toDetail">开始对比</view>
    </view>
  </view>
</template>

<script>
import schoolListItem from "@/components/vec-school-list/SchoolListItem.vue";
import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
import messageInfo from "@/components/vec-message-info/vec-message-info.vue";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
// import loadMore from "@/components/loadMore/you-scroll.vue";
import { ConfigContrast } from "@/config";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    schoolListItem,
    uniSearchBar,
    messageInfo,
    QSTabs,
    uniLoadMore
  },
  props: {
    type: Number,
    key1: String,
    key2: String,
    key3: String,
    key4: String
  },
  data() {
    return {
      loadStatus: "more",
      isShowMessage: true,
      wrapperHeight: "auto",
      systemInfo: uni.getSystemInfoSync(),
      activeIndex: 1,
      tabs: ["热门", "我的关注"],
      current: 0,
      firstHeight: "0",
      listArr2: [],
      listArr: [],
      listPk: [],
      arrPk: [],
      pageIndex: 1,
      more: "more",
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
  mounted() {
    this.calcScrollHeight(true);
    this.init();
    this.getSwp();
  },
  methods: {
    async init() {
      if (this.type == 1) {
        this.tabs = ["热门学校", "我的关注"];
      } else {
        this.tabs = ["相关专业", "我的关注"];
      }
      let list = await this.$api.apiGetComparison(this, this.type);
      this.listPk = this.$tool.toolPkList(list, this.type);
      if (this.type == 2) {
        this.arrPk = list.map(k => {
          return k.xlcc;
        });
      }
    },
    async getSwp() {
      this.pageIndex = 1;
      let l = await this.$api.apiGetFavoriteListSearch(
        this,
        this.type,
        this.searchValue
      );
      if (this.type == 1) {
        this.listArr = this.$tool.toolSchoolListPk(l, this.listPk);
        let list = await this.$api.apiGetSchoolSearchList(
          this,
          this.searchValue,
          {
            pageIndex: this.pageIndex
          }
        );
        this.listArr2 = this.$tool.toolSchoolListPk(list, this.listPk);
      } else {
        this.listArr = this.$tool.toolMajorListPk(l, this.listPk);
        let list = await this.$api.apiGetMajors(this, this.searchValue, {
          pageIndex: this.pageIndex
        });
        this.listArr2 = this.$tool.toolMajorListPk(list, this.listPk);
      }
    },
    search({ value }) {
      this.searchValue = value;
      this.getSwp();
    },
    /* 点击增删对比库 */
    async handleListTaped(item) {
      if (item.hasSelected) {
        this.$api.apiMyComparison(this, "D", this.type, item[this.key3]);
        this.listPk.splice(
          this.listPk.findIndex(t => t === item[this.key3]),
          1
        );
        item.hasSelected = !item.hasSelected;
        if (this.type == 2) {
          this.arrPk.splice(
            this.listPk.findIndex(t => t === item.xlcc),
            1
          );
        }
      } else {
        if (this.listPk.length >= ConfigContrast) {
          uni.showToast({
            title: `最多只能选取 ${
              this.type == 1
                ? ` ${ConfigContrast} 所院校`
                : ` ${ConfigContrast} 个专业`
            } 进行对比哦`,
            icon: "none"
          });
        } else {
          this.$api.apiMyComparison(this, "A", this.type, item[this.key3]);
          this.listPk.push(item[this.key3]);
          item.hasSelected = !item.hasSelected;
          this.arrPk.push(item.xlcc);
        }
      }
    },
    async onLoadMore() {
      if (this.more == "more") {
        this.more = "loading";
        this.pageIndex += 1;
        if (this.type == 1) {
          let list = await this.$api.apiGetSchoolSearchList(
            this,
            this.searchValue,
            { pageIndex: this.pageIndex }
          );
          if (list.length) {
            this.listArr2.push(
              ...this.$tool.toolSchoolListPk(list, this.listPk)
            );
            this.more = "more";
          } else {
            this.more = "noMore";
          }
        } else {
          let list = await this.$api.apiGetMajors(this, this.searchValue, {
            pageIndex: this.pageIndex
          });
          if (list.length) {
            this.listArr2.push(
              ...this.$tool.toolMajorListPk(list, this.listPk)
            );
            this.more = "more";
          } else {
            this.more = "noMore";
          }
        }
      }
    },
    handleMessageClose() {
      this.isShowMessage = false;
      this.calcScrollHeight();
    },
    handleChecked(item, index) {
      this.$set(item, "checked", !item.checked);
    },
    toDetail() {
      if (this.listPk.length < 2) {
        let t = `请选择2${this.type == 1 ? "所" : "个"}${
          this.key1
        }学校进行对比！`;
        uni.showToast({
          title: t,
          icon: "none"
        });
      } else if (this.type == 2 && this.arrPk[0] != this.arrPk[1]) {
        uni.showToast({
          title: "不同学历层次专业不能进行对比!",
          icon: "none"
        });
      } else {
        uni.navigateTo({ url: `${this.key4}?ids=${this.listPk.toString()}` });
      }
    },
    toBack() {
      uni.navigateBack({ delta: 2 });
    },
    change(index) {
      this.current = index;
    },
    handleTab(tabIndex) {
      if (tabIndex == 0) {
      } else if (tabIndex == 1) {
      }
    },
    swiperChange({ detail: { current } }) {
      this.handleTab(current);
      this.current = current;
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
    },
    calcScrollHeight(isFirst = false) {
      setTimeout(() => {
        // 限制列表高度
        let query = uni.createSelectorQuery().in(this);
        query
          .select(".wrapper")
          .boundingClientRect(data => {
            let height =
              this.systemInfo.screenHeight - data.top - uni.upx2px(180);
            // #ifdef APP-PLUS
            height = height - 30;
            // #endif
            if (isFirst) {
              this.firstHeight = height;
              this.wrapperHeight = height + "px";
            } else {
              if (this.isShowMessage) {
                this.wrapperHeight = this.firstHeight + "px";
              } else {
                this.wrapperHeight = this.firstHeight + 40 + "px";
              }
            }
          })
          .exec();
      }, 300);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./pkAdd.scss";
</style>
