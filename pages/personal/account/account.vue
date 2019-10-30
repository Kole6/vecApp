<template>
	<view>
		<view class="center_menu">
			<view class="menu_item">
				<text>头像</text>
				<view class="menu_r">
					<image src="/static/p106.png" mode="aspectFill" class="menu_png"></image>
				</view>
			</view>
			<view class="menu_item" @touchstart="toPhone()">
				<text>手机</text>
				<text class="menu_r">修改手机号</text>
			</view>
			<view class="menu_item" @touchstart="toPwd()">
				<text>密码</text>
				<text class="menu_r">修改密码</text>
			</view>
			<view class="menu_item" @touchstart="toNi()">
				<text>昵称</text>
				<text class="menu_r">王老师</text>
			</view>
			<view class="menu_item" @touchstart="clickYao()">
				<text>我的邀请码</text>
				<text class="menu_r">9967</text>
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
			line-height: 45upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #fff;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('/static/right.png') no-repeat;
				background-size: 100%;
			}

			/* text:nth-of-type(2) {
				margin-left: 10px;
			} */

			.menu_r {
				position: absolute;
				color: #808080;
				width: 630upx;
				text-align: right;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			.menu_png {
				width: 65upx;
				height: 65upx;
				margin-top: 10upx;
			}

			.icon-menu {
				font-size: 36upx;
				color: #15d9a8;
			}

			/* &:nth-of-type(4) {
				 	margin-top: 10px;
				 } */
		}

	}
</style>
