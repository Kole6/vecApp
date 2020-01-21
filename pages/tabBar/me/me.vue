<template>
	<view class="center">
		<view class="center_box" v-if="userInfo">
			<view class="box_left">
				<text @click="toAccount()">{{userInfo.nickname || userInfo.username}}</text>
			</view>
			<view class="box_right">
				<image :src="userInfo.photo || picUrl" mode="aspectFill" @click="toAccount()" />
			</view>
		</view>
		<view class="center_box" v-else>
			<view class="box_left">
				<text @click="toLogin()">登录 / 注册</text>
			</view>
			<view class="box_right">
				<image :src="picUrl" mode="aspectFill" @click="toLogin()" />
			</view>
		</view>
		<view class="center_box_bg">
			<view class="center_menu">
				<view class="menu_item" @tap="toVip()">
					<image src="/static/p501.png" mode="aspectFill" />
					<text>普通用户</text>
					<text class="menu_r">开通会员</text>
				</view>
				<view class="menu_item" @tap="toAccount()">
					<image src="/static/p502.png" mode="aspectFill" />
					<text>账户设置</text>
				</view>
				<view class="menu_item" @tap="toFollow()">
					<image src="/static/p503.png" mode="aspectFill" />
					<text>我的关注</text>
				</view>
				<view class="menu_item" @tap="toFeedback()">
					<image src="/static/p504.png" mode="aspectFill" />
					<text>意见反馈</text>
				</view>
				<view class="menu_item" @tap="toAbountUs()">
					<image src="/static/p505.png" mode="aspectFill" />
					<text>关于我们</text>
				</view>
				<!-- <view class="menu_item" @tap="toRecommend()">
					<image src="/static/p506.png" mode="aspectFill" />
					<text>推荐给朋友</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: '',
				picUrl: '/static/p106.png'
			};
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
			// this.picUrl = uni.getStorageSync('avatar') || '/static/p106.png'
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/signIn/signIn"
				});
			},
			toVip() {
				if (this.userInfo) {
					uni.navigateTo({
						url: "/pages/indexIcon/vip/vip"
					})
				} else {
					this.toLogin()
				}
			},
			toAccount() {
				if (this.userInfo) {
					uni.navigateTo({
						url: "/pages/personal/account/account"
					})
				} else {
					this.toLogin()
				}
			},
			toFollow() {
				if (this.userInfo) {
					uni.navigateTo({
						url: "../../personal/follow/follow"
					})
				} else {
					this.toLogin()
				}
			},
			toFeedback() {
				if (this.userInfo) {
					uni.navigateTo({
						url: "../../personal/feedback/feedback"
					})
				} else {
					this.toLogin()
				}
			},
			toRecommend() {
				if (this.userInfo) {
					uni.navigateTo({
						url: "../../personal/recommend/recommend"
					})
				} else {
					this.toLogin()
				}
			},
			toAbountUs() {
				uni.navigateTo({
					url: "../../personal/aboutUs/aboutUs"
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "./base64.scss";
	@import "./me.scss"
</style>
