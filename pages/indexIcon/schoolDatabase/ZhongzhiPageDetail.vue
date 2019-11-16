<template>
	<view class="">
		<view class=""><sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter></view>
		<view class="list">
			<school-list :listArr="listArr" showType="4"></school-list>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from './ProvinceCity.js';
import schoolList from './SchoolList.vue';
export default {
	components: { slFilter,schoolList },
	data() {
		return {
			topFixedHeight:'44px',
			listArr:[
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
				},{
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
				},{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				}
			],
			menuList: [
				{
					title: '省份',
					isMutiple: false,
					key: 'key_1',
					detailList: []
				},
				{
					title: '城市',
					key: 'key_2',
					isMutiple: false,
					detailList: [{
						title:'全部',
						value:''
					}]
				},
				{
					title: '性质类别',
					key: 'key_3',
					isMutiple: false,
					detailList: [
						{
							title: '中专',
							value: '1'
						},
						{
							title: '技校',
							value: '2'
						},
						{
							title: '职高',
							value: '3'
						},
						{
							title: '成人中专',
							value: '4'
						},
					]
				},
				{
					title: '学校属性',
					key: 'key_4',
					isMutiple: false,
					nowrap:true,
					detailList: [
						{
							title: '国家示范校',
							value: '1'
						},
						{
							title: '国家重点校',
							value: '2'
						}
					]
				}
			]
		};
	},
	created(){
		// this.initSearch();
	},
	onLoad(Option) {
		// #ifdef APP-PLUS
		this.topFixedHeight = '0'
		// #endif
		if (Option.province) {
			this.setSearch(Option.province);
		}else{
			this.setSearch()
		}
	},
	methods: {
		setSearch(provinceName) {
			// 初始省份
			let  index = 0,
				provinceArr = cityData.map((item,idx)=> {
					if(provinceName === item.title){
						index = idx
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
			if(provinceName){
				data[0].title = provinceName
				data[0].defaultSelectedIndex = index
				data[1].detailList = cityData[index].children
				if(cityData[index].children.length === 1){
					data[1].defaultSelectedIndex = 0
					data[1].title = cityData[index].children[0].title
				}
			}
			this.$nextTick(() => {
				this.$refs.filter.resetMenuList(data);
			});
		},
		handleSearch(result) {
			console.log(result,'result')
			if(!result.key_2){
				uni.showToast({
				    title: '请选择具体城市',
				    duration: 2000,
					icon:'none'
				})
			}
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].title)
			}
		}
	}
};
</script>
<style scoped lang="scss">
	.list{
		background: #FFFFFF;
	}
</style>