<template>
	<view class="">
		<view class="list"><school-list showType="4" :listArr="dataArr"></school-list></view>
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
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
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
