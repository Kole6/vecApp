<template>
	<sl-filter
		:topFixedHeight="topFixedHeight"
		:scrollHeight="scrollHeight"
		ref="filter"
		@conditionTap="handleConditionTap"
		:menuListArr="menuList"
		:topFixed="true"
		@result="handleSearch"
	></sl-filter>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from '@/pages/indexIcon/schoolDatabase/ProvinceCity.js';
export default {
	components: {
		slFilter
	},
	props: {
		menuList:{
			type:Array,
			required:true,
		},
		handleConditionTap:Function,
		handleSearch:Function,
		topFixedHeight: {
			type: String,
			default: '44px'
		},
		scrollHeight: {
			type: String,
			default: 'calc(100% - 50px)'
		}
	},
	data() {
		return {
			// menuList: [
			// 	{
			// 		title: '省份',
			// 		isMutiple: false,
			// 		key: 'key_1',
			// 		detailList: []
			// 	},
			// 	{
			// 		title: '城市',
			// 		key: 'key_2',
			// 		isMutiple: false,
			// 		detailList: [
			// 			{
			// 				title: '全部',
			// 				value: ''
			// 			}
			// 		]
			// 	},
			// 	{
			// 		title: '学校类型',
			// 		key: 'key_3',
			// 		isMutiple: false,
			// 		detailList: [
			// 			{
			// 				title: '全部',
			// 				value: ''
			// 			},
			// 			{
			// 				title: '综合',
			// 				value: '2'
			// 			},
			// 			{
			// 				title: '理工',
			// 				value: '3'
			// 			},
			// 			{
			// 				title: '林业',
			// 				value: '4'
			// 			},
			// 			{
			// 				title: '农业',
			// 				value: '5'
			// 			},
			// 			{
			// 				title: '医药',
			// 				value: '6'
			// 			},
			// 			{
			// 				title: '示范',
			// 				value: '7'
			// 			},
			// 			{
			// 				title: '语文',
			// 				value: '8'
			// 			},
			// 			{
			// 				title: '财经',
			// 				value: '9'
			// 			},
			// 			{
			// 				title: '政治',
			// 				value: '10'
			// 			},
			// 			{
			// 				title: '体育',
			// 				value: '11'
			// 			},
			// 			{
			// 				title: '艺术',
			// 				value: '12'
			// 			},
			// 			{
			// 				title: '民族',
			// 				value: '13'
			// 			}
			// 		]
			// 	},
			// 	{
			// 		title: '国家示范校',
			// 		key: 'key_4',
			// 		isMutiple: false,
			// 		nowrap: true,
			// 		detailList: [
			// 			{
			// 				title: '国家示范校',
			// 				value: '1'
			// 			},
			// 			{
			// 				title: '国家骨干校',
			// 				value: '2'
			// 			},
			// 			{
			// 				title: '高水平学校',
			// 				value: '3'
			// 			}
			// 		]
			// 	}
			// ]
		};
	},
	methods: {
		setSearch(provinceName) {
			// 初始省份
			let index = 0,
				provinceArr = cityData.map((item, idx) => {
					if (provinceName === item.title) {
						index = idx;
					}
					return {
						title: item.title,
						value: item.value
					};
				}),
				// 初始第一个省份下的城市
				cityArr = cityData[0].children,
				data = JSON.parse(JSON.stringify(this.menuList));

			data[0].detailList = provinceArr;
			data[1].detailList = cityArr;
			if (provinceName) {
				data[0].title = provinceName;
				data[0].defaultSelectedIndex = index;
				data[1].detailList = cityData[index].children;
				if (cityData[index].children.length === 1) {
					data[1].defaultSelectedIndex = 0;
					data[1].title = cityData[index].children[0].title;
				}
			}
			console.log(data, 'data');
			this.$nextTick(() => {
				this.$refs.filter.resetMenuList(data);
			});
		},
		// handleSearch(result) {
		// 	console.log(result, 'result');
		// 	if (!result.key_2) {
		// 		uni.showToast({
		// 			title: '请选择具体城市',
		// 			duration: 1000,
		// 			icon: 'none'
		// 		});
		// 	}
		// },
		// handleConditionTap({ key, list, index }) {
		// 	// 选择省份的时候进行城市赋值
		// 	if (key == 'key_1') {
		// 		console.log(JSON.stringify(this.$refs), 'refs');
		// 		// this.$refs.myfilter.setSearch(list[index].title)
		// 	}
		// }
	}
};
</script>

<style></style>
