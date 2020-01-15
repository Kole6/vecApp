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
import schoolListItem from "@/components/vec-school-list/SchoolListItem.vue";
export default {
  components: { schoolListItem },
  props: {
    listArr: {
      type: Array,
      required: true
    },
    showType: {
      type: [Number, String], // 显示类型：1 仅显示文字描述 2 : 仅显示name:value值  3: 仅显示tag标签  4: 全部显示
      default: "1"
    },
    url: String,
    isSpecial: {
      type: Boolean, // 是否特殊显示cards，第二行有两种显示方式，专业true:[{name:value}] 院校false: [name]
      default: false
    },
    handleTaped: {
      type: Boolean, //true:直接走学校详情； false：走@taped方法
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
