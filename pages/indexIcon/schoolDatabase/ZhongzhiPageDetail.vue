<template>
	<view class="">
		<view class="">
			<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixedHeight="topFixedHeight" :topFixed="true" @result="handleSearch"></sl-filter>
		</view>

		<load-more
			ref="scroll"
			@onPullDown="onPullDown"
			@onLoadMore="onLoadMore"
			:styleObj="{ height: systemInfo.screenHeight - 100 + 'px' }"
			:loadStatus="loadStatus"
		>
			<view class="list"><school-list showType="4" :listArr="dataArr" /></view>
		</load-more>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import schoolList from '@/components/vec-school-list/vec-school-list.vue';
import loadMore from '@/components/loadMore/you-scroll.vue';
export default {
	components: { slFilter, schoolList, loadMore },
	data() {
		return {
			provinceArr: [],
			cityArr: [],
			page: {
				pageIndex: 1,
				pageSize: 10
			},
			currentSearch: {
				token: uni.getStorageSync('token')
			},
			topFixedHeight: '44px',
			dataArr: [],
			loadStatus: 'more',
			systemInfo: uni.getSystemInfoSync(),
			params: {},
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
					detailList: [
						{
							title: '全部',
							value: ''
						}
					]
				},
				{
					title: '学校类型',
					key: 'key_3',
					isMutiple: false,
					detailList: []
				},
				{
					title: '国家示范校',
					key: 'key_4',
					isMutiple: false,
					nowrap: true,
					detailList: []
				}
			]
		};
	},
	created() {
		this.initSearch();
	},
	onLoad(Option) {
		// #ifdef APP-PLUS
		this.topFixedHeight = '0px';
		// #endif
		// province   provinceId
		this.params = Option;
		if (Option.provinceId) {
			this.currentSearch.provinceId = Option.provinceId;
		}
	},
	methods: {
		/*
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
					schoolType: '2',
					pid: '0'
				});
				if (!provinceData.length) return;
				this.provinceArr = this.transformData(provinceData);
				// 获取市
				let cityData = await this.getSearchCondition({
					type: 'xzqh',
					schoolType: '2',
					pid: provinceData[0].code
				});
				if (!cityData.length) return;
				this.cityArr = this.transformData(cityData);
				// 获取学校类型与国家示范校
				let schoolType = await this.getSearchCondition({
					type: 'xxlx',
					pid: '0',
					schoolType: '2'
				});

				this.menuList[2].detailList = this.transformData(schoolType);
				let gjsfArr = await this.getSearchCondition({
					type: 'gjsf',
					pid: '0',
					schoolType: '2'
				});
				this.menuList[3].detailList = this.transformData(gjsfArr);
				this.$nextTick(() => {
					this.$refs.filter.resetMenuList(this.menuList);
				});
				if (this.params.provinceId) {
					this.setSearch(this.params.provinceId);
				}
				// 初次加载数据
				this.onLoadMore();
			} catch (err) {}
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
		onScroll() {},
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
		getData(data = { ...this.currentSearch, pageIndex: this.page.pageIndex, pageSize: this.page.pageSize }, isRefresh = false) {
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
		setSearch(provinceId) {
			// 初始省份
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
			data[0].detailList = provinceArr;
			if (provinceId) {
				this.getSearchCondition({
					type: 'xzqh',
					schoolType: '2',
					pid: provinceId
				}).then(resData => {
					let cityData = this.transformData(resData);
					data[1].detailList = cityData;
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
			}
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
				exampleSchool: result.key_4,
				token: uni.getStorageSync('token')
			};
			this.onPullDown();
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].code);
			}
		}
	}
};
</script>
<style scoped lang="scss">
.list {
	background: #ffffff;
}
</style>
