<template>
  <view class="list">
    <block v-for="(item,index) in listArr" :key="index">
      <school-list-item
        class="list-item"
        :is-special="isSpecial"
        :url="url"
        :showType="showType"
        :handleTaped="handleTaped"
        :item="item"
        @taped="handleItemTaped(item,index)"
      />
    </block>
  </view>
</template>

<script>
import schoolListItem from '@/components/vec-school-list/SchoolListItem.vue';
export default {
  components: { schoolListItem },
  props: {
    listArr: {
      type: Array,
      required: true
    },
    // 显示类型：1 仅显示文字描述 2 : 仅显示name:value值  3: 仅显示tag标签  4: 全部显示
    showType: {
      type: [Number, String],
      default: "1"
    },
    url: String,
    isSpecial: {
      type: Boolean,
      default: false
    },
    handleTaped: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    handleItemTaped(item, index) {
      this.$emit("taped", { item, index });
    }
  }
};
</script>

<style scoped lang="scss">
.list-item:first-child {
  border-top: solid 1px $main-dividing-line1;
}
</style>
