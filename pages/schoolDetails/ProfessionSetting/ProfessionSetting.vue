<template>
  <view class>
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
      :style="{height:`${scrollH-85}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
      :current="current"
      @change="swiperChange"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <!-- 学校专业 -->
      <swiper-item>
        <scroll-view scroll-y style="height: 100%;">
          <my-follow />
        </scroll-view>
      </swiper-item>
      <!-- 专业学生分布 -->
      <swiper-item>
        <profession-student :sid="sid" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import myFollow from "./MyFollow.vue";
import professionStudent from "./Part2.vue";
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
export default {
  components: { myFollow, professionStudent, QSTabs },
  data() {
    return {
      tabs: ["学校专业", "专业学生分布"],
      current: 0,
      sid: ""
    };
  },
  onLoad(e) {
    this.sid = e.sid;
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
<style lang="scss" scoped>
.m-card {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 0 110upx;
  background: #ffffff;
  .card-item {
    box-sizing: border-box;
    padding: 21upx 10upx;
    font-size: $uni-font-size-lg;
    color: $main-text-color;
  }
  .card-item.active {
    border-bottom: solid 4upx $main-base-color;
    color: $main-base-color;
  }
}
</style>
