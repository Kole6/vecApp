<template>
	<view class="content">
		<view class="list">
			<view class="list-call">
				<input class="biaoti" v-model="phoneno" type="number" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="list-call">
				<input class="biaoti" v-model="code" type="number" maxlength="6" placeholder="请输入验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}{{second>0?'s':''}}</view>
			</view>
		</view>
		<view class="sign-in">
			<button class="vec-btn" type="primary" @tap="toIndex()">提 交</button>
		</view>
	</view>
</template>

<script>
	var tha, js;
	export default {
		onLoad() {
			tha = this;
		},
		onShow() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phoneno: '',
				password: '',
				code: '',
				invitation: '',
				xieyi: true,
				showPassword: false,
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
						this.testCode = res.data.vcode;
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
			apiBindPhone() {
				this.$http({
					url: '/zjq/User/BindPhone',
					header: 'form',
					data: {
						phone: this.phoneno,
						code: this.code,
						token: uni.getStorageSync('token')
					}
				}).then((res) => {
					if (res.code == 0) {
						uni.showToast({
							title: '绑定成功！'
						})
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/login/signIn/signIn`
							});
						}, 1000)
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
			toIndex() {
				if (this.code && (this.testCode == this.code)) {
					this.apiBindPhone();
				} else {
					uni.showModal({
						content: '请填写正确的手机号和验证码！',
						showCancel: false
					});
				}
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
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 60upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: rgba(170, 170, 170, 1);
		border-bottom: 1upx solid #999;
	}

	.list-call .img {
		width: 40upx;
		height: 40upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 30upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.yzm {
		color: $main-base-color;
		font-size: 25upx;
		line-height: 64upx;
		padding-left: 50upx;
		padding-right: 50upx;
		width: auto;
		height: 64upx;
		border-left: 2upx solid #999999;
	}

	.yzms {
		color: #999999 !important;
	}

	.sign-in {
		margin-top: 50px;
	}
</style>
