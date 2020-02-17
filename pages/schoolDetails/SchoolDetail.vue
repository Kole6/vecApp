<template>
  <view>
    <uni-nav-bar
      @clickLeft="handleBack"
      left-icon="arrowleft"
      :shadow="false"
      :border="false"
      title="学校详情"
    >
      <view class="f-sc" slot="right" @tap="handlePkOne">
        <view class="f-sc-box">
          <image src="/static/p703.png" mode="aspectFit" />
          <!-- <text>秒懂</text> -->
        </view>
      </view>
    </uni-nav-bar>
    <view class="m-wrapper" :style="{ height: wrapperHeight, overflow: 'auto' }">
      <view class="m-top">
        <view class="base">
          <view class="left" v-if="schoolInfo.logo" @tap="handleLogoTaped">
            <image :src="schoolInfo.logo" mode="aspectFill" style="width: 100%; height: 100%;" />
          </view>
          <view class="left" v-else @tap="handleLogoTaped">{{getFirst(schoolInfo.name)}}</view>
          <view class="right">
            <view class="title">{{schoolInfo.name}}</view>
            <view class="info">
              <text>{{schoolInfo.city}}</text>
              <text v-show="schoolInfo.establishdate">{{schoolInfo.establishdate}}</text>
              <text v-show="schoolInfo.schoolType">{{schoolInfo.schoolType}}</text>
            </view>
            <view class="num">
              <text>学校标识码：{{schoolInfo.schoolno}}</text>
            </view>
          </view>
          <view class="f-site" @tap="toWebsite">官网</view>
          <view class="f-dz">
            <view class="dz-s" @tap="handleDZ">
              <image
                :src="hasDZ ? '/static/indexIcon/dzs.png' : '/static/indexIcon/dz.png'"
                mode="aspectFit"
                style="width: 40upx; height: 40upx;"
              />
              <text>{{ schoolInfo.dzNumber }}</text>
            </view>
            <image
              @tap="handleSC"
              :src=" `/static/indexIcon/${hasSC ? 'sc2' : 'sc1'}.png`"
              mode="aspectFit"
              style="height: 34upx; width: 34upx;padding-left:4upx"
            />
          </view>
        </view>
        <view class="left-tag">
          <text @tap="handleLogoTaped">学校标签画像</text>
        </view>
        <view class="tags-car">
          <view class="car" v-for="(item,index) in params.cards" :key="index">{{item}}</view>
        </view>
        <view class="address">
          <text>地址：</text>
          <text>{{schoolInfo.address}}</text>
        </view>
      </view>
      <view class="line"></view>
      <!-- 对比列表 -->
      <view class="m-tip">
        <image src="/static/p704.png" mode="aspectFill" />
        <text>升级为</text>
        <text class="vip">VIP</text>
        <text>，畅享无限量比对服务！</text>
      </view>
      <!-- <view class="m-tip">您还可以进行院校对比哦！ 您已经添加 {{numberDB}} 个学校</view> -->
      <view class="m-pk">
        <view class="left" v-if="hasDB" @tap="apiMyComparison('D')">
          <image
            src="/static/indexIcon/delete.png"
            mode="aspectFit"
            style="width: 40upx;height: 40upx;"
          />
          <text>在比对列表中删除本学校</text>
        </view>
        <view class="left" v-else @tap="apiMyComparison('A')">
          <image
            src="/static/indexIcon/add.png"
            mode="aspectFit"
            style="width: 40upx;height: 40upx;"
          />
          <text>添加本学校到比对列表</text>
        </view>
        <view class="right" @tap="handlePK">
          <text>比对</text>
        </view>
        <image
          class="bg1"
          @tap="handlePK"
          src="/static/indexIcon/colorGroup.png"
          mode="aspectFit"
          style="width: 300upx;height: 100upx;"
        />
        <image
          class="bg2"
          @tap="handlePK"
          src="/static/indexIcon/vszong.png"
          mode="aspectFit"
          style="width: 70upx;height: 70upx;"
        />
      </view>

      <view class="m-info">
        <view class="u-title">
          <text>基本信息</text>
        </view>
        <view class="example-body">
          <uni-grid @change="toIndexicon1" :column="4" border-color="#eee" :show-border="true">
            <uni-grid-item v-for="(item, index) in detailList1" :key="index">
              <image class="image" :src="`/static/detail/${item.img}.png`" mode="aspectFill" />
              <text class="text">{{ item.name }}</text>
            </uni-grid-item>
          </uni-grid>
        </view>
      </view>
      <view class="m-info">
        <view class="u-title">
          <text>学校实力</text>
        </view>
        <view class="example-body">
          <uni-grid @change="toIndexicon2" :column="4" border-color="#eee" :show-border="true">
            <uni-grid-item v-for="(item, index) in detailList2" :key="index">
              <image class="image" :src="`/static/detail/${item.img}.png`" mode="aspectFill" />
              <text class="text">{{ item.name }}</text>
            </uni-grid-item>
          </uni-grid>
        </view>
      </view>
      <view
        class="m-school_list"
        @tap="handleRouter(`./NearbySchool/NearbySchoolList?sid=${schoolInfo.schoolno}`)"
      >
        <text>附近学校</text>
        <uni-icons type="arrowright" size="24" />
      </view>
      <view class="m-info">
        <view class="title f-link">
          <text>学校资讯</text>
        </view>
        <zi-xun :newList="newList" />
      </view>
    </view>
    <uni-popup :show="showModal" type="center" :custom="true" :mask-click="false">
      <view class="uni-tip">
        <view class="pai">
          <image src="/static/p801.png" mode="widthFix" />
        </view>
        <view class="guang">
          <image src="/static/p803.png" />
        </view>
        <view class="close">
          <image @tap="showModal = false" src="/static/p802.png" />
        </view>
        <view class="bu"></view>
        <view class="tip-list">
          <view class="list">985学校</view>
          <view class="list">全国继续院校</view>
          <view class="list">现代学徒制</view>
          <view class="list">现代学徒制</view>
          <view class="list">现代学徒制</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import uniIcons from "@/components/uni-icons/uni-icons";
