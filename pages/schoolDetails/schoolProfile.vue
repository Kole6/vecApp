<template>
	<view>
		<web-view :src="`https://baike.baidu.com/item/${shcoolName}`"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				shcoolName: ''
			};
		},
		onLoad: function(e) {
			console.log(e);
			this.shcoolName = e.schoolName
		}
	}
</script>

<style lang="scss">

</style>
