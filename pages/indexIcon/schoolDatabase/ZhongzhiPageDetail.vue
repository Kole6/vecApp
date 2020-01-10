<template>
  <view>
    <vec-school-detail :type="type" :params="params" />
  </view>
</template>

<script>
import vecSchoolDetail from "@/components/vec-school-page/vec-schoool-detail.vue";
export default {
  components: {
    vecSchoolDetail
  },
  onLoad(e) {
    this.params = {
      provinceId: e.provinceId,
      province: e.province,
      schoolType: 2
    };
  },
  data() {
    return {
      type: 2,
      params: {}
    };
  },

  methods: {}
};
</script>