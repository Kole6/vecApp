<!--国际交流合作-->
<template>
	<view>
		<!-- <view class="m-search"><uni-search-bar :radius="100" @confirm="search" /></view> -->
		<view class="school-list" :style="{ height: wrapperHeight }"><school-list :isText="true" :showType="4" :listArr="dataArr"></school-list></view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
export default {
	components: { uniSearchBar, schoolList },
	data() {
		return {
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
			dataArr: [
				{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
			]
		};
	},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.school-list')
			.boundingClientRect(data => {
				let height = '';
				// #ifdef APP-PLUS
				height = this.systemInfo.screenHeight - data.top - 44 + 'px';
				// #endif
				// #ifdef H5
				height = this.systemInfo.screenHeight - data.top  + 'px';
				// #endif
				if (height) {
					this.wrapperHeight = height;
				}
			})
			.exec();
	}
};
</script>

<style lang="scss" scoped>
.m-search {
	padding: 0 40upx;
	background: #ffffff;
}
.school-list {
	box-sizing: border-box;
	overflow: auto;
	padding-bottom: 50upx;
	background: #FFFFFF;
}
</style>
