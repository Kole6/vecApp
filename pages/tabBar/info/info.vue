<template>
	<view class="content">
		<!-- <view class="title">{{title}}...</view>
		 -->
		 15646
		 <news-list></news-list>
	</view>
</template>

<script>
	import newsList from '@/pages/list/list.nvue';
	export default {
		components: {
			newsList
		},
		data() {
			return {
				title: '资讯',
				strings : ''
			}
		},
		onLoad:function(e){
			
		}
	}
</script>

<style>
</style>
