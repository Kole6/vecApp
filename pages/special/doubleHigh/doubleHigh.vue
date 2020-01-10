<template>
	<view>
		<view class="m-search">
			<uni-search-bar :radius="100" @confirm="search"/>
		</view>
		<view class="" style="height: 51px;"></view>
		<view class="">
			<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter>
		</view>
		<load-more ref="scroll" @onPullDown="onPullDown"  @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
		<view class="list"><school-list :listArr="dataArr" showType="4"></school-list></view>
		</load-more>
		
		<drawer-filter :tagList="tagList" :isShow="showDrawer"  @close="showDrawer = false" @CClick="handleCClick" @IClick="handleIClick" @reset="handleDrawerReset" @confirm="handleDrawerConfirm"></drawer-filter>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from '@/pages/indexIcon/schoolDatabase/ProvinceCity.js';
import schoolList from '@/components/vec-school-list/vec-school-list.vue';
import drawerFilter from './DrawerFilter.vue'
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: {drawerFilter, slFilter, schoolList ,uniSearchBar ,loadMore},
	onNavigationBarButtonTap(option) {
		this.showDrawer = true;
	},
	data() {
		return {
			searchValue:'',
			provinceArr: [],
			cityArr: [],
			page: {
				pageIndex: 1,
				pageSize: 10
			},
			currentSearch:{
				token: uni.getStorageSync('token')
			},
			loadStatus:'more',
			systemInfo: uni.getSystemInfoSync(),
			showDrawer: false,
			wrapperHeight:'auto',
			tagList: [
				{
					title:{
							name: '国家级教育试学试点',
							isShow: true
					},
					list: [
						{
							name: '现代学徒制',
							selected: false
						},
						{
							name: '三全育人',
							selected: false
						},
						{
							name: '诊改试点',
							selected: false
						},
						{
							name: '培养士官',
							selected: false
						}
					]
				},
				{
					title: {
							name: '国家级教育试学试点',
							isShow: true
					},
					list: [
						{
							name: '现代学徒制',
							selected: false
						},
						{
							name: '三全育人',
							selected: false
						},
						{
							name: '诊改试点',
							selected: false
						},
						{
							name: '培养士官',
							selected: false
						}
					]
				},
				{
					title:{
							name: '国家级教育试学试点',
							isShow: true
					},
					list: [
						{
							name: '现代学徒制',
							selected: false
						},
						{
							name: '三全育人',
							selected: false
						},
						{
							name: '诊改试点',
							selected: false
						},
						{
							name: '培养士官',
							selected: false
						}
					]
				}
			],
			topFixedHeight: '44px',
			dataArr: [],
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
					detailList: []
				},
				{
					title: '学校属性',
					key: 'key_3',
					isMutiple: false,
					nowrap: true,
					detailList: []
				}
			]
		};
	},
	onLoad(Option) {
		// #ifdef APP-PLUS
		this.topFixedHeight='44px'
		// #endif
		// #ifdef H5
		this.topFixedHeight='94px'
		// #endif
	},
	mounted() {
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.list')
			.boundingClientRect(data => {
				let  height = ''
				// #ifdef APP-PLUS
				height = this.systemInfo.screenHeight - data.top - 84 ;
				// #endif
				// #ifdef H5
				height = this.systemInfo.screenHeight - data.top - 50 ;
				// #endif
				this.wrapperHeight = height + 'px'

			})
			.exec();
			this.initSearch();
	},
	methods: {
		handleDrawerConfirm(){
			this.isShow = false;
		},
		handleDrawerReset(){
			this.tagList.forEach((category,index)=>{
				category.list.forEach((item,idx)=>{
					item.selected = false;
				})
			})
		},
		handleIClick({item,itemIndex,tag,tagIndex}){
			this.tagList[itemIndex].list[tagIndex].selected = !this.tagList[itemIndex].list[tagIndex].selected
		},
		handleCClick({item,index}){
			this.tagList[index].title.isShow = !this.tagList[index].title.isShow
		},		/*
		 *@params type 转化的类型 1 查询条件  2 数据列表
		 */
		transformData(data, type = 1) {
			if (type === 1) {
				return data.map(item => {
					return {
						...item,
						title: item.name,
						value: item.code
					};
				});
			} else if (type === 2) {
				return data.map(item => {});
			} else {
				return data;
			}
		},
		async initSearch() {
			try {
				// 获取省
				let provinceData = await this.getSearchCondition({
					type: 'xzqh',
					pid: '0'
				});
				if (!provinceData.length) return;
				this.provinceArr = this.transformData(provinceData);
				// 获取市
				let cityData = await this.getSearchCondition({
					type: 'xzqh',
					pid: provinceData[0].code
				});
				if (!cityData.length) return;
				this.cityArr = this.transformData(cityData);
				// 获取学校类型与国家示范校
				let schoolType = await this.getSearchCondition({
					type: 'xxlx',
					pid: '0',
				});

				this.menuList[2].detailList = this.transformData(schoolType);
				this.$refs.filter.resetMenuList(this.menuList);
				this.setSearch('',true);
				// 初次加载数据
				this.onLoadMore();
			} catch (err) {
				console.error(err)
			}
		},
		getSearchCondition(data = {}) {
			return new Promise((resolve, reject) => {
				this.$http({
					url: '/zjq/mainpage/GetDict',
					header: 'form',
					data
				}).then(res => {
					if (res.code == 0) {
						resolve(res.data);
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						reject();
					}
				});
			});
		},
		onPullDown(done) {
			this.page.pageIndex = 1;
			let params = {
				...this.currentSearch,
				pageIndex: this.page.pageIndex,
				pageSize: this.page.pageSize
			};
			this.getData(params, true)
				.then(isLastPage => {
					if (isLastPage) {
						this.loadStatus = 'noMore';
					} else {
						this.loadStatus = 'more';
					}
				})
				.finally(() => {
					done && done();
				});
		},
		onLoadMore() {
			this.loadStatus = 'loading';
			this.getData().then(isLastPage => {
				if (isLastPage) {
					this.loadStatus = 'noMore';
				} else {
					this.loadStatus = 'more';
				}
			});
		},
		getData(data = { ...this.currentSearch, pageIndex: this.page.pageIndex, pageSize: this.page.pageSize}, isRefresh = false) {
			// 查询为双高计划的学校
			data.sfsg = '1'
			return new Promise((resolve, reject) => {
				this.$http({
					url: '/zjq/College/GetSchoolSearchList',
					header: 'form',
					data
				}).then(res => {
					if (res.code == 0) {
						let data = this.$tool.toolSchoolList(res.data.list)
						if (isRefresh) {
							this.page.pageIndex = 1;
							this.dataArr = data;
						} else {
							this.page.pageIndex++;
							this.dataArr.push(...data);
						}
						resolve(res.data.lastPage);
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				});
			});
		},
		setSearch(provinceId,isFirst=false) {
			let index = 0,
				provinceName = '',
				data = JSON.parse(JSON.stringify(this.menuList)),
				provinceArr = this.provinceArr.map((item, idx) => {
					if (provinceId == item.value) {
						index = idx;
						provinceName = item.title;
					}
					return {
						...item
					};
				});
			if(!provinceId){
				provinceName = provinceArr[0].title
			}
			data[0].detailList = provinceArr;
			this.getSearchCondition({
				type: 'xzqh',
				pid: provinceId?provinceId:provinceArr[0].code
			}).then(resData => {
				let cityData = this.transformData(resData);
				data[1].detailList = cityData;
				if(isFirst){
					this.$nextTick(() => {
						this.$refs.filter.resetMenuList(data);
					});
					return;
				}
				data[0].title = provinceName;
				data[0].defaultSelectedIndex = index;
				if (cityData.length == 1) {
					data[1].defaultSelectedIndex = 0;
					data[1].title = cityData[0].title;
				}
				this.$nextTick(() => {
					this.$refs.filter.resetMenuList(data);
				});
			});
			this.$nextTick(() => {
				this.$refs.filter.resetMenuList(data);
			});
		},
		handleSearch(result) {
			if (!result.key_2) {
				uni.showToast({
					title: '请选择具体城市',
					duration: 1000,
					icon: 'none'
				});
				return;
			}
			this.currentSearch = {
				provinceId: result.key_1,
				cityId: result.key_2,
				schoolType: result.key_3,
				token: uni.getStorageSync('token')
			};
			this.onPullDown();
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].code);
			}
		},
		handleConfirm() {
			this.showDrawer = false;
		},
		search({value}){
			this.searchValue = value;
		}
	}
};
</script>

<style lang="scss" scoped>
.m-search{
	position: fixed;
	top: '44px';
	z-index: 10;
	box-sizing: border-box;
	width: 100%;
	padding: 0 40upx;
	background: #FFFFFF;
}
.list{
	// padding-top: 23px;
	background: #FFFFFF;
}
</style>