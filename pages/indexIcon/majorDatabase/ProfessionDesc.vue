<template>
  <view>
    <uni-nav-bar
      @clickLeft="handleBack"
      left-icon="arrowleft"
      :shadow="false"
      :border="false"
      title="专业信息"
    >
      <view class="f-sc" slot="right" @tap="handleSC">
        <image
          :src="hasSC ? assets.sc2 : assets.sc1"
          mode="aspectFit"
          style="height: 40upx; width: 40upx;"
        />
      </view>
    </uni-nav-bar>
    <view class="content-wrapper" :style="{ height: wrapperHeight }">
      <!-- 基本信息 -->
      <view class="m-base">
        <view class="title">{{ professionInfo.name }}</view>
        <view class="item">
          <text class="name">专业大类</text>
          <text class="value">{{ professionInfo.zydl }}</text>
        </view>
        <view class="item" v-if="params.type==1">
          <text class="name" style="padding: 6upx 32upx;">专业类</text>
          <text class="value">{{professionInfo.zySecondType}}</text>
        </view>
        <view class="item">
          <text class="name">专业代码</text>
          <text class="value">{{ professionInfo.zydm }}</text>
        </view>
        <view class="item">
          <text class="name">学历层次</text>
          <text class="value">{{ professionInfo.xlcc }}</text>
        </view>
        <view class="item">
          <text class="name">修业年限</text>
          <text class="value">{{ professionInfo.xynx }}</text>
        </view>
        <!-- <view class="f-base" @tap="handleDZ">
          <image
            :src="hasDZ ? '/static/indexIcon/dzs.png' : '/static/indexIcon/dz.png'"
            mode="aspectFit"
            style="width: 40upx; height: 40upx;"
          />
          <text>{{ dzNumber }}</text>
        </view>-->
      </view>
      <view class="m-tip">您还可以进行专业对比哦！您已经添加 {{numberDB}} 个专业</view>
      <!-- 对比列表 -->
      <view class="m-pk">
        <view class="left" v-if="hasDB" @tap="apiMyComparison('D')">
          <image
            src="/static/indexIcon/delete.png"
            mode="aspectFit"
            style="width: 40upx;height: 40upx;"
          />
          <text>在比对列表中删除本专业</text>
        </view>
        <view class="left" v-else @tap="apiMyComparison('A')">
          <image
            src="/static/indexIcon/add.png"
            mode="aspectFit"
            style="width: 40upx;height: 40upx;"
          />
          <text>添加本专业到比对列表</text>
        </view>
        <view class="right" @tap="handlePK">
          <text>比对</text>
        </view>
        <image
          class="bg1"
          @tap="handlePK"
          src="/static/indexIcon/colorGroup2.png"
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
      <!-- 专业解读 -->
      <view class="m-pro">
        <view class="title">专业解读</view>
        <view class="list list1">
          <view class="list-title">主要对应职业类型</view>
          <view class="item" v-for="(item, index) in list1" :key="index">{{ item }}</view>
          <view class="item" v-if="toPankong(list1)">暂无</view>
        </view>
        <view class="list list2" v-if="params.type==1">
          <view class="list-title">衔接中职专业举例</view>
          <view class="item" v-for="(item, index) in list2" :key="index">{{ item }}</view>
          <view class="item" v-show="toPankong(list2)">暂无</view>
        </view>
        <view class="list list2" v-if="params.type==2">
          <view class="list-title">衔接高职职专业举例</view>
          <view class="item" v-for="(item, index) in list3" :key="index">{{ item }}</view>
          <view class="item" v-show="toPankong(list3)">暂无</view>
        </view>
        <view class="list list2">
          <view class="list-title">衔接本科专业举例</view>
          <view class="item" v-for="(item, index) in list4" :key="index">{{ item }}</view>
          <view class="item" v-show="toPankong(list4)">暂无</view>
        </view>
      </view>
      <!-- 下载 -->
      <view class="m-down">
        <view class="title">专业教学标准</view>
        <view class="content">
          <text class="tips">下载内容：</text>
          <block v-if="downloadLink && downloadLink!=='#'">
            <text class="link" @tap="handleDownload">点击进入下载页面</text>
          </block>
          <block v-else>
            <text>暂无</text>
          </block>
        </view>
      </view>
      <view class="line"></view>
      <!-- 开设学校 -->
      <view class="m-school" @tap="handleToSchool">
        <text class="title">开设学校</text>
        <image
          src="/static/indexIcon/more.png"
          mode="aspectFit"
          style="height: 40upx; width: 40upx;"
        />
      </view>
      <view class="line"></view>
      <!-- 相近专业 -->
      <view class="m-simi u-pb">
        <view class="title">相近专业</view>
        <block v-if="dataArr.length">
          <school-list
            :showType="4"
            :is-special="true"
            :listArr="dataArr"
            :handleTaped="false"
            @taped="handleListTaped"
          ></school-list>
        </block>
        <block v-else>
          <view class="f-nothing">暂无相关专业</view>
        </block>
      </view>
      <view class="m-fill"></view>
    </view>
  </view>
