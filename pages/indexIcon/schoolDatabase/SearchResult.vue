<template>
	<view class="">
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false">
			<uni-search-bar style="width: 100%;" :radius="100" @confirm="search" :isDisabled="true" clearButton="always" @searchClick="handleSearchTap" />
		</uni-nav-bar>
	</view>
</template>

<script>
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
export default {
	components: { uniNavBar, uniSearchBar },
	data() {
		return {};
	},
	mounted() {
		this.$refs.search.searchClick();
	},
	methods: {
		handleBack() {
			// dev

			let data = getCurrentPages();
			if (data.length < 1) {
				uni.switchTab({
					url: '/pages/tabBar/index/index'
				});
			} else {
				// pro
				uni.navigateBack({});
			}
		},
		search({ value }) {}
	}
};
</script>

<style lang="scss" scoped></style>
