<template>
	<view class="">
		<view class="search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" /></view>
		<view class="list"><school-list :listArr="dataArr"></school-list></view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from './SchoolList.vue';
export default {
	components: { uniSearchBar, schoolList },
	data() {
		return {
			dataArr: [
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
				},
				{
					title: '河北市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
				}
			]
		};
	},
	mounted() {
		// uni.setNavigationBarTitle({
		// 　　title:'测试标题'
		// })
	},
	/* 标题栏按钮配置
	,
	"app-plus":{
		"bounce":"none",
		"titleNView":{
			"buttons": [ //原生标题栏按钮配置,
					{
						"text": "分享",
						"fontSize":"22upx",
						"width":"30px"
					}
			  ]
		}
	}
	*/
	onNavigationBarButtonTap(){
		console.log(arguments,'au')
	},
	methods: {
		search({ value }) {}
	}
};
</script>

<style scoped lang="scss">
.search {
	padding: 5upx 30upx;
	border-bottom: solid 1px $uni-border-color;
}
</style>
