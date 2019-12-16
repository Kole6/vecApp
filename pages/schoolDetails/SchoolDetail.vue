
<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="学校详情">
			<view class="f-sc" slot="right" @tap="handleSC"><image :src="hasSC ? assets.sc2 : assets.sc1" mode="aspectFit" style="height: 40upx; width: 40upx;"></image></view>
		</uni-nav-bar>
		<view class="m-wrapper" :style="{ height: wrapperHeight, overflow: 'auto' }">
			<view class="m-top">
				<view class="base">
					<view class="left" @tap="handleLogoTaped">
						<image
							:src="schoolInfo.img"
							mode="aspectFill"
							style="width: 100%; height: 100%;"
						></image>
					</view>
					<view class="right">
						<view class="title">{{schoolInfo.name}}</view>
						<view class="info">
							<text>{{schoolInfo.city}}</text>
							<text>{{schoolInfo.birth}}</text>
							<text>{{schoolInfo.schoolType}}</text>
						</view>
						<view class="num"><text>学校标示码:{{schoolInfo.schoolno}}</text></view>
					</view>
					<view class="f-site" @tap="toWebsite">官网</view>
					<view class="f-dz" @tap="hasDZ = !hasDZ">
						<image :src="hasDZ ? '/static/indexIcon/dz.png' : '/static/indexIcon/dz.png'" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
						<text>{{ schoolInfo.dzNumber }}</text>
					</view>
				</view>
				<view class="tags">
					<view class="item" v-for="(item,index) in schoolInfo.schoolTags" :key="index">{{item}}</view>
				</view>
				<view class="address">
					<text>地址：</text>
					<text>{{schoolInfo.address}}</text>
				</view>
			</view>
			<view class="line"></view>
			<!-- 对比列表 -->
			<view class="m-tip">{{ tipMessage }}</view>
			<view class="m-pk" @tap="handlePK">
				<view class="left">
					<!-- /static/indexIcon/delete.png -->
					<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
					<text>添加本学校到对比列表</text>
				</view>
				<view class="right"><text>对比</text></view>
				<image class="bg1" src="/static/indexIcon/colorGroup.png" mode="aspectFit" style="width: 300upx;height: 100upx;"></image>
				<image class="bg2" src="/static/indexIcon/vszong.png" mode="aspectFit" style="width: 70upx;height: 70upx;"></image>
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
			<view class="s-school_list" @tap="handleRouter('./jsmind')">
				<text>拓扑图</text>
				<view class=""><image src="/static/indexIcon/tpt.png" mode="aspectFit" style="width: 750upx; height:230upx;"></image></view>
			</view>
			<view class="m-school_list" @tap="handleRouter('./NearbySchool/NearbySchoolList')">
				<text>附近学校</text>
				<uni-icons type="arrowright" size="24" />
			</view>
			<view class="m-info">
				<view class="title f-link" @tap="handleTab">
					<text>学校资讯</text>
					<uni-icons type="arrowright" size="24" />
				</view>
				<zi-xun></zi-xun>
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
import ziXun from '@/components/ziXun/ziXun.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
// 防止在点击的时候因为图片加载出现闪烁
import sc1 from '@/static/indexIcon/sc1.png';
import sc2 from '@/static/indexIcon/sc2.png';
export default {
	components: { uniNavBar, uniIcons, ziXun, uniPopup },
	data() {
		return {
			params:{},
			schoolInfo:{
				name:'学校名称',
				city:'-',
				birth:'-',
				schoolType:'-',
				schoolTags:[],
				dzNumber:0,
				schoolno:'',
				address:'学校地址',
				img:'',
				website:'http://www.baidu.com',
				baike:'https://baike.baidu.com/item/北京电子科技职业学院',
			},
			showModal: false, //模态框显示
			tipMessage: '您还可以进行学校对比哦!您已经添加0个学校',
			hasDZ: false, //是否点赞
			hasSC: false,
			assets: {
				sc1,
				sc2
			},
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			styleObj: {
				top: '250px'
			},
			schoolInfo1: [
				{
					name: '学校简介',
					url: './schoolProfile',
					// params  从schoolInfo中获取数据拼接到参数中
					params:[{key:'baike',value:'baike'}]
				},
				{
					name: '校领导',
					url: './SchoolLeader/SchoolLeader'
				},
				{
					name: '学校荣誉',
					url: './schoolHonors/schoolHonors'
				},
				{
					name: '奖助学金',
					url: './assistanceScholarship/assistanceScholarship'
				}
			],
			schoolInfo2: [
				{
					name: '师资情况',
					url: './ourFaculty/ourFaculty'
				},
				{
					name: '校企合作',
					url: './cooperation/cooperation'
				},
				{
					name: '专业设置',
					url: './ProfessionSetting/ProfessionSetting'
				},
				{
					name: '技能大赛',
					url: './skillsCompetition/skillsCompetition'
				},
				{
					name: '就业创业',
					url: './entrepreneurship/entrepreneurship'
				}
			],
			permission:{
				isVip:false,
				ckzycs:0,
				sjbdcs:0,
				ckzlcs:0,
			},
		};
	},
	created() {},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.m-wrapper')
			.boundingClientRect(data => {
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
		// this.params.schoolno = "4111010858"
		this.getDetail();
		this.judgeHasSC();
		this.getChance();
		this.getCompareInfo();
	},
	methods: {
		getCompareInfo(){
			this.$HTTP({
				url:'/zjq/User/GetComparison',
				header:'form',
				data:{
					type:'1',
					token:'d05902562e544db29bbe777954d43bb0'
				}
			}).then((res)=>{
				if(res.code==0){
					this.tipMessage=`您还可以进行专业对比哦!您已经添加${res.data.length}个学校`
				}
			})
		},
		getChance(){
			this.$HTTP({
				url:'/zjq/User/GetUser',
				header:'form',
				data:{
					token:'d05902562e544db29bbe777954d43bb0',
				}
			}).then((res)=>{
				if(res.code == 0){
					this.permission.isVip = !!res.data.isvip
					this.permission.ckzlcs = res.data.ckzlcs
					this.permission.ckzycs = res.data.ckzycs
					this.permission.sjbdcs = res.data.sjbdcs
				}
			})
		},
		judgeHasSC(){
			this.$HTTP({
				url:'/zjq/User/GetFavoriteList',
				header:'form',
				data:{
					pageIndex:1,
					pageSize:1000,
					type:'1',
					token:'d05902562e544db29bbe777954d43bb0'
				}
			}).then(res=>{
				if(res.code == 0){
					
					let hasSC = res.data.list.some((item)=>{
						return item.majorcode == this.params.schoolno
					})
					if(hasSC){
						this.hasSC = true;
					}
				}
			})
		},
		getDetail(){
			this.$HTTP({
				url:'/zjq/College/GetCollegeDetail',
				header:'form',
				data:{
					token:'d05902562e544db29bbe777954d43bb0',
					sid:this.params.schoolno,
				}
			}).then(res=>{
				if(res.code == 0){
					let data = res.data
					this.schoolInfo = {
						...data,
						name : data.schoolname,
						city : data.city,
						birth : data.establishdate,
						schoolType : data.organizer,
						schoolTags : data.schoolTags,
						dzNumber : data.hitscount,
						schoolno : data.schoolno,
						address : data.address,
						img : data.logo,
						website : data.website,
						baike : data.schoolBaikeUrl,
					}
				}
			})
		},
		handleTab(){
			uni.switchTab({
				url:'../tabBar/info/info'
			})
		},
		handleSC() {
			this.$HTTP({
				url: '/zjq/User/Favorite',
				header: 'form',
				data: {
					token: 'd05902562e544db29bbe777954d43bb0',
					sid: this.schoolInfo.schoolno,
					type: this.hasSC?'2':'1'
				}
			}).then(res => {
				console.log(res,'res')
				setTimeout(()=>{
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration:1000
					});
				},200)
				
				this.hasSC = !this.hasSC;
			});
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
		handleBack() {
			uni.navigateBack();
		},
		handlePK() {
			// 进行用户验证/VIP验证
			const value = uni.getStorageSync('freeChance');
			if (this.permission.sjbdcs || this.permission.isVip) {
				if(this.permission.isVip){
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
								url:'../indexIcon/vip/vip'
							})
						}
					}
				});
			}
		},
		toWebsite(){
			if(!this.schoolInfo.website)return;
			uni.navigateTo({
				url: `./schoolProfile?website=${this.schoolInfo.website}`
			});
		},
		handleTap(item, index) {
			if (item.url) {
				let stringArr = []
				if(item.params){
					item.params.forEach(item=>{
						stringArr.push(`${item.key}=${this.schoolInfo[item.value]}`)
					})
					console.log(stringArr,'arr')
				}
				uni.navigateTo({
					url: item.url+'?'+stringArr.join('&')
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import  './schoolDetails.scss';
</style>