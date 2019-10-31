<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" 
				placeholder="输入新密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" 
				@tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="password2" type="text" maxlength="32" 
				placeholder="确认新密码" :password="!showPassword2" />
				<image class="img" :src="showPassword2?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" 
				@tap="display2"></image>
			</view>
		</view>
		<view class="jieshi">
			<text>密码必须是8-20个英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种。</text>
		</view>
		<view class="sign-in">
			<button type="primary" @tap="toIndex()">提 交</button>
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
				password: '',
				password2:'',
				code: '',
				invitation: '',
				xieyi: true,
				showPassword: false,
				showPassword2: false,
				second: 0
			};
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
			display2() {
				this.showPassword2 = !this.showPassword2
			},
			xieyitong() {
				this.xieyi = !this.xieyi;
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
			toIndex() {
				uni.navigateTo({
					url: '/pages/login/signIn/signIn'
				});
			},
			bindLogin() {
				if (this.xieyi == false) {
					uni.showToast({
						icon: 'none',
						title: '请先阅读《软件用户协议》'
					});
					return;
				}
				if (this.phoneno.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				if (this.code.length != 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				uni.request({
					url: 'http://***/reg.html',
					data: {
						phoneno: this.phoneno,
						password: this.password,
						code: this.code,
						invitation: this.invitation
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: res.data.msg
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 1500)
						}
					}
				});

			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header {
		width: 161upx;
		height: 161upx;
		background: rgba(63, 205, 235, 1);
		box-shadow: 0upx 12upx 13upx 0upx rgba(63, 205, 235, 0.47);
		border-radius: 50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161upx;
		height: 161upx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 40upx;
		height: 40upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.yzm {
		color: #FF7D13;
		font-size: 24upx;
		line-height: 64upx;
		padding-left: 10upx;
		padding-right: 10upx;
		width: auto;
		height: 64upx;
		border: 1upx solid #FFA800;
		border-radius: 50upx;
	}

	.yzms {
		color: #999999 !important;
		border: 1upx solid #999999;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width: 470upx;
		height: 100upx;
		background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
		box-shadow: 0upx 0upx 13upx 0upx rgba(164, 217, 228, 0.2);
		border-radius: 50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}

	.dlbutton-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.9), rgba(188, 226, 158, 0.9));
	}

	.xieyi {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}

	.xieyi image {
		width: 40upx;
		height: 40upx;
	}

	.sign-in {
		margin-top: 25px;
		text-align: center;

		button {
			width: 540upx;
			background-color: #17d8a9;
		}
	}
	.jieshi{
		padding: 25upx 70upx;
		color: #808080;
		font-size: 26upx;
	}
</style>
