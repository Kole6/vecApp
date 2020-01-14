<template>
  <view>
    <vec-pk
      :type="type"
      :key1="key1"
      :key2="key2"
      :key3="key3"
      :key4="key4"
      :key5="key5"
      :listPk="listPk"
      @pkSplice="pkSplice"
    />
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
      type: 1, //对比类型，1学校、2专业
      key1: "院校",
      key2: "schoolname",
      key3: "schoolno",
      key4: "./SchoolPkAdd",
      key5: "./SchoolPkDetail",
      listPk: []
    };
  },
  onShow() {
    this.getCompareInfo();
  },
  methods: {
    async getCompareInfo() {
      let list = await this.$api.apiGetComparison(this, this.type);
      this.listPk =
        this.type == 1
          ? this.$tool.toolSchoolList(list)
          : this.$tool.toolMajorList(list);
    },
    pkSplice(i) {
      this.listPk.splice(i, 1);
    }
  }
};
</script>
