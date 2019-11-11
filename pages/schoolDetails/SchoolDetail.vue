<template>
	<view class="">
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false" title="北京市滨海职业大学" right-icon="star">
		</uni-nav-bar>
	</view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
export default {
	components:{uniNavBar},
	data() {
		return {};
	},
	methods:{
		handleBack(){
			uni.navigateBack()
		}
	}
};
</script>

<style scoped lang="scss">
	
</style>
