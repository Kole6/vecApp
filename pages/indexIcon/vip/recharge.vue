<!--VIP续费充值页面-->
<template>
	<view>
		<view class="kong"></view>
		<view class="vip-pay">
			<view v-for="(item,index) in selList" :key="index">
				<view class="sc">
					<vec-select :class="[index==selIndex?'sc-tap':'']" :sel="index==selIndex" @reStyle="reStyle(index)">
						<p slot="tip" class="k1">{{item.k1}}</p>
						<p slot="tip" class="k2">{{item.k2}}</p>
						<p slot="tip" class="k1">{{item.k3}}</p>
					</vec-select>
				</view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="vip-mode">
			<view class="mode-title">
				<span>选择支付方式：</span>
			</view>
			<view class="mode-pay" v-for="(item,index) in payList" :key="index" @tap="raTap(index)">
				<image :src="item.icon" mode="aspectFill" />
				<text class="icon-text">{{item.name}}</text>
				<radio :checked="index==payIndex" color="#6451FC" />
			</view>
			<button class="vec-btn vip-open" type="primary" @tap="toSubmission()">立即支付</button>
		</view>
	</view>
</template>

<script>
	import vecSelect from "../../../components/vec-select/vec-select.vue"
	export default {
		components: {
			vecSelect
		},
		data() {
			return {
				selIndex: 0,
				selList: [{
					k1: "1个月",
					k2: '¥25',
					k3: '25元/月'
				}, {
					k1: "3个月",
					k2: '¥68',
					k3: '22.6元/月'
				}, {
					k1: "年费",
					k2: '¥233',
					k3: '19.4元/月'
				}],
				payIndex: 0,
				payList: [{
						icon: '/static/p507.png',
						name: '微信支付',
						code: '1001'
					},
					{
						icon: '/static/p508.png',
						name: '支付宝支付',
						code: '1002'
					}
				]
			};
		},
		methods: {
			toSubmission() {
				uni.showToast({
					icon: 'none',
					title: '暂未开通',
					position: 'bottom'

				})
			},
			reStyle(i) {
				this.selIndex = i
			},
			raTap(i) {
				this.payIndex = i
			}
		},
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.kong {
		width: 750upx;
		height: 20upx;
		background-color: #F6F8FE;
	}

	.vip-pay {
		width: 750upx;
		height: 262upx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;

		.sc {
			margin: 0upx 10upx;
			p {
				width: 210upx;
				// margin: 0upx 5upx;
			}

			.k1 {
				font-size: 22upx;
				color: rgba(153, 153, 153, 1);
				line-height: 30upx;
			}

			.k2 {
				font-size: 44upx;
				font-weight: 600;
				color: rgba(153, 153, 153, 1);
				line-height: 62upx;
			}
		}

		.sc-tap {
			.k1 {
				font-size: 22upx;
				color: rgba(51, 51, 51, 1);
				line-height: 30upx;
			}

			.k2 {
				font-size: 44upx;
				font-weight: 600;
				color: rgba(255, 0, 0, 1);
				line-height: 62upx;
			}
		}
	}

	.vip-mode {
		background-color: #fff;
		width: 750upx;

		.mode-title {
			height: 98upx;
			border-bottom: 1px solid #eee;
			font-size: 30upx;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			line-height: 98upx;
			padding-left: 30upx;
		}

		.mode-pay {
			padding-left: 30upx;
			border-bottom: 1px solid #eee;
			height: 98upx;
			color: rgba(51, 51, 51, 1);
			font-size: 28upx;
			display: flex;
			align-items: center;
			position: relative;
			image{
				width: 36upx;
				height: 36upx;
			}
			.icon-menu {
				color: rgb(8, 161, 248);
				font-size: 30upx;
			}

			.icon-menu2 {
				color: rgb(36, 175, 65);
			}

			.icon-text {
				padding-left: 10upx;
			}

			radio {
				transform: scale(0.7);
				position: absolute;
				right: 10upx;
				line-height: 98upx;
			}
		}
		.vip-open{
			margin-top: 100upx;
		}
	}
</style>
