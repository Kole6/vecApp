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
	components:{
		slFilter
	},
	props:{
		menuList:Array,
		handleConditionTap:Function,
		handleSearch:Function,
		topFixedHeight:{
			type:String,
			default:'44px',
		},
		scrollHeight:{
			type:String,
			default:'calc(100% - 50px)'
		}
	},
	data(){
		return{

		}
	},
	methods:{
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
			console.log(data,'data')
			this.$nextTick(() => {
				this.$refs.filter.resetMenuList(data);
			});
		},
	}
};
</script>

<style></style>
