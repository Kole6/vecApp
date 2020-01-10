<template>
  <view class="list-content" :class="{'has':showBorder}" @tap="handleTap">
    <view class="left">{{getFirst(item)}}</view>
    <view class="right">
      <!-- 1 仅显示文字描述 2 : 仅显示tags标签  3: 仅显示cards标签  4: 全部显示 -->
      <rich-text class="title" :nodes="item.title"></rich-text>
      <scroll-view
        v-if="showType == 2 || showType ==4"
        scroll-x="true"
        style="white-space: nowrap;display: flex;align-items: center;padding: 15upx 0;"
      >
        <view class="tag tag-text" v-for="(tag,i) in item.tags" :key="i">
          <text>{{ tag.name}}：{{tag.value}}</text>
        </view>
      </scroll-view>
      <scroll-view
        v-if="showType == 3 || showType == 4"
        scroll-x="true"
        style="white-space: nowrap;display: flex;align-items: center;"
      >
        <block v-if="isSpecial">
          <view class="tag tag-text" v-for="(card,index) in item.cards" :key="index">
            <text>{{card.name}}：{{card.value}}</text>
          </view>
        </block>
        <block v-else>
          <view v-show="item.cards[0].name!='null'" style="display: flex;align-items: center;">
            <view class="card" v-for="(card,index) in item.cards" :key="index">
              <text>{{card.name}}</text>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    showType: {
      type: [Number, String],
      default: "1"
    },
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
    url: String,
    isSpecial: {
      type: Boolean, // 是否特殊显示cards
      default: false
    }
  },
  methods: {
    handleTap() {
      if (!this.handleTaped) {
        this.$emit("taped", this.item); //不走学校详情，走其它url或者其它点击效果
        return;
      }
      if (this.item.schoolno) {
        this.$tool.toolistoolTiaoToken(
          `/pages/schoolDetails/SchoolDetail?schoolno=${this.item.schoolno}`
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
    border-radius: 60upx;
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

    .tag,
    .card {
      display: inline-flex;
      font-size: $uni-font-size-base;
      padding: 5upx 10upx;
      border-radius: 10upx;
      border: solid 1px #ff750f;
      color: #666666;
      margin: 0 10upx 0 10upx;
      justify-content: center;
      align-items: center;

      &:first-child {
        margin-left: 0;
      }
    }

    .card {
      color: #ff750f;
    }

    .tag.tag-text {
      // display: inline-block;
      font-size: $uni-font-size-base;
      padding: 0 10upx;
      margin: 0;
      border-radius: 0;
      border: none;
      border-right: solid 1px $uni-border-color;

      &:first-child {
        padding-left: 0;
      }
    }

    .tag.tag-text:last-child {
      border: none;
    }
  }
}
</style>
