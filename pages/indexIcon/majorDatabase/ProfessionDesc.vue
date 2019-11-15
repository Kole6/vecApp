<template>
	<view >
		<!-- 专业信息-专业介绍 -->
		<!-- <view class="top">
			<view class="top-btn active">专业介绍</view>
			<view class="top-btn" @tap="handleRouter({ url: './ProfessionSchool' }, true)">开设学校</view>
		</view> -->
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="专业信息">
			<view class="f-sc" slot="right" @tap="hasSC = !hasSC">
				<image :src="hasSC?assets.sc2:assets.sc1" mode="aspectFit" style="height: 40upx; width: 40upx;"></image>
			</view>
		</uni-nav-bar>
		
		<view class="content-wrapper" :style="{height:wrapperHeight}">
			<!-- 基本信息 -->
			<view class="m-base">
				<view class="title">{{professionInfo.name}}</view>
				<view class="item">
					<text class="name">专业大类</text>
					<text class="value">{{professionInfo.zydl}}</text>
				</view>
				<view class="item">
					<text class="name">专业代码</text>
					<text class="value">{{professionInfo.zydm}}</text>
				</view>
				<view class="item">
					<text class="name">学历层次</text>
					<text class="value">{{professionInfo.xlcc}}</text>
				</view>
				<view class="item">
					<text class="name">修业年限</text>
					<text class="value">{{professionInfo.xynx}}</text>
				</view>
				<view :class="['f-base',hasDZ?'yes':'no']" @tap="hasDZ=!hasDZ">
					<image :src="hasDZ?'/static/indexIcon/dz.png':'/static/indexIcon/dz.png'" mode="aspectFit" style="width: 40upx; height: 40upx;"></image>
					<text >{{dzNumber}}</text>
				</view>
			</view>
			<!-- 已添加的对比专业 -->
			<view class="m-tip">
				{{tipMessage}}
			</view>
			<!-- 对比列表 -->
			<view class="m-pk" @tap="handlePK">
				<view class="left">
					<image src="/static/indexIcon/add.png" mode="aspectFit" style="width: 40upx;height: 40upx;"></image>
					<text>添加本专业到对比列表</text>
				</view>
				<view class="right">
					<text>对比</text>
				</view>
				<image class="bg1" src="/static/indexIcon/colorGroup.png" mode="aspectFit" style="width: 300upx;height: 100upx;"></image>
				<image class="bg2" src="/static/indexIcon/vszong.png" mode="aspectFit" style="width: 70upx;height: 70upx;"></image>
			</view>
			<!-- 专业解读 -->
			<view class="m-pro">
				<view class="title">专业解读</view>
				<view class="list list1">
					<view class="list-title">主要对应职业类型</view>	
					<view class="item">农业技术指导人员</view>
					<view class="item">农作物生产人员</view>
					<view class="item">农业生产服务人员</view>
				</view>
				<view class="list list2">
					<view class="list-title">衔接高职专业举例</view>	
					<view class="item">农业技术指导人员</view>
					<view class="item">农作物生产人员</view>
				</view>
			</view>
			<!-- 下载 -->
			<view class="m-down">
				<view class="title">专业教学标准</view>
				<view class="content">
					<text class="tips">下载内容：</text>
					<text class="link">点击进入下载页面</text>
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
				<school-list :isText="true" :showType="4" :is-special="true" :listArr="dataArr" :handleTaped="false" @taped="handleListTaped"></school-list>
			</view>
			<view class="m-fill"></view>
		</view>
		
		<!-- 底部按钮 -->
		<!-- <view class="m-bottom">
			<view class="left" @tap="handleSave">
				<text class="vecfont icon-menu iconguanzhu" :class="{'saved':hasSaved}"></text>
				<text class="text">
					{{hasSaved?'取消关注':'关注'}}
				</text>
			</view>
			<view class="right" @tap="handlePK">
				<text>专业对比</text>
			</view>
		</view> -->
	</view>
</template>

<script>
import  schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
// 防止在点击的时候因为图片加载出现闪烁
import sc1 from '@/static/indexIcon/sc1.png'
import sc2 from '@/static/indexIcon/sc2.png'
export default {
	components:{schoolList,uniNavBar},
	data() {
		return {
			assets:{
				sc1,
				sc2,
			},
			hasSC:false,//是否添加收藏
			hasDZ:false,//是否点赞
			hasSaved:false,//是否已收藏
			dzNumber:'1w+',
			tipMessage:'您还可以进行专业对比哦!您已经添加0个专业',
			wrapperHeight:'auto',
			systemInfo: uni.getSystemInfoSync(),
			styleObj:{
				'overflow':'auto'
			},
			professionInfo:{
				name:'部队政治工作',
				zydl:'公安与司法大类',
				zydm:'38327398',
				xlcc:'学历层次',
				xynx:'修业年限',
				downloadName:'让新职教事业越来越红火',
			},
			dataArr: [
				{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				}]
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
		uni.setStorageSync('freeChance',1)
	},
	methods: {
		handleToSchool(){
			uni.navigateTo({
				url:'./ProfessionSchool'
			})
		},
		handleListTaped(item){
			
		},
		handleBack(){
			uni.navigateBack()
		},
		handlePK(){
			// 进行用户验证/VIP验证
			const value = uni.getStorageSync('freeChance');
			if(value){
				uni.showModal({
					content:'您有一次免费专业对比机会哦~',
					confirmText:'去对比',
					success:(result)=>{
						if(result.confirm){
							uni.setStorageSync('freeChance',0)
							uni.navigateTo({
								url:'./ProfessionPK'
							})
						}else if(result.cancel){
							
						}
					},
					complete:()=>{
					}
				})				
			}else{
				uni.showModal({
					content:'您还没有开通VIP会员哦~',
					confirmText:'去开通',
					success:(value)=>{
						console.log(JSON.stringify(value))
					},
					complete:()=>{
						
					}
				})
			}
		},
		handleSave(){
			// TODO 进行vip验证/用户验证
			uni.showModal({
				content:'您还没有开通VIP会员哦~',
				confirmText:'去开通',
				success:(value)=>{
					console.log(JSON.stringify(value))
				},
				complete:()=>{
					this.hasSaved = !this.hasSaved
				}
			})
			
		},
		handleDownload(){
			const downloadTask = uni.downloadFile({
				url:'https://code.jquery.com/jquery-3.4.1.min.js',
				success(res){
					if(res.statusCode == 200){
						// 打开下载文件
						uni.openDocument({
							filePath:res.tempFilePath
						})
					}
				}
			})
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

<style>
	.uni-modal__bd{
		color: #333333!important;
		min-height: 110px!important;
		box-sizing: border-box!important;
		display: flex!important;
		align-items: center!important;
		justify-content: center!important;
		flex-wrap: wrap!important;
	}
	.uni-modal__btn.uni-modal__btn_primary{
		color: #fff!important;
		background: #6451FC!important;
	}
</style>
<style scoped lang="scss">
@import './common.scss';
</style>