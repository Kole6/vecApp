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
			<button class="vec-btn" type="primary" @tap="toIndex()">下 一 步</button>
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
				testCode: '',
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
			toIndex() {
				if (this.code && (this.testCode == this.code)) {
					uni.navigateTo({
						url: `/pages/personal/modifyPwd/modifyPwd?phoneno=${this.phoneno}&code=${this.code}`
					});
				}else{
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
		border-bottom: 1upx solid #999;
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
		margin-top: 50px;
		text-align: center;

		button {
			width: 540upx;
			background-color: #17d8a9;
		}
	}
</style>
