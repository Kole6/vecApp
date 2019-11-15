<template>
	<view class="">
		<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter>
		<view class="m-content" :style="{height:wrapperHeight}">
			<school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
		</view>
	</view>
</template>

<script>
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
	export default {
		components:{slFilter,schoolList},
		data(){
			return{
				wrapperHeight:'auto',
				systemInfo: uni.getSystemInfoSync(),
				topFixedHeight:'',
				menuList:[
					{
						title: '重点专业',
						isMutiple: false,
						key: 'key_1',
						detailList: [
							{
								title:'全部',
								value:'0'
							},
							{
								title:'航天航空',
								value:'1'
							},{
								title:'医药护理',
								value:'2'
							}
						]
					},
					{
						title: '产业大类',
						key: 'key_2',
						isMutiple: false,
						detailList: [{
							title:'全部',
							value:''
						},{
							title:'农林牧渔',
							value:'1'
						}]
					},
					{
						title:'专业年份',
						key:'key_3',
						isMutiple: false,
						detailList:[
							{
								title:'全部',
								value:'0'
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
							},
						]
					}
				],
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
					}
				]
			}
		},
		mounted(){
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
		methods:{
			handleConditionTap({ key, list, index }) {
				// 选择省份的时候进行城市赋值
				if (key == 'key_1') {
					this.setSearch(list[index].title)
				}
			},
			handleSearch(){
				
			},
		}
		
	}
</script>

<style scoped lang="scss">
	.m-content{
		overflow: auto;
		background: #FFFFFF;
	}
</style>
