<template>
	<view class="content">
		<!-- navBar -->
		<nav-bar>
			<view slot="left" class="address_select">
				<image src="/static/logo-img.png" mode="aspectFill"></image>
			</view>
			<view slot="right" class="search_box" @touchstart="confirm()">
				<text class="icon_search"></text>
				<text class="prompt"> 学校 / 人名 / 专业 </text>
			</view>
		</nav-bar>
		
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
		<!-- 热门专题 -->
		<view class="example-title">
			<!-- <image ?mode="aspectFill" src="/static/p103.png"></image> -->
			<span>热门专题</span>
		</view>
		<view class="zhuan-ti">
			<view class="nav-list">
				<navigator url="/pages/special/doubleHigh/doubleHigh" hover-class="navigator-hover">
					<view class="zhuan-btn  zhuan-btn1">
						<image mode="aspectFill" src="/static/p202.png" class="image1"></image>
						<image mode="aspectFill" src="/static/p202.png" class="image2"></image>
						<p>双高计划</p>
					</view>
				</navigator>
				<navigator url="/pages/special/international/international" hover-class="other-navigator-hover">
					<view class="zhuan-btn  zhuan-btn2">
						<image mode="aspectFill" src="/static/p203.png" class="image1"></image>
						<image mode="aspectFill" src="/static/p203.png" class="image2"></image>
						<p>国际合作交流</p>
					</view>
				</navigator>
				<navigator url="/pages/special/educationList/educationList" hover-class="other-navigator-hover">
					<view class="zhuan-btn  zhuan-btn3">
						<image mode="aspectFill" src="/static/p201.png" class="image1"></image>
						<image mode="aspectFill" src="/static/p201.png" class="image2"></image>
						<p>职教榜单</p>
					</view>
				</navigator>
				<navigator url="/pages/special/serviceCentre/serviceCentre" hover-class="other-navigator-hover">
					<view class="zhuan-btn  zhuan-btn4">
						<image mode="aspectFill" src="/static/p204.png" class="image1"></image>
						<image mode="aspectFill" src="/static/p204.png" class="image2"></image>
						<p>服务中心</p>
					</view>
				</navigator>
			</view>
		</view>
		<!-- todo2019/11/01 资讯 -->
		<view class="example-title">
			<span>职教资讯</span>
			<span class="ex-right" @tap="toInfo()">更多 > </span>
		</view>
		<view class="example-body">
			<textarea  placeholder="" />
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import navBar from "@/components/zhouWei-navBar";
	export default {
		components: {
			uniGrid,
			uniGridItem,
			navBar
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
						url: '/static/home_icon5.png',
						text: '院校库',
						page: '/pages/indexIcon/schoolDatabase/schoolDatabase'
					},
					{
						url: '/static/home_icon6.png',
						text: '专业库',
						page: '/pages/indexIcon/majorDatabase/majorDatabase'
					},
					{
						url: '/static/home_icon7.png',
						text: '资料库',
						page: '/pages/indexIcon/materialDatabase/materialDatabase'
					},
					{
						url: '/static/home_icon8.png',
						text: 'VIP',
						page: '/pages/indexIcon/vip/vip'
					}
				],
				list2: [
				]
			}
		},
		onLoad() {},
		methods: {
			confirm() {
				uni.navigateTo({
					url: '/pages/indexIcon/indexSearch/indexSearch'
				});
			},
			toSwiper(swiper) {
				console.log(swiper.sid);
			},
			toIndexicon(e) {
				uni.navigateTo({
					url: this.iconList[e.detail.index].page
				});
			},
			toInfo() {
				uni.switchTab({
					url: "../../list/list"
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
