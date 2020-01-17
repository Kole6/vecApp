<template>
  <view class="content">
    <view class="have-data" v-if="haveData">
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
        :style="{height:`${scrollH-84}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}"
        :current="current"
        @change="swiperChange"
      >
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view
              v-for="(ite, ind) in favoriteList1"
              :key="ind"
              class="sc-it"
              hover-class="navigator-hover"
              @tap="toSchoolDetail(ite)"
            >{{ite.schoolname}}</view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;">
            <view
              v-for="(ite, ind) in favoriteList2"
              :key="ind"
              class="sc-it"
              hover-class="navigator-hover"
              @tap="toProfessionDesc(ite)"
            >{{ite.majorname}}</view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!-- <view class="no-data">
			<image src="/static/no_data.png" mode="aspectFill" />
			<p>你目前还没有关注的学校哦～</p>
    </view>-->
  </view>
</template>

<script>
import QSTabs from "@/components/QS-tabs/QS-tabs.vue";
export default {
  onLoad() {
    this.getFavoriteList();
  },
  components: {
    QSTabs
  },
  data() {
    return {
      haveData: true,
      tabs: ["学校", "专业"],
      current: 0,
      favoriteList1: [],
      favoriteList2: []
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
    getFavoriteList() {
      this.$api.apiGetFavoriteList(this, "1");
      this.$api.apiGetFavoriteList(this, "2");
    },
    change(index) {
      console.log("change", index);
      this.current = index;
    },
    swiperChange({ detail: { current } }) {
      console.log("swiperChange", current);
      this.current = current;
    },
    toSchoolDetail(ite) {
      uni.navigateTo({
        url: `../../schoolDetails/SchoolDetail?schoolno=${ite.schoolno}`
      });
    },
    toProfessionDesc(item) {
      uni.navigateTo({
        url: `../../indexIcon/majorDatabase/ProfessionDesc?id=${
          item.majorcode
        }&name=${item.majorname}&type=${item.xlcc == "中职" ? 2 : 1}`
      });
    }
  }
};
</script>

<style scoped lang="scss">
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

.no-data {
  image {
    width: 444upx;
    height: 374upx;
    margin-top: 200upx;
    text-align: center;
  }

  p {
    text-align: center;
    margin-top: 10upx;
    font-size: 30upx;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 40px;
  }
}
</style>
