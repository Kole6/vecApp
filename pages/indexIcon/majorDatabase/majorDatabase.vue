<!-- 专业库 -->
<template>
  <view>
    <view class="content">
      <view class="page-body">
        <scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'">
          <view
            class="nav-left-item"
            :key="index"
            :class="index == categoryActive ? 'active' : ''"
			@click="level1Click(item, index)"
            v-for="(item, index) in level1"
          >{{ item.name }}</view>
        </scroll-view>
        <scroll-view
          class="nav-right"
          scroll-y
          :scroll-top="scrollTop"
          :style="'height:' + height + 'px'"
		  @scroll="scroll"
          scroll-with-animation
        >
          <uni-collapse>
            <uni-collapse-item
              v-for="(list,index) in level2"
              @taped="level2Click(list,index)"
              :key="list.code"
              :title="list.name"
              :show-animation="true"
              :open="list.open"
            >
              <view
                class="category-item"
                v-for="(item,i) in level3"
                :key="i"
                @tap="handleItemTap(item)"
              >{{item.name}}</view>
            </uni-collapse-item>
          </uni-collapse>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue";
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue";
export default {
  components: { uniCollapse, uniCollapseItem },
  data() {
    return {
      categoryList: [],
      subCategoryList: [],
      level1: [],
      level2: [],
      level2Open: 0,
      level3: [],
      height: 0,
      categoryActive: 0, //当前分类选中index值
      //滚动视图
      scrollTop: 0,
      scrollHeight: 0,
      isShowAll: false //全部展开控制量
    };
  },
  onLoad: function() {
    // 设置分类栏高度，保持在一屏内
	this.height = uni.getSystemInfoSync().windowHeight;
	this.initData();
  },
  methods: {
	/* 点击level1 */
    level1Click(categroy, index) {
      this.categoryActive = index;
      this.scrollTop = -this.scrollHeight * index;
      this.initData(categroy.code);
	},
	/* 点击level2 */
    level2Click(item, index) {
      let level2Data = this.$API.apiGetDict(this,{
        type: "zyfl",
        pid: item.code,
        schoolType: "1"
      })
        .then(data => {
          if (data.length) {
            this.level2[this.level2Open].open = false;
            this.level2Open = index;
            item.open = true;
            this.level3 = data;
          } else {
            this.level3 = [];
          }
        })
        .catch(err => {
          uni.showToast({
            title: err,
            icon: "none"
          });
        });
	},
	/* 获取基础数据 */
    async initData(majorId = "") {
      let level1Data = [];
      if (!majorId) {
        level1Data = await this.$API.apiGetDict(this,{
          type: "zyfl",
          pid: majorId,
          schoolType: "1"
        });
		this.level1 = level1Data;
        if (!level1Data.length) {
          this.level2 = this.level3 = [];
          return;
        }
	  }
      let level2Data = await this.$API.apiGetDict(this,{
        type: "zyfl",
        pid: majorId || level1Data[0].code,
        schoolType: "1"
      });
      if (level2Data.length) {
        level2Data[0].open = true;
        this.level2Open = 0;
        this.level2 = level2Data;
      } else {
        this.level3 = [];
        return;
      }
      let level3Data = await this.$API.apiGetDict(this,{
        type: "zyfl",
        pid: level2Data[0].code,
        schoolType: "1"
      });
      this.level3 = level3Data;
    },
    /* 监听scrollview的滚动事件，在切换时置顶 */
    scroll(e) {
      this.scrollHeight = e.detail.scrollHeight;
	},
	/* 进入专业详情 */
    handleItemTap(target, targetIndex) {
      uni.navigateTo({
        url: `./ProfessionDesc?id=${target.code}&name=${target.name}&type=1`
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import './majorDatabase.scss';
</style>
