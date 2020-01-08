<template>
	<view class="">
		<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter>
		<view class="m-content">
			<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight }" :loadStatus="loadStatus">
				<school-list :isText="true" :showType="4" :isSpecial="true" :listArr="dataArr"></school-list>
			</load-more>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import schoolList from '@/components/vec-school-list/vec-school-list.vue';
import { professionData } from '@/pages/indexIcon/mockData.js';
import loadMore from '@/components/loadMore/you-scroll.vue';
export default {
	components: { slFilter, schoolList, loadMore },
	data() {
		return {
			loadStatus: 'more',
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			topFixedHeight: '',
			menuList: [
				{
					title: '重点专业',
					isMutiple: false,
					key: 'key_1',
					detailList: [
						{
							title: '全部',
							value: '0'
						},
						{
							title: '航天航空',
							value: '1'
						},
						{
							title: '医药护理',
							value: '2'
						}
					]
				},
				{
					title: '产业大类',
					key: 'key_2',
					isMutiple: false,
					detailList: [
						{
							title: '全部',
							value: ''
						},
						{
							title: '农林牧渔',
							value: '1'
						}
					]
				},
				{
					title: '专业年份',
					key: 'key_3',
					isMutiple: false,
					detailList: [
						{
							title: '全部',
							value: '0'
						},
						{
							title: '2019',
							value: '1'
						},
						{
							title: '2018',
							value: '2'
						},
						{
							title: '2017',
							value: '3'
						},
						{
							title: '2016',
							value: '4'
						}
					]
				}
			],
			dataArr: professionData
		};
	},
	mounted() {
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.m-content')
			.boundingClientRect(data => {
				let height = '';
				// #ifdef APP-PLUS
				height = this.systemInfo.screenHeight - data.top - 94 + 'px';
				// #endif
				// #ifdef H5
				height = this.systemInfo.screenHeight - data.top - 50 + 'px';
				// #endif
				if (height) {
					this.wrapperHeight = height;
				}
			})
			.exec();
	},
	methods: {
		onPullDown(done) {
			setTimeout(() => {
				// this.dataArr = schoolData;
				done();
			}, 2000);
		},
		onScroll() {},
		onLoadMore() {
			this.loadStatus = 'loading';
			// this.getData().then(()=>{
			// })
			setTimeout(() => {
				this.loadStatus = 'more';
			}, 1000);
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].title);
			}
		},
		handleSearch() {}
	}
};
</script>

<style scoped lang="scss">
.m-content {
	overflow: auto;
	background: #ffffff;
}
</style>
