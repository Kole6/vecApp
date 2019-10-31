<template>
	<view class="sign">
		<view class="sign-logo">
			<image src="/static/p106.png" mode="aspectFill"></image>
		</view>
		<view class="sign-input">
			<input type="text" value="1213" />
		</view>
		<view class="sign-in">
			<button type="primary">登录</button>
		</view>
		<view class="sign-qie">
			<image src="../../../static/p108.png" mode=""></image>
			<image src="../../../static/p109.png" mode=""></image>
		</view>
		<view class="sign-xieyi">
			<text>登录即表示同意职教圈
				<text class="xieyi" @tap="toUserAgree()">《用户协议》</text>及
				<text class="xieyi" @tap="toUserAgree()">《隐私政策》</text>
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toUserAgree(){
				uni.navigateTo({
					url:"../userAgreement/userAgreement"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
@import "./signIn.scss";
</style>