</template>

<script>
import schoolList from "@/components/vec-school-list/vec-school-list.vue";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import sc1 from "@/static/indexIcon/sc1.png";
import sc2 from "@/static/indexIcon/sc2.png";
import { ConfigContrast } from "@/config";
export default {
  components: { schoolList, uniNavBar },
  data() {
    return {
      assets: {
        sc1,
        sc2
      },
      permission: {
        isVip: false,
        ckzycs: 0,
        sjbdcs: 0,
        ckzlcs: 0
      },
      hasDZ: false, //是否点赞
      hasSC: false, //是否关注
      hasDB: false, //是否对比
      numberDB: 0,
      hasSaved: false, //是否已收藏
      dzNumber: 0,
      wrapperHeight: "auto",
      systemInfo: uni.getSystemInfoSync(),
      styleObj: {
        overflow: "auto"
      },
      professionInfo: {
        name: "专业名称",
        zydl: "专业大类",
        zydm: "专业代码",
        xlcc: "学历层次",
        xynx: "修业年限",
        downloadName: "下载文件名称"
      },
      params: {},
      downloadLink: "",
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      dataArr: [] //相近专业
    };
  },
  mounted() {
    let query = uni.createSelectorQuery().in(this);
    query
      .select(".content-wrapper")
      .boundingClientRect(data => {
        this.wrapperHeight = this.systemInfo.screenHeight - data.top + "px";
      })
      .exec();
  },
  onShow() {
    this.getCompareInfo();
  },
  onLoad(Option) {
    uni.setStorageSync("freeChance", 1);
    this.params = Option;
    this.getDetailData({
      zyid: Option.id,
      schoolType: Option.type,
      token: uni.getStorageSync("token")
    });
    this.getChance();
    this.getSimilarSchool();
    this.judgeHasSC();
  },
  methods: {
    async getCompareInfo() {
      let list = await this.$api.apiGetComparison(this, 2);
      this.numberDB = list.length;
      this.hasDB = list.some(item => {
        return item.majorcode == this.params.id;
      });
    },
    async apiMyComparison(optype) {
      if (this.numberDB >= ConfigContrast && optype == "A") {
        uni.showToast({
          title: `最多只能选取 ${ConfigContrast} 个专业进行对比哦！`,
          icon: "none"
        });
        return;
      }
      await this.$api.apiMyComparison(this, optype, 2, this.params.id);
      this.hasDB = !this.hasDB;
      this.getCompareInfo();
    },
    // 是否已收藏专业
    judgeHasSC() {
      this.$api.apiGetFavoriteList(this, "2", this.params.id);
    },
    //TODO 查询相似的学校，有问题，无响应
    getSimilarSchool() {
      // /zjq/mainpage/GetMajorInfo
    },
    getDetailData(data) {
      this.$http({
        url: "/zjq/mainpage/GetMajorInfo",
        header: "form",
        data
      }).then(res => {
        if (res.code == 0) {
          let data = res.data;
          this.professionInfo.name = data.majorname;
          this.professionInfo.zydl = data.zydl;
          this.professionInfo.zySecondType = data.zySecondType;
          this.professionInfo.zydm = data.majorcode;
          this.professionInfo.xlcc = data.xlcc;
          this.professionInfo.xynx = data.xynx;
          this.dzNumber = data.likenum;
          this.downloadLink = data.downloadlink;
          this.dataArr = this.$tool.toolMajorList(data.list);
          this.list1 = (data.mainzylx + "").split(/[、；]/);
          this.list2 = (data.xjzgz + "").split(/[、；]/);
          this.list3 = (data.xjgz + "").split(/[、；]/);
          this.list4 = (data.xjbk + "").split(/[、；]/);
        }
      });
    },
    getChance() {
      this.$http({
        url: "/zjq/User/GetUser",
        header: "form",
        data: {
          token: uni.getStorageSync("token")
        }
      }).then(res => {
        if (res.code == 0) {
          this.permission.isVip = 1; //!!res.data.isvip
          this.permission.ckzlcs = res.data.ckzlcs;
          this.permission.ckzycs = res.data.ckzycs;
          this.permission.sjbdcs = res.data.sjbdcs;
        }
      });
    },
    toPankong(list){
      if(list[0]){
        return false
      }
      return true
    },
    handleSC() {
      if (this.$tool.toolToken(1)) {
        this.$api.apiFavoriteZy(this, this.params.id);
      }
    },
    handleDZ() {
      this.hasDZ = !this.hasDZ;
      this.dzNumber = this.hasDZ ? this.dzNumber + 1 : this.dzNumber - 1;
    },
    handleToSchool() {
      uni.navigateTo({
        url: `./ProfessionSchool?schoolType=${this.params.type}&zyid=${this.params.id}&name=${this.professionInfo.name}`
      });
    },
    handleListTaped({ item, index }) {
      this.$tool.toolistoolTiaoToken(
        `/pages/indexIcon/majorDatabase/ProfessionDesc?id=${
          item.majorcode
        }&name=${item.majorname}&type=${item.xlcc == "中职" ? 2 : 1}`
      );
    },
    handleBack() {
      uni.navigateBack();
    },
    handlePK() {
      this.$tool.toolistoolTiaoToken("./ProfessionPK", 1);
      // 进行用户验证/VIP验证
      /* if (this.permission.sjbdcs || this.permission.isVip) {
				if(this.permission.isVip){
					uni.navigateTo({
						url: './ProfessionPK'
					});
					return;
				}
				uni.showModal({
					content: '您有一次免费专业对比机会哦~',
					confirmText: '去对比',
					success: result => {
						if (result.confirm) {
							uni.navigateTo({
								url: './ProfessionPK'
							});
						} else if (result.cancel) {
						}
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
								url:'../vip/vip'
							})
						}
					},
					complete: () => {}
				});
			} */
    },
    handleDownload() {
      const downloadTask = uni.downloadFile({
        url: this.downloadLink || "https://code.jquery.com/jquery-3.4.1.min.js",
        success(res) {
          if (res.statusCode == 200) {
            // 打开下载文件
            uni.openDocument({
              filePath: res.tempFilePath
            });
          }
        }
      });
      // 监控下载进度，TODO是否需要下载提示
      // downloadTask.onProgressUpdate(function (res) {
      //     console.log('下载进度' + res.progress);
      //     console.log('已经下载的数据长度' + res.totalBytesWritten);
      //     console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
      // });
    },
    handleRouter({ url }, isRedirect = false) {
      if (isRedirect) {
        uni.redirectTo({
          url
        });
      } else {
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "./common.scss";
</style>
