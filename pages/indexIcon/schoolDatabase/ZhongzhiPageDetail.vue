<template>
	<view class="">
		<view class=""><sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter></view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: systemInfo.screenHeight - 100 +'px'}" :loadStatus="loadStatus">
		<view class="list">
			<school-list showType="4" :listArr="dataArr" />
			</view>
		</load-more>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from './ProvinceCity.js';
import schoolList from './SchoolList.vue';
import {schoolData} from '../mockData.js'
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: { slFilter,schoolList ,loadMore},
	data() {
		return {
			topFixedHeight:'44px',
			dataArr: schoolData,
			loadStatus:'more',
			systemInfo: uni.getSystemInfoSync(),
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
		onPullDown(done){
			setTimeout(()=>{
				this.dataArr = schoolData
				done();
			},2000)
		},
		onScroll(){
		},
		onLoadMore(){
			this.loadStatus = 'loading'
			// this.getData().then(()=>{
			// })
			setTimeout(() =>{
				this.dataArr=[...this.dataArr,...schoolData]
					this.loadStatus = 'more'
			}, 1000);
		},
		getData(){
			return new Promise((resolve,reject)=>{
				uni.request({
					url:'http://47.103.69.156:18089/zjq/College/GetSchoolMajorHighLightSearchList',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						token:'d05902562e544db29bbe777954d43bb0',
						pageIndex:'1',
						pageSize:'10',
						key:'浙江'
					},
					method:'POST',
					success:({data}) => {
						if(data.code == 0){
							
						}
						console.log(data,'res')
					},
					complete() {
						resolve();
					}
				})
			})
		},
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