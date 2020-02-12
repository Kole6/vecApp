<template>
	<view class="sign">
		<view class="sign-x">
			<image src="/static/p111.png" mode="aspectFill" @tap="toMe()" />
		</view>
		<view class="sign-logo">
			<image src="/static/logo-img.png" mode="aspectFill" />
		</view>
		<view class="sign-list" v-if="!isPhoneSign">
			<view class="list-call">
				<input class="biaoti" v-model="userno" type="text" maxlength="32" placeholder="请输入账号" />
			</view>
			<view class="list-call">
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="请输入密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/p702.png':'/static/p701.png'" @tap="display" />
			</view>
		</view>
		<view class="sign-list" v-else>
			<view class="list-call">
				<input class="biaoti" v-model="phoneno" type="number" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="list-call">
				<input class="biaoti" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}{{second>0?'s':''}}</view>
			</view>
		</view>
		<view class="sign-forget">
			<navigator url="/pages/login/forget/forget" hover-class="none">
				忘记密码?
			</navigator>
		</view>
		<view class="sign-in">
			<button class="vec-btn vip-open" type="primary" @tap="toLogin()">登 录</button>
		</view>
		<view class="sign-qie">
			<view @tap="changePhone()" class="text1">{{isPhoneSign?"账号密码登录":"手机验证码登录"}}</view>
			<view @tap="toReg()" class="text2">新用户注册</view>
		</view>
		<view class="order">
			<text class="line"></text>
			<text class="txt"> 其他登录方式 </text>
			<text class="line"></text>
		</view>
		<view class="order-img">
			<image @tap="login_qq()" src="/static/p108.png" mode="aspectFill" />
			<image @tap="login_weixin()" src="/static/p109.png" mode="aspectFill" />
		</view>
		<view class="sign-xieyi">
			<text>登录即表示同意职教圈
				<text class="xieyi" @tap="toUserAgree()">《用户协议》</text>及
				<text class="xieyi" @tap="toUserAgree2()">《隐私政策》</text>
			</text>
		</view>
	</view>
</template>

