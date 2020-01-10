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
      type: 1, //对比类型，1学校、2专业
      key1: "院校",
      key2: "schoolname",
      key3: "schoolno",
      key4: "./SchoolPkDetail"
    };
  }
};
</script>
