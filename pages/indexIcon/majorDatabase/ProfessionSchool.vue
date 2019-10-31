<template>
	<view>
		<!-- 专业信息-专业介绍 -->
		<view class="top">
			<view class="top-btn" @tap="handleRouter({ url: './ProfessionDesc' }, true)">专业介绍</view>
			<view class="top-btn active">开设学校</view>
		</view>
		<!-- 基本信息 -->
		<view class=""></view>
		<!-- 专业解读 -->
		<view class=""></view>
		<!-- 相近专业 -->
		<view class=""></view>
		<!-- 底部按钮 -->
		<view class="bottom"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad(Option) {
		console.log(Option, 'Option');
	},
	methods: {
		handleRouter({ url }, isRedirect = false) {
			if (isRedirect) {
				uni.redirectTo({
					url
				});
			} else {
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import './common.scss';
</style>
