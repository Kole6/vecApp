<template>
  <view class>
    <view class>
      <sl-filter
        ref="filter"
        :menuListArr="menuList"
        :topFixedHeight="topFixedHeight"
        :topFixed="true"
        @result="handleSearch"
        @conditionTap="handleConditionTap"
      ></sl-filter>
    </view>
    <load-more
      ref="scroll"
      @onPullDown="onPullDown"
      @onLoadMore="onLoadMore"
      :styleObj="{ height: systemInfo.screenHeight - 100 + 'px' }"
      :loadStatus="loadStatus"
    >
      <view class="list">
        <school-list showType="4" :listArr="dataArr" />
      </view>
    </load-more>
  </view>
</template>

<script>
import slFilter from "@/components/sl-filter/sl-filter.vue";
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import loadMore from "@/components/loadMore/you-scroll.vue";
export default {
  components: { slFilter, schoolList, loadMore },
  props: {
    type: {
      type: Number,
      default: 0
    },
    params: Object
  },
  mounted() {
    // #ifdef APP-PLUS
    this.topFixedHeight = "0px";
    // #endif
    this.currentSearch.provinceId = this.params.provinceId;
    this.initSearch();
  },
  data() {
    return {
      provinceArr: [],
      cityArr: [],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      currentSearch: {},
      topFixedHeight: "44px",
      dataArr: [],
      loadStatus: "more",
      systemInfo: uni.getSystemInfoSync(),
      menuList: [
        {
          title: "省份",
          isMutiple: false,
          key: "key_1",
          detailList: []
        },
        {
          title: "城市",
          key: "key_2",
          isMutiple: false,
          detailList: [
            {
              title: "全部",
              value: ""
            }
          ]
        },
        {
          title: this.type == 1 ? "学校类型" : "性质类别",
          key: "key_3",
          isMutiple: false,
          detailList: []
        },
        {
          title: "学校属性",
          key: "key_4",
          isMutiple: false,
          nowrap: true,
          detailList: []
        }
      ]
    };
  },
  methods: {
    /* 转化数据 */
    transformData(data) {
      return data.map(item => {
        return {
          ...item,
          title: item.name,
          value: item.code
        };
      });
    },
    /* 获取字典数据 */
    async initSearch() {
      try {
        // 获取省
        let provinceData = await this.$api.apiGetDict(this, {
          type: "xzqh",
          schoolType: this.params.schoolType,
          pid: "0"
        });
        if (!provinceData.length) return;
        this.provinceArr = this.transformData(provinceData);
        // 获取市
        let cityData = await this.$api.apiGetDict(this, {
          type: "xzqh",
          schoolType: this.params.schoolType,
          pid: provinceData[0].code
        });
        if (!cityData.length) return;
        this.cityArr = this.transformData(cityData);
        // 获取学校属性
        let xxsx = await this.$api.apiGetDict(this, {
          type: this.type == 1 ? "xxsx_gz" : "xxsx_zz",
          pid: "0"
        });
        this.menuList[3].detailList = this.transformData(xxsx);
        // 获取性质类别
        let xxxz = await this.$api.apiGetDict(this, {
          type: this.type == 1 ? "xxlx_gz" : "xxxz_zz",
          pid: "0"
        });
        this.menuList[2].detailList = this.transformData(xxxz);
        this.$nextTick(() => {
          this.$refs.filter.resetMenuList(this.menuList);
        });
        if (this.params.provinceId) {
          this.setSearch(this.params.provinceId);
        }
        this.onLoadMore(); // 初次加载数据
      } catch (err) {}
    },
    /* 查询数据api */
    getData(isRefresh = false) {
      return new Promise((resolve, reject) => {
        this.$http({
          url: "/zjq/College/GetSchoolSearchList",
          header: "form",
          data: {
            ...this.currentSearch,
            schoolType: this.params.schoolType,
            token: uni.getStorageSync("token"),
            pageIndex: this.page.pageIndex,
            pageSize: this.page.pageSize
          }
        }).then(res => {
          if (res.code == 0) {
            let data = this.$tool.toolSchoolList(res.data.list);
            if (isRefresh) {
              this.page.pageIndex = 2;
              this.dataArr = data;
            } else {
              this.page.pageIndex++;
              this.dataArr.push(...data);
            }
            resolve(res.data.lastPage);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
          }
        });
      });
    },
    /* 初始省份 */
    setSearch(provinceId) {
      let index = 0,
        provinceName = "",
        data = JSON.parse(JSON.stringify(this.menuList)),
        provinceArr = this.provinceArr.map((item, idx) => {
          if (provinceId == item.value) {
            index = idx;
            provinceName = item.title;
          }
          return {
            ...item
          };
        });
      data[0].detailList = provinceArr;
      if (provinceId) {
        this.$api
          .apiGetDict(this, {
            type: "xzqh",
            schoolType: this.params.schoolType,
            pid: provinceId
          })
          .then(resData => {
            let cityData = this.transformData(resData);
            data[1].detailList = cityData;
            data[0].title = provinceName;
            data[0].defaultSelectedIndex = index;
            if (cityData.length == 1) {
              data[1].defaultSelectedIndex = 0;
              data[1].title = cityData[0].title;
            }
            this.$nextTick(() => {
              this.$refs.filter.resetMenuList(data);
            });
          });
      }
      this.$nextTick(() => {
        this.$refs.filter.resetMenuList(data);
      });
    },
    /* 点击查询 */
    handleSearch(result) {
      console.log("result", result);
      let para = {};
      para.attribute = result.key_4; //性质类别
      para.provinceId = result.key_1; //省
      if (result.key_2) {
        para.cityId = result.key_2; //市
      }
      para.property = result.key_3; //学校属性
      this.currentSearch = para;
      this.onPullDown();
    },
    /* 上拉 */
    onPullDown(done) {
      this.page.pageIndex = 1;
      this.getData(true)
        .then(isLastPage => {
          if (isLastPage) {
            this.loadStatus = "noMore";
          } else {
            this.loadStatus = "more";
          }
        })
        .finally(() => {
          done && done();
        });
    },
    /* 下拉 */
    onLoadMore() {
      if (this.loadStatus == "more") {
        this.loadStatus = "loading";
        this.getData().then(isLastPage => {
          if (isLastPage) {
            this.loadStatus = "noMore";
          } else {
            this.loadStatus = "more";
          }
        });
      }
    },
    /* 选择省份的时候进行城市赋值 */
    handleConditionTap({ key, list, index }) {
      if (key == "key_1") {
        this.setSearch(list[index].code);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.list {
  background: #ffffff;
}
</style>
