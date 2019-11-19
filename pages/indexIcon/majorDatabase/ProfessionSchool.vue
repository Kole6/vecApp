<template>
	<view :style="styleObj">
		<!-- 专业信息-专业介绍 -->
		<view class="f-filter">	
			<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter>
		</view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: '400px'}" :loadStatus="loadStatus">
		<view class="m-result">
			<school-list :isSpecial="true" :isText="true" :showType="4" :listArr="dataArr"></school-list>
		</view>
		</load-more>

		<view class="line"></view>
		<view class="m-simi">
			<view class="title">相近专业</view>
		</view>
		<view class="list-simi" :style="{height:wrapperHeight}">
			<school-list :isText="true" :showType="4" :is-special="true" :listArr="listArr" :handleTaped="false"></school-list>
		</view>
		
	</view>
</template>

<script>
	
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from '@/pages/indexIcon/schoolDatabase/ProvinceCity.js';
// import myFilter from '@/pages/indexIcon/majorDatabase/filter.vue';
import testCom from '@/components/sl-filter/filter.vue';
import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';

import {professionData} from '../mockData.js'
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components:{slFilter,schoolList,loadMore},
	data() {
		return {
			loadStatus:'more',
			systemInfo: uni.getSystemInfoSync(),
			topFixedHeight:'44px',
			wrapperHeight: 'auto',
			styleObj:{
				'overflow':'auto',
				'background-color':'#fff'
			},
			dataArr: professionData,
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
					title:'性质类别',
					key:'key_3',
					isMutiple: false,
					detailList:[
						{
							title:'全部',
							value:'0'
						},
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
					detailList: [
						{
							title: '综合',
							value: '2'
						},
						{
							title: '理工',
							value: '3'
						},
						{
							title: '林业',
							value: '4'
						},
						{
							title: '农业',
							value: '5'
						},
						{
							title: '医药',
							value: '6'
						},
						{
							title: '示范',
							value: '7'
						},
						{
							title: '语文',
							value: '8'
						},
						{
							title: '财经',
							value: '9'
						},
						{
							title: '政治',
							value: '10'
						},
						{
							title: '体育',
							value: '11'
						},
						{
							title: '艺术',
							value: '12'
						},
						{
							title: '民族',
							value: '13'
						}
					]
				}
			],
			listArr: [
				{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},
				{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				},{
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards:[{name:'学历层次',value:'高职'},{name:'专业年限',value:'3年'}]
				}
			]
		};
	},
	onLoad(Option) {
		// 改变导航栏标题名称
		uni.setNavigationBarTitle({
			title:'农业种植'
		});
		// #ifdef APP-PLUS
		this.topFixedHeight='0',
		// #endif
		// #ifdef H5
		this.topFixedHeight='44px',
		// #endif
		// this.$set(this.styleObj,'height',uni.getSystemInfoSync().windowHeight + 'px' )
		this.$nextTick(()=>{
			this.setSearch()
		})
	},
	mounted() {
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.list-simi')
			.boundingClientRect(data => {
				this.wrapperHeight = this.systemInfo.screenHeight - data.top - 75 + 'px';
				console.log(this.wrapperHeight)
				// #ifdef H5
				this.wrapperHeight = this.systemInfo.screenHeight - data.top - 44 + 'px';
				// #endif
			})
			.exec();
	},
	methods: {
		onPullDown(done){
			setTimeout(()=>{
				this.dataArr = professionData
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
				this.dataArr=[...this.dataArr,...professionData]
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
		handleListTaped(item){
			
		},
		handleRouter({ url }, isRedirect = false) {
			if (isRedirect) {
				uni.redirectTo({
					url
				});
			} else {
			}
		},
		handleSearch(result) {
			if(!result.key_2){
				uni.showToast({
				    title: '请选择具体城市',
				    duration: 1000,
					icon:'none'
				})
			}
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].title)
			}
		},
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
			this.$nextTick(() => {
				this.$refs.filter.resetMenuList(data);
			});
		},
	}
};
</script>
<style>
/* .f-filter >>> .select-tab-fixed-top{
	border-top: solid 1upx #EEEEEE;
} */
</style>
<style scoped lang="scss">
@import './common.scss';

.m-result{
	background: #FFFFFF;
}
.list-simi{
	overflow: auto;
	background: #FFFFFF;
}
</style>
