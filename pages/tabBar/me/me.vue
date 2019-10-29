<template>
	<view class="center">
		<view class="center_box">
			<view class="box_left">
				<text @tap="toLogin()">登录 / 注册</text> 
			</view>
			<view class="box_right">
				<image src="/static/p106.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="center_box_bg">
			<view class="center_menu">
				<view class="menu_item" @tap="toVip()">
					<text class="iconfont icon-menu iconhuiyuan2"></text>
					<text>普通用户</text>
					<text class="menu_r">开通会员</text>
				</view>
				<view class="menu_item" @tap="toAccount()">
					<text class="iconfont icon-menu iconzhanghushezhi4"></text>
					<text>账户设置</text>
				</view>
				<view class="menu_item" @tap="toFollow()">
					<text class="iconfont icon-menu iconguanzhu"></text>
					<text>我的关注</text>
				</view>
				<view class="menu_item" @tap="toFeedback()">
					<text class="iconfont icon-menu iconyijianfankui1"></text>
					<text>意见反馈</text>
				</view>
				<view class="menu_item" @tap="toRecommend()">
					<text class="iconfont icon-menu icontuijian1"></text>
					<text>推荐给朋友</text>
				</view>
				<view class="menu_item" @tap="toAbountUs()">
					<text class="iconfont icon-menu iconguanyuwomen"></text>
					<text>关于我们</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/signIn/signIn"
				});
			},
			toVip(){
				uni.navigateTo({
					url:"/pages/indexIcon/vip/vip"
				})
			},
			toAccount(){
				uni.navigateTo({
					url:"/pages/personal/account/account"
				})
			},
			toFollow(){
				uni.navigateTo({
					url:"../../personal/follow/follow"
				})
			},
			toFeedback(){
				uni.navigateTo({
					url:"../../personal/feedback/feedback"
				})
			},
			toRecommend(){
				uni.navigateTo({
					url:"../../personal/recommend/recommend"
				})
			},
			toAbountUs(){
				uni.navigateTo({
					url:"../../personal/aboutUs/aboutUs"
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "./me.scss"
</style>