<template>
  <view>
    <message-info
      :message="`已添加 ${listPk.length} 个${key1}到对比库`"
      :isShow.sync="isShowMessage"
      @close="handleMessageClose"
    />
    <view class="wrapper">
      <view class="list-item" v-for="(item,index) in listPk" :key="index">
        <view class="flag" @click="handleListTaped(index,item)">
          <block v-if="item.hasSelected">
            <view class="selecting"></view>
          </block>
          <block v-else>
            <image
              src="/static/indexIcon/selected.png"
              mode="aspectFit"
              style="height: 36upx; width:36upx"
            />
          </block>
        </view>
        <school-list-item
          :item="item"
          :showType="4"
          :handleTaped="false"
          @taped="handleListTaped(index,item)"
          :isSpecial="type!=1"
        ></school-list-item>
      </view>
    </view>
    <view class="line"></view>
    <view class="m-tips" @tap="toAdd">
      <image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx; height: 40upx;" />
      <text>{{text}}</text>
    </view>
    <!-- 底部按钮 -->
    <view class="m-bottom">
      <view class="left" @tap="toBack">退出</view>
      <view class="right" @tap="toDetail">开始对比</view>
    </view>
  </view>
</template>

<script>
import messageInfo from "@/components/vec-message-info/vec-message-info.vue";
import schoolListItem from "@/components/vec-school-list/SchoolListItem.vue";
import { ConfigContrast } from "@/config";
export default {
  components: {
    schoolListItem,
    messageInfo
  },
  props: {
    type: Number,
    key1: String,
    key2: String,
    key3: String,
    key4: String,
    key5: String,
    listPk: Array
  },
  data() {
    return {
      isShowMessage: true,
      text: ""
    };
  },
  mounted() {
    this.text = `继续添加对比${this.key1},最多添加 ${ConfigContrast} 个`;
  },
  methods: {
    async apiMyComparison(that, optype, type, id) {
      await this.$api.apiMyComparison(that, optype, type, id);
    },
    handleListTaped(i, item) {
      let that = this;
      uni.showModal({
        content: `是否将 ${item[this.key2]} 移出对比库`,
        success: function(res) {
          if (res.confirm) {
            that.apiMyComparison(that, "D", that.type, item[that.key3]);
            that.$emit("pkSplice", i);
          }
        }
      });
    },
    handleMessageClose() {
      this.isShowMessage = false;
    },
    toAdd() {
      if (this.listPk.length >= ConfigContrast) {
        uni.showToast({
          title: `最多只能选取 ${
            this.type == 1
              ? ` ${ConfigContrast} 所院校`
              : ` ${ConfigContrast} 个专业`
          } 进行对比哦`,
          icon: "none"
        });
        return;
      }
      uni.navigateTo({ url: this.key4 });
    },
    /* toDetail() {
      let arr = this.$tool.toolPkList(this.listPk, this.type);
      uni.navigateTo({ url: `${this.key5}?ids=${arr.toString()}` });
    }, */
    toDetail() {
      if (this.listPk.length < 2) {
        let t = `请选择2${this.type == 1 ? "所" : "个"}${
          this.key1
        }学校进行对比！`;
        uni.showToast({
          title: t,
          icon: "none"
        });
      } else if (this.type == 2 && this.listPk[0].xlcc != this.listPk[1].xlcc) {
        uni.showToast({
          title: "不同学历层次专业不能进行对比!",
          icon: "none"
        });
      } else {
        let arr = this.$tool.toolPkList(this.listPk, this.type);
        uni.navigateTo({ url: `${this.key5}?ids=${arr.toString()}` });
      }
    },
    toBack() {
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style scoped lang="scss">
@import "./pk.scss";
</style>
