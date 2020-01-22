<template>
  <view :style="styleObj">
    <!-- 专业信息-专业介绍 -->
    <view class="f-filter">
      <sl-filter
        ref="filter"
        @conditionTap="handleConditionTap"
        :menuListArr="menuList"
        :topFixed="true"
        :topFixedHeight="topFixedHeight"
        @result="handleSearch"
      ></sl-filter>
    </view>
    <load-more
      ref="scroll"
      @onPullDown="onPullDown"
      @onLoadMore="onLoadMore"
      :loadStatus="loadStatus"
    >
      <view class="m-result">
        <school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
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
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      currentSearch: {
        token: uni.getStorageSync("token")
      },
      provinceArr: [],
      cityArr: [],
      params: {},
      loadStatus: "more",
      systemInfo: uni.getSystemInfoSync(),
      topFixedHeight: "44px",
      wrapperHeight: "auto",
      styleObj: {
        overflow: "auto",
        "background-color": "#fff"
      },
      dataArr: [],
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
          detailList: []
        },
        {
          title: "性质类别",
          key: "key_3",
          isMutiple: false,
          detailList: []
        },
        {
          title: "学校属性",
          key: "key_4",
          isMutiple: false,
          detailList: []
        }
      ],
      listArr: [
        {
          title: "汽车运用与维护",
          tags: [
            {
              name: "专业大类",
              value: "交通运输类"
            },
            {
              name: "代码",
              value: "0825001234"
            }
          ],
          cards: [
            {
              name: "学历层次",
              value: "高职"
            },
            {
              name: "专业年限",
              value: "3年"
            }
          ]
        },
        {
          title: "汽车运用与维护",
          tags: [
            {
              name: "专业大类",
              value: "交通运输类"
            },
            {
              name: "代码",
              value: "0825001234"
            }
          ],
          cards: [
            {
              name: "学历层次",
              value: "高职"
            },
            {
              name: "专业年限",
              value: "3年"
            }
          ]
        }
      ]
    };
  },
  onLoad(Option) {
    this.params = Option;
    this.currentSearch.zyid = Option.zyid;
    // 改变导航栏标题名称
    uni.setNavigationBarTitle({
      title: Option.name || ""
    });
    // #ifdef APP-PLUS
    (this.topFixedHeight = "0"),
      // #endif
      // #ifdef H5
      (this.topFixedHeight = "44px"),
      // #endif
      this.initSearch();
    this.getSimilarData();
  },
  mounted() {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".list-simi")
      .boundingClientRect(data => {
        this.wrapperHeight =
          this.systemInfo.screenHeight - data.top - 75 + "px";
        // #ifdef H5
        this.wrapperHeight =
          this.systemInfo.screenHeight - data.top - 44 + "px";
        // #endif
      })
      .exec();
  },
  methods: {
    getSimilarData() {
      this.$http({
        url: "/zjq/mainpage/GetMajorInfo",
        header: "form",
        data: {
          zyid: this.params.zyid,
          schoolType: this.params.schoolType
        }
      }).then(res => {
        console.log(res);
      });
    },
    transformData(data, type = 1) {
      if (type === 1) {
        return data.map(item => {
          return {
            ...item,
            title: item.name,
            value: item.code
          };
        });
      } else if (type === 2) {
        return data.map(item => {});
      } else {
        return data;
      }
    },
    async initSearch() {
      try {
        // 获取省
        let provinceData = await this.getSearchCondition({
          type: "xzqh",
          schoolType: this.params.schoolType,
          pid: "0"
        });
        if (!provinceData.length) return;
        this.provinceArr = this.transformData(provinceData);
        // 获取市
        let cityData = await this.getSearchCondition({
          type: "xzqh",
          schoolType: this.params.schoolType,
          pid: provinceData[0].code
        });
        if (!cityData.length) return;
        this.cityArr = this.transformData(cityData);
        // 获取性质类别与学校属性
        let schoolType = await this.getSearchCondition({
          type: "xxlx",
          pid: "0",
          schoolType: this.params.schoolType
        });

        this.menuList[2].detailList = this.transformData(schoolType);
        let xxxz = await this.getSearchCondition({
          type: "xxxz",
          pid: "0",
          schoolType: this.params.schoolType
        });
        this.menuList[3].detailList = this.transformData(xxxz);
        this.$nextTick(() => {
          this.$refs.filter.resetMenuList(this.menuList);
        });
        this.setSearch("", true);
        // 初次加载数据
        this.onLoadMore();
      } catch (err) {}
    },
    getSearchCondition(data = {}) {
      return new Promise((resolve, reject) => {
        this.$http({
          url: "/zjq/mainpage/GetDict",
          header: "form",
          data
        }).then(res => {
          if (res.code == 0) {
            resolve(res.data);
          } else {
            uni.showToast({
              title: res.message,
              icon: "none"
            });
            reject();
          }
        });
      });
    },
    onPullDown(done) {
      this.page.pageIndex = 1;
      let params = {
        ...this.currentSearch,
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      };
      this.getData(params, true)
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
    onScroll() {},
    onLoadMore() {
      this.loadStatus = "loading";
      this.getData().then(isLastPage => {
        if (isLastPage) {
          this.loadStatus = "noMore";
        } else {
          this.loadStatus = "more";
        }
      });
    },
    getData(
      data = {
        ...this.currentSearch,
        pageIndex: this.page.pageIndex,
        pageSize: this.page.pageSize
      },
      isRefresh = false
    ) {
      return new Promise((resolve, reject) => {
        this.$http({
          url: "/zjq/College/GetXxByZy",
          header: "form",
          data
        }).then(res => {
          if (res.code == 0) {
            let data = this.$tool.toolSchoolList(res.data.list);
            if (isRefresh) {
              this.page.pageIndex = 1;
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
    handleListTaped(item) {},
    handleRouter({ url }, isRedirect = false) {
      if (isRedirect) {
        uni.redirectTo({
          url
        });
      } else {
      }
    },
    handleSearch(result) {
      if (!result.key_2) {
        uni.showToast({
          title: "请选择具体城市",
          duration: 1000,
          icon: "none"
        });
        return;
      }
      this.currentSearch = {
        ...this.currentSearch,
        provinceId: result.key_1,
        cityId: result.key_2,
        schoolType: result.key_3,
        exampleSchool: result.key_4
      };
      this.onPullDown();
    },
    handleConditionTap({ key, list, index }) {
      // 选择省份的时候进行城市赋值
      if (key == "key_1") {
        this.setSearch(list[index].code);
      }
    },
    setSearch(provinceId, isFirst = false) {
      // 初始省份
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
      if (!provinceId) {
        provinceName = provinceArr[0].title;
      }
      data[0].detailList = provinceArr;
      this.getSearchCondition({
        type: "xzqh",
        schoolType: this.params.schoolType,
        pid: provinceId ? provinceId : provinceArr[0].code
      }).then(resData => {
        let cityData = this.transformData(resData);
        data[1].detailList = cityData;
        if (isFirst) {
          this.$nextTick(() => {
            this.$refs.filter.resetMenuList(data);
          });
          return;
        }
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
      this.$nextTick(() => {
        this.$refs.filter.resetMenuList(data);
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "./common.scss";
.m-result {
  background: #ffffff;
}
.list-simi {
  overflow: auto;
  background: #ffffff;
}
</style>
