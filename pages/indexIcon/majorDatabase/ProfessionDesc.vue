<template>
	<view>
		<!-- 专业信息-专业介绍 -->
		<!-- <view class="top">
			<view class="top-btn active">专业介绍</view>
			<view class="top-btn" @tap="handleRouter({ url: './ProfessionSchool' }, true)">开设学校</view>
		</view> -->
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="专业信息">
			<view class="f-sc" slot="right" @tap="handleSC"><image :src="hasSC ? assets.sc2 : assets.sc1" mode="aspectFit" style="height: 40upx; width: 40upx;"></image></view>
		</uni-nav-bar>

		<view class="content-wrapper" :style="{ height: wrapperHeight }">
			<!-- 基本信息 -->
			<view class="m-base">
				<view class="title">{{ professionInfo.name }}</view>
				<view class="item">
					<text class="name">专业大类</text>
					<text class="value">{{ professionInfo.zydl }}</text>
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
				<view :class="['f-base', hasDZ ? 'yes' : 'no']" @tap="hasDZ = !hasDZ">
					<image :src="hasDZ ? '/static/indexIcon/dz.png' : '/static/indexIcon/dz.png'" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
					<text>{{ dzNumber }}</text>
				</view>
			</view>
			<!-- 已添加的对比专业 -->
			<view class="m-tip">{{ tipMessage }}</view>
			<!-- 对比列表 -->
			<view class="m-pk" @tap="handlePK">
				<view class="left">
					<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
					<text>添加本专业到对比列表</text>
				</view>
				<view class="right"><text>对比</text></view>
				<image class="bg1" src="/static/indexIcon/colorGroup2.png" mode="aspectFit" style="width: 300upx;height: 100upx;"></image>
				<image class="bg2" src="/static/indexIcon/vszong.png" mode="aspectFit" style="width: 70upx;height: 70upx;"></image>
			</view>
			<!-- 专业解读 -->
			<view class="m-pro">
				<view class="title">专业解读</view>
				<view class="list list1">
					<view class="list-title">主要对应职业类型</view>
					<view class="item" v-for="(item, index) in list1" :key="index">{{ item.name }}</view>
				</view>
				<view class="list list2">
					<view class="list-title">衔接高职专业举例</view>
					<view class="item" v-for="(item, index) in list2" :key="index">{{ item.name }}</view>
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
				<image src="/static/indexIcon/more.png" mode="aspectFit" style="height: 40upx; width: 40upx;"></image>
			</view>
			<view class="line"></view>
			<!-- 相近专业 -->
			<view class="m-simi u-pb">
				<view class="title">相近专业</view>
				<block v-if="dataArr.length">
					<school-list :isText="true" :showType="4" :is-special="true" :listArr="dataArr" :handleTaped="false" @taped="handleListTaped"></school-list>
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
import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
// 防止在点击的时候因为图片加载出现闪烁
import sc1 from '@/static/indexIcon/sc1.png';
import sc2 from '@/static/indexIcon/sc2.png';
export default {
	components: { schoolList, uniNavBar },
	data() {
		return {
			assets: {
				sc1,
				sc2
			},
			permission:{
				isVip:false,
				ckzycs:0,
				sjbdcs:0,
				ckzlcs:0,
			},
			hasSC: false, //是否添加收藏
			hasDZ: false, //是否点赞
			hasSaved: false, //是否已收藏
			dzNumber: '',
			tipMessage: '您还可以进行专业对比哦!您已经添加0个专业',
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			styleObj: {
				overflow: 'auto'
			},
			professionInfo: {
				name: '专业名称',
				zydl: '专业大类',
				zydm: '专业代码',
				xlcc: '学历层次',
				xynx: '修业年限',
				downloadName: '下载文件名称'
			},
			params:{},
			downloadLink:'',
			list1: [],
			list2: [],
			dataArr: [
				{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				}
			]
		};
	},
	mounted() {
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.content-wrapper')
			.boundingClientRect(data => {
				this.wrapperHeight = this.systemInfo.screenHeight - data.top + 'px';
			})
			.exec();
	},
	onLoad(Option) {
		uni.setStorageSync('freeChance', 1);
		// 测试用
		// Option.id = '520907'
		// Option.type = '1'
		this.params = Option
		console.log(this.params.id)
		this.getDetailData({
			zyid:Option.id,
			schoolType:Option.type
		})
		this.getChance()
		this.getSimilarSchool()
		this.judgeHasSC()
		this.getCompareInfo();
	},
	methods: {
		getCompareInfo(){
			this.$HTTP({
				url:'/zjq/User/GetComparison',
				header:'form',
				data:{
					type:'2',
					token: uni.getStorageSync('token'),
				}
			}).then((res)=>{
				if(res.code==0){
					this.tipMessage=`您还可以进行专业对比哦!您已经添加${res.data.length}个专业`
				}
			})
		},
		// 是否已收藏专业
		judgeHasSC(){
			this.$HTTP({
				url:'/zjq/User/GetFavoriteList',
				header:'form',
				data:{
					pageIndex:1,
					pageSize:1000,
					type:'2',
					token: uni.getStorageSync('token'),
				}
			}).then(res=>{
				if(res.code == 0){
					
					let hasSC = res.data.list.some((item)=>{
						return item.majorcode == this.params.id
					})
					if(hasSC){
						this.hasSC = true;
					}
				}
			})
		},
		//TODO 查询相似的学校，有问题，无响应
		getSimilarSchool(){
			// this.$HTTP({
			// 	url:'/zjq/mainpage/GetMajorInfo',
			// 	header:'form',
			// 	data:{
			// 		zyid:this.params.id
			// 	}
			// }).then((res)=>{
			// 	console.log('similar == >',res)
			// })
		},
		getDetailData(data){
			this.$HTTP({
				url:'/zjq/mainpage/GetMajorInfo',
				header:'form',
				data,
			}).then((res)=>{
				if(res.code == 0){
					let data = res.data
					this.professionInfo.name = data.majorname
					this.professionInfo.zydl = data.zydl
					this.professionInfo.zydm = data.majorcode
					this.professionInfo.xlcc = data.xlcc
					this.professionInfo.xynx = data.xynx
					this.dzNumber = data.likenum
					this.downloadLink = data.downloadlink
					// 相近专业数值问题
					// this.dataArr = data.list
					this.list1 = data.mainzylx.split('；').map(name=>{
						return{
							name
						}
					})
					this.list2 = data.xjgz.split('；').map(name=>{
						return{
							name
						}
					})
				}
			})
		},
		getChance(){
			this.$HTTP({
				url:'/zjq/User/GetUser',
				header:'form',
				data:{
					token: uni.getStorageSync('token'),
				}
			}).then((res)=>{
				if(res.code == 0){
					this.permission.isVip = 1//!!res.data.isvip
					this.permission.ckzlcs = res.data.ckzlcs
					this.permission.ckzycs = res.data.ckzycs
					this.permission.sjbdcs = res.data.sjbdcs
				}
			})
		},
		handleSC() {
			this.$HTTP({
				url: '/zjq/User/FavoriteZy',
				header: 'form',
				data: {
					token: uni.getStorageSync('token'),
					zyid: this.params.id,
					type: this.hasSC ? '2' : '1'
				}
			}).then(res => {
				setTimeout(() => {
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 1000
					});
				}, 200);

				this.hasSC = !this.hasSC;
			});
		},
		handleToSchool() {
			uni.navigateTo({
				url: `./ProfessionSchool?schoolType=${this.params.type}&zyid=${this.params.id}&name=${this.professionInfo.name}`
			});
		},
		handleListTaped(item) {},
		handleBack() {
			uni.navigateBack();
		},
		handlePK() {
			// 进行用户验证/VIP验证
			if (this.permission.sjbdcs || this.permission.isVip) {
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
			}
		},
		handleDownload() {
			const downloadTask = uni.downloadFile({
				url: this.downloadLink || 'https://code.jquery.com/jquery-3.4.1.min.js',
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
@import './common.scss';
</style>