<script>
	var tha, js;
	export default {
		onLoad() {
			tha = this;
			uni.removeStorageSync('token');
			uni.removeStorageSync('userInfo');
		},
		onShow() {
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
				isPhoneSign: false,
				log: {
					log1: '',
					log2: ''
				}
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
				this.$tool.toolWeb('用户协议')
			},
			toUserAgree2() {
				this.$tool.toolWeb('隐私政策')
			},
			toMe() {
				uni.switchTab({
					url: '/pages/tabBar/me/me'
				})
			},
			toLogin() {
				if (this.isPhoneSign) { //短信验证码登录
					let str = ''
					if(!this.phoneno){
						str = '请输入手机号'
					}else if(!this.code){
						str = '请输入验证码'
					}
					if(str){
						uni.showToast({
							title:str,
							icon:'none'
						})
						return
					}
					this.$http({
						url: '/zjq/User/LoginCode',
						header: 'form',
						data: {
							phone: this.phoneno,
							code: this.code
						}
					}).then((res) => {
						if (res.code == 0) {
							this.loginSuccess(res);
						} else {
							uni.showModal({
								content: res.message,
								showCancel: false
							});
						}
					}, (err) => {
						console.log(err)
					})
				} else { //账号密码登录
					let str = ''
					if(!this.userno){
						str = '请输入账号'
					}else if(!this.password){
						str = '请输入密码'
					}
					if(str){
						uni.showToast({
							title:str,
							icon:'none'
						})
						return
					}
					this.$http({
						url: '/zjq/User/Login',
						header: 'form',
						data: {
							username: this.userno,
							password: this.password
						}
					}).then((res) => {
						if (res.code == 0) {
							this.loginSuccess(res);
						} else {
							uni.showModal({
								content: res.message,
								showCancel: false
							});
						}
					}, (err) => {
						console.log(err)
					})
				}
			},
			toReg() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			loginSuccess(res) {
				uni.showToast({
					icon: 'none',
					title: res.message
				});
				uni.setStorage({
					key: 'token',
					data: res.data.token
				});
				console.log('res',res)
				this.apiGetUser(res.data.token);
			},
			getcode() {
				if(!(/^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(this.phoneno))){
					uni.showToast({
						title:'手机号格式错误！',
						icon:'none'
					})
					return;
				}
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				js = setInterval(function() {
					tha.second--;
					if (tha.second == 0) {
						clearInterval(js)
					}
				}, 1000);
				this.apiSendSmsValidateCode();
			},
			apiSendSmsValidateCode() {
				this.$http({
					url: '/zjq/User/SendSmsValidateCode',
					header: 'form',
					data: {
						phone: this.phoneno
					}
				}).then((res) => {
					if (res.code == 0) {
						uni.showModal({
							content: `验证码：${res.data.vcode}`,
							showCancel: false
						});
					} else {
						uni.showModal({
							content: res.message,
							showCancel: false
						});
					}
				}, (err) => {
					console.log(err)
				})
			},
			apiGetUser(token) {
				this.$http({
					url: '/zjq/User/GetUser',
					header: 'form',
					load:true,
					data: {
						token,
					}
				}).then((res) => {
					if (res.code == 0) {
						uni.setStorage({
							key: 'userInfo',
							data: res.data,
							success() {
								uni.switchTab({
									url: '/pages/tabBar/me/me'
								});
							}
						});
					} else {
						uni.showModal({
							content: res.message,
							showCancel: false
						});
					}
				}, (err) => {
					console.log(err)
				})
			},
			apiLoginQQWeChat(type, sessionid, nickname, photo) {
				console.log('apiLoginQQWeChat',type, sessionid, nickname, photo);
				this.$http({
					url: '/zjq/User/LoginQQWeChat',
					data: {
						type,
						sessionid,
						nickname,
						photo
					},
					header: 'form'
				}).then((res) => {
					this.loginSuccess(res);
				})
			},
			login_weixin() {
				// #ifndef APP-PLUS
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '目前仅APP支持'
				});
				// #endif

				// #ifdef APP-PLUS
				var vm = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider) //qq,xiaomi,sinaweibo,weixin
						vm.log.log1 = res.provider
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									vm.$http({
										method: 'GET',
										baseURL: 'https://api.weixin.qq.com/sns/userinfo',
										url: '',
										data: {
											openid: loginRes.authResult.openid,
											access_token: loginRes.authResult.access_token
										},
										load: true
									}).then((data) => {
										vm.apiLoginQQWeChat(5, loginRes.authResult.openid, data.nickname, data.headimgurl);
									}, (err) => {
										console.log(err)
									});
								}
							});
						}
					}
				});
				// #endif

			},
			login_qq() {
				// #ifndef APP-PLUS
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '目前仅APP支持'
				});
				// #endif

				// #ifdef APP-PLUS
				var vm = this;
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider) //qq,xiaomi,sinaweibo,weixin
						vm.log.log1 = res.provider
						if (~res.provider.indexOf('qq')) {
							uni.login({
								provider: 'qq',
								success: function(loginRes) {
									console.log('loginRes', loginRes)
									vm.$http({
										method: 'GET',
										baseURL: 'https://graph.qq.com/user/get_user_info',
										url: '',
										data: {
											openid: loginRes.authResult.openid,
											access_token: loginRes.authResult.access_token,
											appid: '101832674'
										},
										load: true
									}).then((data) => {
										console.log('get_user_info',data);
										vm.apiLoginQQWeChat(4, loginRes.authResult.openid, data.nickname, data.figureurl_qq);
									}, (err) => {
										console.log(err)
									});
								}
							});
						}
					}
				});
				// #endif

			},
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	@import "./signIn.scss";
</style>