import ziXun from "@/components/ziXun/ziXunLeft.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniGrid from "@/components/uni-grid/uni-grid.vue";
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
import { ConfigContrast } from "@/config";
export default {
  components: {
    uniNavBar,
    uniIcons,
    ziXun,
    uniPopup,
    uniGrid,
    uniGridItem
  },
  data() {
    return {
      params: {},
      schoolInfo: {
        name: "学校名称",
        city: "-",
        establishdate: "-",
        schoolType: "-",
        schoolTags: [],
        dzNumber: 0,
        schoolno: "",
        address: "学校地址",
        logo: "",
        website: "http://www.baidu.com",
        baike: "https://baike.baidu.com/item/北京电子科技职业学院"
      },
      showModal: false, //模态框显示
      hasDZ: false, //是否点赞
      hasSC: false, //是否关注
      hasDB: false, //是否对比
      numberDB: 0,
      wrapperHeight: "auto",
      systemInfo: uni.getSystemInfoSync(),
      newList: [],
      styleObj: {
        top: "250px"
      },
      // params  从schoolInfo中获取数据拼接到参数中
      detailList1: [
        {
          name: "学校简介",
          url: "./schoolProfile",
          img: "100",
          params: [
            {
              key: "schoolName",
              value: "name"
            }
          ]
        },
        {
          name: "校领导",
          url: "./SchoolLeader/SchoolLeader",
          img: "106",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "学校荣誉",
          url: "./schoolHonors/schoolHonors",
          img: "109",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "奖助学金",
          url: "./assistanceScholarship/assistanceScholarship",
          img: "102",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        }
      ],
      detailList2: [
        {
          name: "师资情况",
          url: "./ourFaculty/ourFaculty",
          img: "105",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "专业分布",
          url: "./jsmind",
          img: "108",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "优势专业",
          url: "./ProfessionSetting/ProfessionSetting",
          img: "110",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "技能大赛",
          url: "./skillsCompetition/skillsCompetition",
          img: "101",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "就业创业",
          url: "./entrepreneurship/entrepreneurship",
          img: "103",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "校企合作",
          url: "./cooperation/cooperation",
          img: "107",
          params: [
            {
              key: "sid",
              value: "schoolno"
            }
          ]
        },
        {
          name: "质量年报",
          url: "/pages/indexIcon/materialDatabase/FileDetail?fileId=4",
          img: "111",
          params: [
            {
              key: "sid",
              value: "schoolno"
            },
            {
              key: "fileId",
              value: "fileId"
            }
          ]
        }
      ],
      permission: {
        isVip: false,
        ckzycs: 0,
        sjbdcs: 0,
        ckzlcs: 0
      }
    };
  },
  mounted() {
    // 限制列表高度
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".m-wrapper")
      .boundingClientRect(data => {
        let height = "";
        // #ifdef APP-PLUS
        height = this.systemInfo.screenHeight - data.top - 0 + "px";
        // #endif
        // #ifdef H5
        height = this.systemInfo.screenHeight - data.top + "px";
        // #endif
        if (height) {
          this.wrapperHeight = height;
        }
      })
      .exec();
  },
  onShow() {
    this.getCompareInfo();
  },
  onLoad(params) {
    this.params = params;
    this.params.cards = this.params.cards ? this.params.cards.split(",") : [];
    this.getDetail();
    this.judgeHasSC();
    this.getChance();
    this.newList = uni.getStorageSync("hotNewsList");
  },
  methods: {
    async getCompareInfo() {
      let list = await this.$api.apiGetComparison(this, 1);
      this.numberDB = list.length;
      this.hasDB = list.some(item => {
        return item.schoolno == this.params.schoolno;
      });
    },
    async apiMyComparison(optype) {
      if (!this.$tool.toolToken(1)) {
        return;
      }
      if (this.numberDB >= ConfigContrast && optype == "A") {
        uni.showToast({
          title: `最多只能选取 ${ConfigContrast} 所院校进行对比哦！`,
          icon: "none"
        });
        return;
      }
      await this.$api.apiMyComparison(this, optype, 1, this.params.schoolno);
      this.hasDB = !this.hasDB;
      this.getCompareInfo();
    },
    getChance() {
      /*  this.$http({
        url: "/zjq/User/GetUser",
        header: "form",
        data: {
          token: uni.getStorageSync("token")
        }
      }).then(res => {
        if (res.code == 0) {
          this.permission.isVip = !!res.data.isvip;
          this.permission.ckzlcs = res.data.ckzlcs;
          this.permission.ckzycs = res.data.ckzycs;
          this.permission.sjbdcs = res.data.sjbdcs;
        }
      }); */
    },
    judgeHasSC() {
      this.$api.apiGetFavoriteList(this, "1", this.params.schoolno);
    },
    getDetail() {
      this.$http({
        url: "/zjq/College/GetCollegeDetail",
        header: "form",
        data: {
          token: uni.getStorageSync("token"),
          sid: this.params.schoolno
        }
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          this.schoolInfo = {
            ...data,
            name: data.schoolname,
            city: data.city,
            establishdate: data.establishdate,
            schoolType: data.organizernature,
            schoolTags: data.schoolTags,
            dzNumber: data.hitscount,
            schoolno: data.schoolno,
            address: data.address,
            website: data.website,
            baike: data.schoolBaikeUrl
          };
          this.hasDZ = data.isZan;
        }
      });
    },
    handleTab() {
      uni.switchTab({
        url: "../tabBar/info/info"
      });
    },
    handleSC() {
      if (this.$tool.toolToken(1)) {
        this.$api.apiFavorite(this, this.schoolInfo.schoolno);
      }
    },
    handleLogoTaped() {
      this.showModal = true;
    },
    handleRouter(url) {
      uni.navigateTo({
        url: url
      });
    },
    handleMind() {
      uni.navigateTo({
        url: `./jsmind?sid=${this.schoolInfo.schoolno}`
      });
    },
    handleBack() {
      uni.navigateBack();
    },
    handleDZ() {
      if (this.$tool.toolToken(1)) {
        this.apiDz();
      }
    },
    async apiDz() {
      await this.$api.apiLikeit(this, 1, this.schoolInfo.schoolno, this.hasDZ);
      this.hasDZ = !this.hasDZ;
      this.schoolInfo.dzNumber = this.hasDZ
        ? this.schoolInfo.dzNumber + 1
        : this.schoolInfo.dzNumber - 1;
    },
    handlePkOne() {
      uni.showToast({
        title: "数据正在准备中~",
        icon: "none"
      });
      /* uni.navigateTo({
        url: `/pages/schoolDetails/SchoolPk/SchoolPkDetail?ids=${this.schoolInfo.schoolno}`
      }); */
    },
    handlePK() {
      this.$tool.toolistoolTiaoToken("./SchoolPk/SchoolPk", 1);
      // 进行用户验证/VIP验证
      /* const value = uni.getStorageSync('freeChance');
		if (this.permission.sjbdcs || this.permission.isVip) {
			if (this.permission.isVip) {
				uni.navigateTo({
					url: './SchoolPk/SchoolPk'
				});
				return;
			}
			uni.showModal({
				content: '您有一次免费学校对比机会哦~',
				confirmText: '去对比',
				success: result => {
					if (result.confirm) {
						uni.navigateTo({
							url: './SchoolPk/SchoolPk'
						});
					} else if (result.cancel) {}
				},
				complete: () => {}
			});
		} else {
			uni.showModal({
				content: '您还没有开通VIP会员哦~',
				confirmText: '去开通',
				success: result => {
					if (result.confirm) {
						uni.navigateTo({
							url: '../indexIcon/vip/vip'
						})
					}
				}
			});
		} */
    },
    getFirst(name) {
      return name.substr(0, 1);
    },
    toWebsite() {
      if (!this.schoolInfo.website) {
        uni.showToast({
          title: "暂无官网信息！",
          duration: 2000,
          icon: "none"
        });
        return;
      }
      uni.navigateTo({
        url: `./schoolProfile?website=${this.schoolInfo.website}`
      });
    },
    toIndexicon1(e) {
      this.handleTap(this.detailList1[e.detail.index]);
    },
    toIndexicon2(e) {
      this.handleTap(this.detailList2[e.detail.index]);
    },
    handleTap(item) {
      //中职的暂时都不让进入
      /* if (item.name != "学校简介" && this.schoolInfo.schooltype == 2) {
        uni.showToast({
          title: "暂无数据",
          icon: "none"
        });
        return;
      } */
      if (item.name == "质量年报" || item.name == "奖助学金") {
        uni.showToast({
          title: "暂无数据",
          icon: "none"
        });
        return;
      }
      let src = "";
      if (item.url) {
        let stringArr = [];
        if (item.params) {
          item.params.forEach(item => {
            stringArr.push(`${item.key}=${this.schoolInfo[item.value]}`);
          });
        }
        src = item.url + "?" + stringArr.join("&");
        if (item.name == "学校简介" || item.name == "校领导") {
          this.$tool.toolistoolTiaoToken(src);
          return;
        }
        if (this.$tool.toolToken(1)) {
          this.$tool.toolistoolTiaoToken(src);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./schoolDetails.scss";
</style>
