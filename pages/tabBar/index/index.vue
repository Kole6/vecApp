<template>
	<view class="content">
		<!-- 头部 -->
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
		<!-- grid icon-->
		<view class="example-body">
			<uni-grid :column="4" @change="change" :show-border="false" :square="false">
				<uni-grid-item v-for="(item, index) in list" :key="index">
					<image :src="item.url" class="image" mode="aspectFill" />
					<text class="text">{{ item.text }}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="example-title">
			<image mode="aspectFill" src="/static/p102.png"></image>
			<span>热门专题</span>
		</view>
		<view class="zhuan-ti">
			<view class="nav-list">
				<navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">
					<button type="default">双高计划</button>
				</navigator>
				<navigator url="redirect/redirect?title=redirect"  hover-class="other-navigator-hover">
					<button type="default">国际合作交流</button>
				</navigator>
				<navigator url="/pages/tabBar/extUI/extUI"  hover-class="other-navigator-hover">
					<button type="default">职教榜单</button>
				</navigator>
				<navigator url="/pages/tabBar/extUI/extUI"  hover-class="other-navigator-hover">
					<button type="default">服务中心</button>
				</navigator>
			</view>
		</view>
		<view class="example-title">
			<image mode="aspectFill" src="/static/p101.png"></image>
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
						sid: 1,
						src: '自定义src1',
						img: '/static/swiper-img/2.jpg'
					},
					{
						sid: 2,
						src: '自定义src2',
						img: '/static/swiper-img/3.jpg'
					},
					{
						sid: 3,
						src: '自定义src3',
						img: '/static/swiper-img/1.jpg'
					}
				],
				list: [{
						url: '/static/home_icon1.png',
						text: '院校库'
					},
					{
						url: '/static/home_icon2.png',
						text: '专业库'
					},
					{
						url: '/static/home_icon3.png',
						text: '资料库'
					},
					{
						url: '/static/home_icon4.png',
						text: 'VIP'
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
			change(e) {
				let {
					index
				} = e.detail
				console.log(index)
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.navbar-body {
			.city {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 100%;
				margin-left: 8px;
				white-space: nowrap;
			}

			.input-view {
				width: 92%;
				display: flex;
				background-color: #e7e7e7;
				height: 30px;
				border-radius: 15px;
				padding: 0 4%;
				flex-wrap: nowrap;
				margin: 7px 0;
				line-height: 30px;
				background: #f5f5f5;
			}

			.input-view .uni-icon {
				line-height: 30px !important;
			}

			.input-view .input {
				height: 30px;
				line-height: 30px;
				width: 94%;
				padding: 0 3%;
			}
		}

		.header {
			display: flex;

			.head-logo {
				padding: 8px 8px 0px 10px;

				image {
					width: 94px;
					height: 40px;
				}
			}

			.head-search {
				width: 100%;
				padding: 0 5px;
			}
		}

		.swiper-view {
			.swiper {
				width: 100%;
				height: 280upx;

				image {
					width: 100%;
					height: 280upx;
				}
			}
		}

		.example-title {
			display: flex;
			font-size: 32upx;
			color: #464e52;
			padding: 10px;
			margin-top: 3px;
			position: relative;
			background-color: #fdfdfd;
			border-bottom: 1px #f5f5f5 solid;

			image {
				width: 36upx;
				height: 36upx;
				margin-top: 4upx;
				margin-right: 20upx;
			}

			span {
				flex: 1;
			}
		}

		.zhuan-ti {
			padding: 2upx 30upx;
			background: #fff;
		}
		.nav-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0px 40upx;
			justify-content: space-between;
		}

		.example-body {
			padding: 2upx 30upx;
			background: #fff;

			.image {
				width: 50upx;
				height: 50upx;
			}

			.text {
				font-size: 26upx;
				margin-top: 10upx;
			}
		}

	}
</style>
