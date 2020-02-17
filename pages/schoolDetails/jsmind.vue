<template>
	<view>
		<view>
			<web-view :src="src" v-if="src"></web-view>
		</view>
	</view>
</template>
<!-- http://47.103.69.156:18089/zjq/html/index.html?sid=4132013102&token=28d3efdcbb484c789d81d783fed3f6ef -->
<script>
	export default {
		data() {
			return {
				src:''
			};
		},
		onLoad(e) {
			this.$nextTick(()=>{
				this.src = `/hybrid/html/jsmind.html?sid=${e.sid}&token=${uni.getStorageSync('token')}`
			})
		}
	};
</script>