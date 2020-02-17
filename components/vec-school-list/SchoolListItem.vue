<template>
  <view class="list-content" :class="{'has':showBorder}" @tap="handleTap">
    <view class="left">{{getFirst(item)}}</view>
    <view class="right">
      <rich-text class="title" :nodes="item.title"></rich-text>
      <view class="right-tag tag1">
        <view>
          <text
            :class="{'tag-text':item.tags[1].value}"
          >{{ item.tags[0].name}}：{{item.tags[0].value}}</text>
          <text v-if="item.tags[1].value">{{ item.tags[1].name}}：{{item.tags[1].value}}</text>
        </view>
      </view>
      <view class="right-tag">
        <view v-if="isSpecial">
          <text
            :class="{'tag-text':item.cards[1].value}"
          >{{ item.cards[0].name}}：{{item.cards[0].value}}</text>
          <text v-if="item.cards[1].value">{{ item.cards[1].name}}：{{item.cards[1].value}}</text>
        </view>
        <view class="right-card" v-else>
          <text v-for="(card,index) in item.cards" :key="index" class="card">{{ card.name}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    handleTaped: Boolean,
    isSpecial: {
      type: Boolean, // 是否特殊显示cards，第二行有两种显示方式，专业true:[{name:value}] 院校false: [name]
      default: false
    }
  },
  methods: {
    handleTap() {
      console.log("this.handleTaped", this.handleTaped);
      if (!this.handleTaped) {
        this.$emit("taped", this.item); //不走学校详情，走其它url或者其它点击效果
        return;
      }
      if (this.item.level == "本科") {
        uni.showToast({
          title: "本科院校暂未开放~",
          icon: "none"
        });
        return;
      }
      if (this.item.schoolno) {
        let card = this.item.cards.map(k => {
          return k.name;
        });
        this.$tool.toolistoolTiaoToken(
          `/pages/schoolDetails/SchoolDetail?schoolno=${
            this.item.schoolno
          }&cards=${card.join(",")}`
        );
      }
    },
    getFirst(item) {
      return item.schoolname
        ? item.schoolname.substr(0, 1)
        : item.majorname
        ? item.majorname.substr(0, 1)
        : item.title.substr(0, 1);
    }
  }
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.list-content {
  padding: 30upx;

  &.has {
    border-bottom: solid 1px $main-dividing-line1;
  }

  .left {
    display: inline-flex;
    width: 120upx;
    height: 120upx;
    border-radius: 120upx;
    background: #ffffff;
    border: solid 1px $main-base-color;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    font-size: 45upx;
    color: $main-base-color;
  }

  .right {
    display: inline-block;
    width: calc(100% - 150upx);
    vertical-align: middle;
    margin-left: 20upx;
    font-size: $uni-font-size-lg;

    .title {
      color: #333333;
    }
    .right-tag {
      display: flex;
      align-items: center;
      padding-top: 10upx;
      font-size: $uni-font-size-base;
      color: #666666;
      // #ifdef APP-PLUS
      // padding-top: 0upx;
      // #endif
      .tag-text {
        border-right: solid 1px $uni-border-color;
        margin-right: 10upx;
        padding-right: 10upx;
      }
    }
    .tag1 {
      padding-top: 15upx;
    }
    .right-card {
      width: 550upx;
      margin-top: 5upx;
      // #ifdef APP-PLUS
      // padding-top: 15upx;
      // #endif
      .card {
        position: relative;
        border: 1px solid #ff750f;
        border-radius: 10upx;
        margin-right: 15upx;
        font-size: 28upx;
        padding: 0upx 10upx;
        color: #ff750f;
        height: 34upx;
        line-height: 34upx;
        // #ifdef APP-PLUS
        // padding: 6upx 10upx 4upx 10upx;
        // #endif
      }
    }
  }
}
</style>
