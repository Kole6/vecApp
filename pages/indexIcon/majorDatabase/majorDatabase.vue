<!-- 专业库 -->
<template>
  <view class="content">
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
      :style="{height:`${scrollH - 85}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
      :current="current"
      @change="swiperChange"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <swiper-item class="swiper-item">
        <scroll-view class="nav-left" scroll-y style="height: 100%;">
          <view
            class="nav-left-item"
            :key="index"
            :class="index == categoryActive ? 'active' : ''"
            @click="level1Click(item, index)"
            v-for="(item, index) in level1"
          >{{ item.name }}</view>
        </scroll-view>
        <scroll-view class="nav-right" scroll-y style="height: 100%;" scroll-with-animation>
          <uni-collapse>
            <uni-collapse-item
              v-for="(list,index) in level2"
              @taped="level2Click(list,index)"
              :key="list.code"
              :title="list.name"
              :show-animation="true"
              :open="list.open"
            >
              <view
                class="category-item"
                v-for="(item,i) in level3"
                :key="i"
                @tap="handleItemTap(item)"
              >{{item.name}}</view>
            </uni-collapse-item>
          </uni-collapse>
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view class="nav-left" scroll-y style="height: 100%;">
          <view
            class="nav-left-item"
            :key="index"
            :class="index == categoryActive ? 'active' : ''"
            @click="level1Click(item, index)"
            v-for="(item, index) in level1"
          >{{ item.name }}</view>
        </scroll-view>
        <scroll-view class="nav-right" scroll-y style="height: 100%;" scroll-with-animation>
          <view
            class="category-item"
            v-for="(item,i) in level2"
            :key="i"
            @tap="handleItemTap(item)"
          >{{item.name}}</view>
          <!-- <uni-collapse>
            <uni-collapse-item
              v-for="(list,index) in level2"
              @taped="level2Click(list,index)"
              :key="list.code"
              :title="list.name"
              :show-animation="true"
              :open="list.open"
            >
              <view
                class="category-item"
                v-for="(item,i) in level3"
                :key="i"
                @tap="handleItemTap(item)"
              >{{item.name}}</view>
            </uni-collapse-item>
          </uni-collapse>-->
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <view class="m-w">
          <image src="/static/no-ava.png" mode="aspectFill" />
          <view class="tip">
            <text>抱歉！数据正在整理中～</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
export default {
  onNavigationBarSearchInputClicked() {
    // console.log("点击了");
    uni.navigateTo({
      url: "/pages/indexIcon/majorDatabase/SearchResult"
    });
  },
  onLoad() {
    // 设置分类栏高度，保持在一屏内
    this.height = uni.getSystemInfoSync().windowHeight;
    this.initData();
  },
  components: { uniCollapse, uniCollapseItem, QSTabs },
  data() {
    return {
      tabs: ["高职院校专业", "中职学校专业", "技工院校专业"],
      current: 0,
      level1: [],
      level2: [],
      level2Open: 0,
      level3: [],
      height: 0,
      categoryActive: 0, //当前分类选中index值
      isShowAll: false //全部展开控制量
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
    /* 点击level1 */
    level1Click(categroy, index) {
      this.categoryActive = index;
      this.initData(categroy.code);
    },
    /* 点击level2 */
    level2Click(item, index) {
      let level2Data = this.$api
        .apiGetDict(this, {
          type: "zyfl",
          pid: item.code,
          schoolType: this.current + 1
        })
        .then(data => {
          if (data.length) {
            this.level2[this.level2Open].open = false;
            this.level2Open = index;
            item.open = true;
            this.level3 = data;
          } else {
            this.level3 = [];
          }
        })
        .catch(err => {
          uni.showToast({
            title: err,
            icon: "none"
          });
        });
    },
    /* 获取基础数据 */
    async initData(majorId = "") {
      this.level2 = [];
      uni.showLoading({ title: "加载中...", mask: true });
      let level1Data = [];
      if (!majorId) {
        level1Data = await this.$api.apiGetDict(this, {
          type: "zyfl",
          pid: majorId,
          schoolType: this.current + 1
        });
        this.level1 = level1Data;
        if (!level1Data.length) {
          this.level2 = this.level3 = [];
          uni.hideLoading();
          return;
        }
      }
      let level2Data = await this.$api.apiGetDict(this, {
        type: "zyfl",
        pid: majorId || level1Data[0].code,
        schoolType: this.current + 1
      });
      if (level2Data.length) {
        level2Data[0].open = true;
        this.level2Open = 0;
        this.level2 = level2Data;
      } else {
        this.level3 = [];
        return;
      }
      let level3Data = await this.$api.apiGetDict(this, {
        type: "zyfl",
        pid: level2Data[0].code,
        schoolType: this.current + 1
      });
      this.level3 = level3Data;
      uni.hideLoading();
    },
    /* 进入专业详情 */
    handleItemTap(item) {
      this.$tool.toolistoolTiaoToken(
        `./ProfessionDesc?id=${item.code}&name=${item.name}&type=${this
          .current + 1}`
      );
    },
    change(index) {
      this.current = index;
    },
    swiperChange({ detail: { current } }) {
      this.current = current;
      this.initData();
      this.categoryActive = 0;
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

<style scoped lang="scss">
@import "./majorDatabase.scss";
</style>
