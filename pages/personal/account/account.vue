<template>
	<view>
		<view class="center_menu" hover-class="center_menu--hover">
			<view class="menu_item">
				<text class="menu_l">头像</text>
				<view class="menu_r">
					<image src="/static/p106.png" class="menu_r_png" mode="aspectFill" ></image>
				</view>
			</view>
		    <view class="menu_item" @tap="toPhone()">
				<text class="menu_l">手机</text>
				<view class="menu_r">
					<text class="menu_r_text">修改手机号</text>
				</view>
			</view>
			<view class="menu_item" @tap="toPwd()">
				<text class="menu_l">密码</text>
				<text class="menu_r"><text class="menu_r_text">修改密码</text></text>
			</view>
			<view class="menu_item" @tap="toNi()">
				<text class="menu_l">昵称</text>
				<view class="menu_r">
					<text class="menu_r_text">王老师</text>
				</view>
			</view>
			<view class="menu_item" @tap="clickYao()">
				<text class="menu_l">我的邀请码</text>
				<text class="menu_r"><text class="menu_r_text">9967</text></text>
			</view>
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
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/signIn/signIn"
				});
			},
			toPhone() {
				uni.navigateTo({
					url: "/pages/personal/modifyPhone/modifyPhone"
				})
			},
			toPwd() {
				uni.navigateTo({
					url: "/pages/personal/modifyPwd/modifyPwd"
				})
			},
			toNi(){
				uni.showModal({
				    title: '提示',
				    content: '这是一个模态弹窗',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			clickYao() {
				// #ifdef APP-PLUS
				uni.showToast({
					title: "复制邀请码成功",
					position:'bottom'
				})
				// #endif
				// #ifndef APP-PLUS
				uni.showToast({
					title: '复制成功',
					duration: 500
				});
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: '9967',
					success: function() {
						console.log('copy success');
					}
				});
				// #endif
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			height: 80upx;
			letter-spacing: 1px;
			padding: 0 5%;
			background: #fff;
			overflow: hidden;
			display: inline-block;
			width: 100%;
			border-bottom: 1px solid #EFEFEF;
			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../../static/right.png') no-repeat;
				background-size: 100%;
				margin-top: 25upx;
			}
			.center_menu--hover {
				background-color: #f1f1f1
			}
			.menu_l{
				width: 300upx;
				position: absolute;
				line-height: 80upx;
			}
			.menu_r{
				position: absolute;
				color: #808080;
				right:10%;
				width: 350upx;
				text-align: right;
			}
			.menu_r_png {
				width: 60upx;
				height: 60upx;
				margin-top: 10upx;
			}
			.menu_r_text{
				line-height: 80upx;
			}

			.icon-menu {
				font-size: 36upx;
				color: #15d9a8;
			}
		}

	}
</style>
