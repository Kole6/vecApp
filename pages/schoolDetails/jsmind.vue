<template>
	<view class="">
		<view class="frame-wrapper">
			<web-view :src="src" class="iframe" style="width:100%;border:none"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'/hybrid/html/jsmind.html?'
			};
		},
		onLoad(e) {
			this.src = this.src + `sid=${e.sid}`
		}
		/* mounted() {
			获取webview实例
			setTimeout(()=>{
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];  
				var currentWebview ='',childWebview= ''
				// #ifdef APP-PLUS  
				currentWebview = page.$getAppWebview(); //页面栈最顶层就是当前webview  
				childWebview = currentWebview.children()
				// #endif
				// 获取展开的webview
				if(childWebview.length){
					let child = childWebview[0]
				}
			}, 1000)
		} */
	};
</script>

<style lang="scss" scoped>
	.frame-wrapper {
		// height: 600px;
	}

	body {
		margin: 0;
	}
</style>
