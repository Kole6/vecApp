<template>
	<view class="sign">
		<view class="sign-logo">
			<image src="/static/p106.png" mode="aspectFill"></image>
		</view>
		<view class="sign-list" v-if="!isPhoneSign">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="biaoti" v-model="userno" type="text" maxlength="32" placeholder="账号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
		</view>
		<view class="sign-list" v-else>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="biaoti" v-model="phoneno" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/3.png"></image>
				<input class="biaoti" v-model="code" type="number" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}{{second>0?'s':''}}</view>
			</view>
		</view>
		<view class="wangji">
			<navigator url="/pages/login/forget/forget" hover-class="navigator-hover">
				忘记密码?
			</navigator>
		</view>
		<view class="sign-in">
			<button type="primary">登 录</button>
		</view>
		<view class="sign-qie">
			<view @tap="changePhone()" class="text1">{{isPhoneSign?"账号密码登录":"手机验证码登录"}}</view>
			<view @tap="toReg()" class="text2">立即注册</view>
		</view>
		<view class="order">
			<text class="line"></text>
			<text class="txt"> 其他快捷方式登录 </text>
			<text class="line"></text>
		</view>
		<view class="order-img">
			<image @tap="login_qq()" src="../../../static/p108.png" mode="aspectFill"></image>
			<image @tap="login_weixin()" src="../../../static/p109.png" mode="aspectFill"></image>
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
	var tha, js;
	export default {
		onLoad() {
			tha = this;

		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phoneno: '',
				userno: '',
				password: '',
				code: '',
				invitation: '',
				xieyi: true,
				showPassword: false,
				second: 0,
				isPhoneSign: false
			}
		},
		computed: {
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		methods: {
			display() {
				this.showPassword = !this.showPassword
			},
			changePhone() {
				this.isPhoneSign = !this.isPhoneSign;
			},
			toUserAgree() {
				uni.navigateTo({
					url: "../userAgreement/userAgreement"
				})
			},
			toReg() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			getcode() {
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				js = setInterval(function() {
					tha.second--;
					if (tha.second == 0) {
						clearInterval(js)
					}
				}, 1000)
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_qq() {
				//qq登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "./signIn.scss";
</style>
