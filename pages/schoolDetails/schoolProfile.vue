<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				src:'',
			};
		},
		onLoad: function(option) {
			if(option.schoolName){
				this.src = `https://baike.baidu.com/item/${option.schoolName}`
			}else if(option.website){
				this.src = option.website
				uni.setNavigationBarTitle({
					title:'学校官网'
				})
			}else if(option.baike){
				this.src = option.baike
			}
		}
	}
</script>

<style lang="scss">

</style>
