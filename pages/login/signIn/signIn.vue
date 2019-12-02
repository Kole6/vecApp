<template>
	<view class="sign">
		<view class="sign-logo">
			<image src="/static/logo-img.png" mode="aspectFill"></image>
		</view>
		<view class="sign-list" v-if="!isPhoneSign">
			<view class="list-call">
				<!-- <image class="img" src="/static/shilu-login/1.png"></image> -->
				<input class="biaoti" v-model="userno" type="text" maxlength="32" placeholder="请输入账号" />
			</view>
			<view class="list-call">
				<!-- <image class="img" src="/static/shilu-login/2.png"></image> -->
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="请输入密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
		</view>
		<view class="sign-list" v-else>
			<view class="list-call">
				<!-- <image class="img" src="/static/shilu-login/1.png"></image> -->
				<input class="biaoti" v-model="phoneno" type="number" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="list-call">
				<!-- <image class="img" src="/static/shilu-login/3.png"></image> -->
				<input class="biaoti" v-model="code" type="number" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}{{second>0?'s':''}}</view>
			</view>
		</view>
		<view class="wangji">
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
			<image @tap="login_qq()" src="../../../static/p108.png" mode="aspectFill"></image>
			<image @tap="login_weixin()" src="../../../static/p109.png" mode="aspectFill"></image>
		</view>
		<!-- <textarea :value=" log.log1 +'vvvvvvvv'+log.log2" placeholder="" maxlength="900"/> -->
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
				isPhoneSign: false,
				log:{
					log1:'',
					log2:''
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
				uni.navigateTo({
					url: "../userAgreement/userAgreement"
				})
			},
			toLogin(){
				if(this.userno && this.password){
					uni.setStorage({
					    key: 'userInfo',
						data:{
							phone:this.phoneno,
							name:this.userno,
							password:this.password
						}
					});
					uni.switchTab({
						url: "../../tabBar/me/me"
					})
				}else{
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入账号密码'
					});
				}
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
				    success: function (res) {
				        console.log(res.provider) //qq,xiaomi,sinaweibo,weixin
						vm.log.log1 = res.provider
				        if (~res.provider.indexOf('weixin')) {
				            uni.login({
				                provider: 'weixin', 
				                success: function (loginRes) {
				                	vm.$HTTP({
				                	  method: 'GET',
				                	  baseURL:'https://api.weixin.qq.com/sns/userinfo',
				                	  url: '',
				                	  data: {
				                		  openid:loginRes.authResult.openid,
				                		  access_token:loginRes.authResult.access_token
				                	  },
				                	  load:true
				                	}).then((data) =>{
				                	  uni.setStorage({
				                	    key: 'userInfo',
				                	  	data:{
				                			name:data.nickname,
				                			picUrl:data.headimgurl
				                		}
				                	  });
				                	  uni.switchTab({
				                	  	url: "../../tabBar/me/me"
				                	  })
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
				    success: function (res) {
				        console.log(res.provider) //qq,xiaomi,sinaweibo,weixin
						vm.log.log1 = res.provider
				        if (~res.provider.indexOf('qq')) {
				            uni.login({
				                provider: 'qq', 
				                success: function (loginRes) {
									vm.$HTTP({
									  method: 'GET',
									  baseURL:'https://graph.qq.com/user/get_user_info',
									  url: '',
									  data: {
										  openid:loginRes.authResult.openid,
										  access_token:loginRes.authResult.access_token,
										  appid:'101832674'
									  },
									  load:true
									}).then((data) =>{
									  console.log(data)
									  uni.setStorage({
									    key: 'userInfo',
									  	data:{
											name:data.nickname,
											picUrl:data.figureurl_qq
										}
									  });
									  uni.switchTab({
									  	url: "../../tabBar/me/me"
									  })
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
	page{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	@import "./signIn.scss";
</style>
