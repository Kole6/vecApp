<template>
	<view class="content">
		<image class="logo" src="/static/u1.png" mode="aspectFill" />
		<view class="text-area">
			<form @submit="formSubmit">
				<view class="uni-form-item uni-column">
					<view class="title">姓名:</view>
					<input class="uni-input" required name="name" placeholder="请输入姓名" />
					<view class="title">手机号:</view>
					<input class="uni-input" required='required' type='number' name="phone" placeholder="请输入手机号" />
					<view class="title">我的学校:</view>
					<input class="uni-input" required name="school" placeholder="请输入学校" />
				</view>
				<view class="uni-btn-v">
					<button class="btn" form-type="submit"><span class="sub">确认提交</span></button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
			formSubmit: function(e) {
				let formdata = e.detail.value;
				console.log(formdata);
				let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
				if (formdata.phone == '' || formdata.name == '' || formdata.school == '') {
					uni.showToast({
						title: "请填写未填项",
						duration: 2000,
						icon: 'none'
					})
					return;
				} else if (!reg.test(formdata.phone)) {
					uni.showToast({
						title: '手机格式不正确',
						duration: 2000,
						icon: 'none'
					})
					return;
				}
				this.$http({
					url: '/zjq/User/QuickRegister?phone=' + formdata.phone + '&userName=' + formdata.name + '&schoolName=' + formdata.school
				}).then((data) => {
					console.log(data);
					uni.showToast({
						title: data.message,
						icon: 'none'
					});
					if (data.code == '0') {
						uni.setStorage({
							key: 'launchFlag',
							data: true
						});
						uni.setStorage({
						    key: 'userInfo',
							data:formdata
						});
						uni.switchTab({
							url: './index'
						})
					}
				}, (err) => {
					console.log(err)
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 100%;
		height: 216upx;
		width: 750upx;
	}

	.text-area {
		margin-top: 84rpx;
		display: flex;
		justify-content: center;
	}

	.title {
		margin-top: 30rpx;
		font-size: 36rpx;
		color: #333333;
	}

	.uni-input {
		width: 550rpx;
		height: 78rpx;
		text-indent: 20rpx;
		border: 2rpx solid #CCCCCC;
	}

	.uni-btn-v {
		margin-top: 135rpx;
	}

	.btn {
		width: 460rpx;
		height: 87rpx;
		background: linear-gradient(360deg, rgba(106, 67, 254, 1) 0%, rgba(71, 149, 249, 1) 100%);
		box-shadow: 0rpx 10rpx 20rpx 0rpx rgba(71, 149, 249, 0.3);
		border-radius: 50rpx;
		color: white;
		text-align: center;
	}

	.sub {
		display: block;
		line-height: 87rpx;
	}
</style>
