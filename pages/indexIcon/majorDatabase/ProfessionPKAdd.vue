<template>
  <view>
    <vec-pk-add :type="type" :key1="key1" :key2="key2" :key3="key3" :key4="key4" />
  </view>
</template>

<script>
import vecPkAdd from "@/components/vec-pk/vec-pk-add.vue";
export default {
  components: {
    vecPkAdd
  },
  data() {
    return {
      type: 2, //对比类型，1学校、2专业
      key1: "专业",
      key2: "majorname",
      key3: "majorcode",
      key4: "./ProfessionPKDetail"
    };
  }
};
</script>
