<template>
	<view class="content">
		<!-- 搜索框 -->
		<nav-bar>
			<view slot="left" class="address_select">
				<image src="/static/logo-img.png" mode="aspectFill" />
			</view>
			<view slot="right" class="search_box" @touchstart="confirm()">
				<text class="icon_search"></text>
				<text class="prompt"> 学校 / 人名 / 专业 </text>
			</view>
		</nav-bar>
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="(swiper,index) in swiperList" :key="index" @tap="toSwiper(swiper)">
					<image mode="aspectFill" :src="swiper.imageUrl" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 首页icon -->
		<view class="example-body">
			<uni-grid :column="4" @change="toIndexicon" :show-border="false" :square="false">
				<uni-grid-item v-for="(item, index) in iconList" :key="index">
					<image class="image" :src="item.url" mode="aspectFill" />
					<text class="text">{{ item.text }}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- 热门专题 -->
		<view class="example-title">
			<span>热门专题</span>
		</view>
		<view class="zhuan-ti">
			<view class="nav-list">
				<navigator url="/pages/special/doubleHigh/doubleHigh" hover-class="none">
					<view class="zhuan-btn">
						<view class="z-left">
							<p class="left-title">双高计划</p>
							<p class="left-text">Double high <br> plan</p>
						</view>
						<view class="z-right">
							<image mode="aspectFill" src="/static/p303.png" class="image1" />
						</view>
					</view>
				</navigator>
				<navigator url="/pages/special/international/international" hover-class="none">
					<view class="zhuan-btn">
						<view class="z-left">
							<p class="left-title">国际合作</p>
							<p class="left-text">International <br>  co-operation</p>
						</view>
						<view class="z-right">
							<image mode="aspectFill" src="/static/p301.png" class="image1" />
						</view>
					</view>
				</navigator>
				<navigator url="/pages/special/educationList/educationList" hover-class="none">
					<view class="zhuan-btn">
						<view class="z-left">
							<p class="left-title">职教榜单</p>
							<p class="left-text">Vocational Education list</p>
						</view>
						<view class="z-right">
							<image mode="aspectFill" src="/static/p304.png" class="image1" />
						</view>
					</view>
				</navigator>
				<navigator url="/pages/special/serviceCentre/serviceCentre" hover-class="none">
					<view class="zhuan-btn">
						<view class="z-left">
							<p class="left-title">服务中心</p>
							<p class="left-text">Service <br> Centre</p>
						</view>
						<view class="z-right">
							<image mode="aspectFill" src="/static/p302.png" class="image1" />
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<!-- 资讯 -->
		<view class="example-title">
			<span>职教资讯</span>
			<span class="ex-right" @tap="toInfo()">更多 > </span>
		</view>
		<view class="xun">
			<zi-xun :newList="newList"></zi-xun>
		</view>
		<!-- 底线 -->
		<view class="order">
			<text class="line"></text>
			<text class="txt"> 没有更多了哦~ </text>
			<text class="line"></text>
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import navBar from "@/components/zhouWei-navBar";
	import ziXun from "@/components/ziXun/ziXun.vue"
	export default {
		components: {
			uniGrid,
			uniGridItem,
			navBar,
			ziXun
		},
		data() {
			return {
				swiperList: [],
				iconList: [{
						url: '/static/home_icon5.png',
						text: '院校库',
						page: '/pages/indexIcon/schoolDatabase/schoolDatabase'
					},
					{
						url: '/static/home_icon7.png',
						text: '专业库',
						page: '/pages/indexIcon/majorDatabase/majorDatabase'
					},
					{
						url: '/static/home_icon6.png',
						text: '资料库',
						page: '/pages/indexIcon/materialDatabase/materialDatabase'
					},
					{
						url: '/static/home_icon8.png',
						text: 'VIP',
						page: '/pages/indexIcon/vip/vip'
					}
				],
				newList: []
			}
		},
		onShow() {
			this.apiGetMain();
		},
		methods: {
			apiGetMain() {
				if (this.swiperList.length != 0) {
					return;
				}
				this.$http({
					url: '/zjq/mainpage/GetMain',
					data: {}
				}).then((data) => {
					this.swiperList = [...data.data.bannerList]
					this.newList = [...data.data.hotSubjects.list]
					uni.setStorage({
						key: 'hotNewsList',
						data: this.newList
					});
				}, (err) => {
					console.log(err)
				})
			},
			confirm() {
				this.$tool.toolistoolTiaoToken('/pages/indexIcon/indexSearch/indexSearch')
			},
			toSwiper(swiper) {
				// console.log(swiper.sid);
			},
			toIndexicon(e) {
				uni.navigateTo({
					url: this.iconList[e.detail.index].page
				});
			},
			toInfo() {
				uni.switchTab({
					url: "../info/info"
				});
			},
		}
	}
</script>
<style scoped lang="scss">
	@import "./index.scss";
</style>
