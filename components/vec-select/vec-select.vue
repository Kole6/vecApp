<!-- 选择框组件 -->
<template>
	<view :class="sel?'sel2':'sel1'" width="160upx" @tap="reStyle()">
		<slot name="tip"></slot>
		<!-- <p slot="tip">功能异常</p> -->
	</view>
</template>
<!-- 选择框互斥的代码放到业务页面上处理 -->
<script>
	export default {
		props: {
			//是否显示显示选中
			sel: {
				type: Boolean,
				default: function() {
					return false;
				}
			}
		},
		methods: {
			reStyle() {
				this.$emit("reStyle",this.sel)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sel1 {
		border: 1px solid #979797;
		color: #999999;
		font-size: 26upx;
		padding: 15upx 5upx;
		text-align: center;
		border-radius: 7upx;
	}

	.sel2 {
		background: url('../../static/p110.png') no-repeat right top;
		background-size: 30upx;
		border: 1px solid rgb(255, 71, 71);
		padding: 15upx 5upx;
		font-size: 26upx;
		color: #FF0000;
		text-align: center;
		border-radius: 7upx;
	}
</style>
