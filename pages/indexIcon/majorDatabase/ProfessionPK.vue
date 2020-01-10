<template>
  <view>
    <vec-pk :type="type" :key1="key1" :key2="key2" :key3="key3" :key4="key4" :key5="key5" />
  </view>
</template>

<script>
import vecPk from "@/components/vec-pk/vec-pk.vue";
export default {
  components: {
    vecPk
  },
  data() {
    return {
      type: 2, //对比类型，1学校、2专业
      key1: "专业",
      key2: "majorname",
      key3: "majorcode",
      key4: "./ProfessionPKAdd",
      key5: "./ProfessionPKDetail"
    };
  }
};
</script>
