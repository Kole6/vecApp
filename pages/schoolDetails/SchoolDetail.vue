<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="学校详情">
			<view class="f-sc" slot="right" @tap="handleSC">
				<image :src=" `/static/indexIcon/${hasSC ? 'sc2' : 'sc1'}.png`" mode="aspectFit" style="height: 40upx; width: 40upx;"></image>
			</view>
		</uni-nav-bar>
		<view class="m-wrapper" :style="{ height: wrapperHeight, overflow: 'auto' }">
			<view class="m-top">
				<view class="base">
					<view class="left" @tap="handleLogoTaped">
						<image :src="schoolInfo.logo || 'https://gitee.com/wy333/kole/raw/master/img/20200102.png'" mode="aspectFill"
						 style="width: 100%; height: 100%;"></image>
					</view>
					<view class="right">
						<view class="title">{{schoolInfo.name}}</view>
						<view class="info">
							<text>{{schoolInfo.city}}</text>
							<text>{{schoolInfo.birth}}</text>
							<text>{{schoolInfo.schoolType}}</text>
						</view>
						<view class="num"><text>学校标识码：{{schoolInfo.schoolno}}</text></view>
					</view>
					<view class="f-site" @tap="toWebsite">官网</view>
					<view class="f-dz" @tap="handleDZ">
						<image :src="hasDZ ? '/static/indexIcon/dzs.png' : '/static/indexIcon/dz.png'" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
						<text>{{ schoolInfo.dzNumber }}</text>
					</view>
				</view>
				<view class="tags">
					<!-- <view class="item" v-for="(item,index) in schoolInfo.schoolTags" :key="index">{{item}}</view> -->
				</view>
				<view class="address">
					<text>地址：</text>
					<text>{{schoolInfo.address}}</text>
				</view>
			</view>
			<view class="line"></view>
			<!-- 对比列表 -->
			<view class="m-tip">您还可以进行专业对比哦！ 您已经添加 {{numberDB}} 个学校</view>
			<view class="m-pk">
				<view class="left" v-if="hasDB" @tap="apiMyComparison('D')">
					<image src="/static/indexIcon/delete.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
					<text>在对比列表中删除本学校</text>
				</view>
				<view class="left" v-else  @tap="apiMyComparison('A')">
					<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
					<text>添加本学校到对比列表</text>
				</view>
				<view class="right" @tap="handlePK"><text>对比</text></view>
				<image class="bg1" @tap="handlePK" src="/static/indexIcon/colorGroup.png" mode="aspectFit" style="width: 300upx;height: 100upx;"></image>
				<image class="bg2" @tap="handlePK" src="/static/indexIcon/vszong.png" mode="aspectFit" style="width: 70upx;height: 70upx;"></image>
			</view>

			<view class="m-info">
				<view class="u-title"><text>基本信息</text></view>
				<view class="tags">
					<block v-for="(item, index) in schoolInfo1" :key="index">
						<view class="item">
							<text @tap="handleTap(item, index)">{{ item.name }}</text>
						</view>
					</block>
				</view>
			</view>
			<view class="m-info">
				<view class="u-title"><text>学校实力</text></view>
				<view class="tags">
					<block v-for="(item, index) in schoolInfo2" :key="index">
						<view class="item">
							<text @tap="handleTap(item, index)">{{ item.name }}</text>
						</view>
					</block>
				</view>
			</view>
			<view class="s-school_list" @tap="handleMind()">
				<text>拓扑图</text>
				<uni-icons type="arrowright" size="24" class="list-right" />
				<view class="tuopu">
					<image src="/static/indexIcon/tpt.png" mode="aspectFit" style="width: 750upx; height:230upx;"></image>
				</view>
			</view>
			<view class="m-school_list" @tap="handleRouter(`./NearbySchool/NearbySchoolList?sid=${schoolInfo.schoolno}`)">
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
		<uni-popup :show="showModal" type="center" :custom="true" :mask-click="false" @change="modalChange">
			<view class="uni-tip">
				<view class="tip-list">
					<view class="item">现代学徒制</view>
					<view class="item">现代学徒制</view>
					<view class="item">现代学徒制</view>
					<view class="item">现代学徒制</view>
				</view>
				<view class="close"><text @tap="showModal = false">x</text></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import uniIcons from '@/components/uni-icons/uni-icons';
	import ziXun from '@/components/ziXun/ziXunLeft.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniNavBar,
			uniIcons,
			ziXun,
			uniPopup
		},
		data() {
			return {
				params: {},
				schoolInfo: {
					name: '学校名称',
					city: '-',
					birth: '-',
					schoolType: '-',
					schoolTags: [],
					dzNumber: 0,
					schoolno: '',
					address: '学校地址',
					logo: '',
					website: 'http://www.baidu.com',
					baike: 'https://baike.baidu.com/item/北京电子科技职业学院',
				},
				showModal: false, //模态框显示
				hasDZ: false, //是否点赞
				hasSC: false, //是否关注
				hasDB: false, //是否对比
				numberDB: 0, 
				wrapperHeight: 'auto',
				systemInfo: uni.getSystemInfoSync(),
				newList:[],
				styleObj: {
					top: '250px'
				},
				schoolInfo1: [{
						name: '学校简介',
						url: './schoolProfile',
						// params  从schoolInfo中获取数据拼接到参数中
						params: [{
							key: 'baike',
							value: 'baike'
						}]
					},
					{
						name: '校领导',
						url: './SchoolLeader/SchoolLeader',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '学校荣誉',
						url: './schoolHonors/schoolHonors',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '奖助学金',
						url: './assistanceScholarship/assistanceScholarship',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '质量年报',
						url: '/pages/indexIcon/materialDatabase/FileDetail?fileId=4',
						params: [{
								key: 'sid',
								value: 'schoolno'
							},
							{
								key: 'fileId',
								value: 'fileId'
							}
						]
					}
				],
				schoolInfo2: [{
						name: '师资情况',
						url: './ourFaculty/ourFaculty',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '校企合作',
						url: './cooperation/cooperation',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '专业设置',
						url: './ProfessionSetting/ProfessionSetting',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '技能大赛',
						url: './skillsCompetition/skillsCompetition',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					},
					{
						name: '就业创业',
						url: './entrepreneurship/entrepreneurship',
						params: [{
							key: 'sid',
							value: 'schoolno'
						}]
					}
				],
				permission: {
					isVip: false,
					ckzycs: 0,
					sjbdcs: 0,
					ckzlcs: 0,
				},
			};
		},
		mounted() {
			// 限制列表高度
			let query = uni.createSelectorQuery().in(this);
			query
				.select('.m-wrapper')
				.boundingClientRect((data) => {
					let height = '';
					// #ifdef APP-PLUS
					height = this.systemInfo.screenHeight - data.top - 0 + 'px';
					// #endif
					// #ifdef H5
					height = this.systemInfo.screenHeight - data.top + 'px';
					// #endif
					if (height) {
						this.wrapperHeight = height;
					}
				})
				.exec();
		},
		onLoad(params) {
			this.params = params
			this.getDetail();
			this.judgeHasSC();
			this.getChance();
			this.getCompareInfo();
			this.newList = uni.getStorageSync('hotNewsList')
		},
		methods: {
			async getCompareInfo() {
				let list = await this.$api.apiGetComparison(this,1);
				this.numberDB = list.length;
				this.hasDB = list.some((item) => {
					return item.schoolno == this.params.schoolno
				})
			},
			async apiMyComparison(optype){
				if(this.numberDB>=4){
					uni.showToast({
						title: '最多只能选取4所院校进行对比哦',
						icon: 'none'
					});
					return;
				}
				await this.$api.apiMyComparison(this, optype, 1, this.params.schoolno);
				this.hasDB =!this.hasDB;
				this.getCompareInfo();
			},
			getChance() {
				this.$http({
					url: '/zjq/User/GetUser',
					header: 'form',
					data: {
						token: uni.getStorageSync('token'),
					}
				}).then((res) => {
					if (res.code == 0) {
						this.permission.isVip = !!res.data.isvip
						this.permission.ckzlcs = res.data.ckzlcs
						this.permission.ckzycs = res.data.ckzycs
						this.permission.sjbdcs = res.data.sjbdcs
					}
				})
			},
			judgeHasSC() {
				this.$api.apiGetFavoriteList(this,'1',this.params.schoolno);
			},
			getDetail() {
				this.$http({
					url: '/zjq/College/GetCollegeDetail',
					header: 'form',
					data: {
						token: uni.getStorageSync('token'),
						sid: this.params.schoolno,
					}
				}).then(res => {
					if (res.code == 0) {
						let data = res.data
						this.schoolInfo = {
							...data,
							name: data.schoolname,
							city: data.city,
							birth: data.establishdate,
							schoolType: data.organizer,
							schoolTags: data.schoolTags,
							dzNumber: data.hitscount,
							schoolno: data.schoolno,
							address: data.address,
							website: data.website,
							baike: data.schoolBaikeUrl,
						}
					}
				})
			},
			handleTab() {
				uni.switchTab({
					url: '../tabBar/info/info'
				})
			},
			handleSC() {
				this.$api.apiFavorite(this,this.schoolInfo.schoolno)
			},
			modalChange() {},
			handleLogoTaped() {
				// this.showModal = true;
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
			handleDZ(){
				this.hasDZ  = !this.hasDZ
				this.schoolInfo.dzNumber = this.hasDZ? this.schoolInfo.dzNumber+1:this.schoolInfo.dzNumber-1;
			},
			handlePK() {
				uni.navigateTo({
							url: './SchoolPk/SchoolPk'
						});
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
			toWebsite() {
				if (!this.schoolInfo.website){
					uni.showToast({
						title: '没有找到本学校官网！',
						duration: 2000,
						icon:'none'
					});
					return;
				};
				uni.navigateTo({
					url: `./schoolProfile?website=${this.schoolInfo.website}`
				});
			},
			handleTap(item, index) {
				if (item.url) {
					let stringArr = []
					if (item.params) {
						item.params.forEach(item => {
							stringArr.push(`${item.key}=${this.schoolInfo[item.value]}`)
						})
						console.log(stringArr, 'arr')
					}
					uni.navigateTo({
						url: item.url + '?' + stringArr.join('&')
					});
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	@import './schoolDetails.scss';
</style>
