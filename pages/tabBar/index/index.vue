<template>
	<view class="content">
		<!-- todo头部 -->
		<!-- <view class="navbar-body">
			<view style="height: 35upx;"></view>
			<uni-nav-bar :fixed="false" color="#333333" background-color="#FFFFFF" right-icon="scan">
				<block slot="left">
					<view class="city">
						<view>北京</view>
						<uni-icons type="arrowdown" color="#333333" size="22" />
					</view>
				</block>
				<view class="input-view">
					<uni-icons type="search" size="22" color="#666666" />
					<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
				</view>
			</uni-nav-bar>
		</view> -->
		<!-- #ifdef APP-PLUS -->
		<view style="height: 35upx;"></view>
		<!-- #endif -->
		<view class="header">
			<view class="head-logo">
				<image mode="aspectFill" src="/static/u195.png"></image>
			</view>
			<view class="head-search">
				<uni-search-bar radius="100" clearButton="auto" @confirm="search" />
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="swiper in swiperList" :key="swiper.sid" @tap="toSwiper(swiper)">
					<image mode="aspectFill" :src="swiper.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 首页icon -->
		<view class="example-body">
			<uni-grid :column="4" @change="toIndexicon" :show-border="false" :square="false">
				<uni-grid-item v-for="(item, index) in iconList" :key="index">
					<image :src="item.url" class="image" mode="aspectFill" />
					<text class="text">{{ item.text }}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- todo热门专题 -->
		<view class="example-title">
			<image mode="aspectFill" src="/static/p103.png"></image>
			<span>热门专题</span>
		</view>
		<view class="zhuan-ti">
			<view class="nav-list">
				<navigator url="/pages/special/doubleHigh/doubleHigh" hover-class="navigator-hover" >
					<!-- <button class="" type="default">双高计划</button> -->
					<view class="zhuan-btn">
						<image mode="aspectFill" src="/static/p105.png"></image>
						<p>双高计划</p>
						<!-- <image mode="aspectFill" src="/static/p105.png" class="image2"></image> -->
					</view>
				</navigator>
				<navigator url="/pages/special/international/international" hover-class="other-navigator-hover">
					<!-- <button type="default">国际合作交流</button> -->
					<view class="zhuan-btn">
						
						国际合作交流
					</view>
				</navigator>
				<navigator url="/pages/special/educationList/educationList" hover-class="other-navigator-hover">
					<!-- <button type="default">职教榜单</button> -->
					<view class="zhuan-btn">
						职教榜单
					</view>
				</navigator>
				<navigator url="/pages/special/serviceCentre/serviceCentre" hover-class="other-navigator-hover">
					<!-- <button type="default">服务中心</button> -->
					<view class="zhuan-btn">
						服务中心
					</view>
				</navigator>
			</view>
		</view>
		<!-- todo 资讯 -->
		<view class="example-title">
			<image mode="aspectFill" src="/static/p104.png"></image>
			<span>职教资讯</span>
		</view>
		<view class="example-body">
			<uni-grid :column="3" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list2" :key="index">
					<image :src="item.url" class="image" mode="aspectFill" />
					<text class="text">{{ item.text }}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniSearchBar,
			uniGrid,
			uniGridItem,
			uniIcons,
			uniNavBar
		},
		data() {
			return {
				swiperList: [{
						sid: 4,
						src: '自定义src4',
						img: '/static/swiper-img/4.png'
					},
					{
						sid: 1,
						src: '自定义src1',
						img: '/static/swiper-img/2.jpg'
					}
				],
				iconList: [{
						url: '/static/home_icon1.png',
						text: '院校库',
						page: '/pages/indexIcon/schoolDatabase/schoolDatabase'
					},
					{
						url: '/static/home_icon2.png',
						text: '专业库',
						page: '/pages/indexIcon/majorDatabase/majorDatabase'
					},
					{
						url: '/static/home_icon3.png',
						text: '资料库',
						page: '/pages/indexIcon/materialDatabase/materialDatabase'
					},
					{
						url: '/static/home_icon4.png',
						text: 'VIP',
						page: '/pages/indexIcon/vip/vip'
					}
				],
				list2: [{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						text: '院校库'
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						text: '专业库'
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						text: '资料库'
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
						text: '院校库'
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
						text: '专业库'
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
						text: '资料库'
					},
					{
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
						text: 'VIP'
					}
				]
			}
		},
		onLoad() {},
		methods: {
			search(res) {
				uni.showModal({
					content: '搜索：' + res.value,
					showCancel: false
				})
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			toSwiper(swiper) {
				console.log(swiper.sid);
			},
			toIndexicon(e) {
				uni.navigateTo({
					url: this.iconList[e.detail.index].page
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss"
</style>
