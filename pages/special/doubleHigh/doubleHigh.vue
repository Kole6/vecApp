<template>
	<view>
		<view class="m-search">
			<uni-search-bar :radius="100" @confirm="search"/>
		</view>
		<view class="" style="height: 51px;"></view>
		<view class="">
			<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter>
		</view>
		<view class="list"><school-list :listArr="listArr" showType="4"></school-list></view>
		<uni-drawer :visible="showDrawer" mode="right" @close="handleClose">
			<view class="m-title">筛选标签</view>
			<!-- 筛选项 -->
			<view class="m-drawer-content">
				<view class="item-list" v-for="(item, index) in tagList" :key="index">
					<view class="item-title">
						<text :class="{ item: true, selected: tag.selected }" v-for="(tag, i) in item.titleList" :key="i" @tap="tag.selected = !tag.selected">{{ tag.name }}</text>
					</view>
					<view class="item-wrapper">
						<text v-for="(tag, i) in item.list" :key="i" :class="{ item: true, selected: tag.selected }" @tap="tag.selected = !tag.selected">{{ tag.name }}</text>
					</view>
				</view>
			</view>
			<view class="m-btn-group">
				<view class="left-btn" @tap="handleReset">重置</view>
				<view class="right-btn" @tap="handleConfirm">确定</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from '@/pages/indexIcon/schoolDatabase/ProvinceCity.js';
import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
export default {
	components: { uniDrawer, slFilter, schoolList ,uniSearchBar },
	onNavigationBarButtonTap(option) {
		this.showDrawer = true;
	},
	data() {
		return {
			showDrawer: false,
			tagList: [
				{
					titleList: [
						{
							name: '国家级教育试学试点',
							selected: false
						}
					],
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
					titleList: [
						{
							name: '国家级教育试学试点',
							selected: false
						}
					],
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
					titleList: [
						{
							name: '国家级教育试学试点',
							selected: false
						}
					],
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
			listArr: [
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
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
					detailList: [
						{
							title: '全部',
							value: ''
						}
					]
				},
				{
					title: '学校属性',
					key: 'key_3',
					isMutiple: false,
					nowrap: true,
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
	onLoad(Option) {
		// #ifdef APP-PLUS
		this.topFixedHeight='44px',
		// #endif
		// #ifdef H5
		this.topFixedHeight='94px',
		// #endif
		this.setSearch();
	},
	methods: {
		handleClose() {
			this.showDrawer = false;
		},
		handleReset() {
			this.tagList.forEach(item => {
				item.titleList.forEach(tag => {
					tag.selected = false;
				});
				item.list.forEach(tag => {
					tag.selected = false;
				});
			});
		},
		handleConfirm() {
			this.showDrawer = false;
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
		handleSearch(result) {
			console.log(result, 'result');
			if (!result.key_2) {
				uni.showToast({
					title: '请选择具体城市',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].title);
			}
		},
		search(){
			
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
}
.m-title {
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 10;
	padding: 30upx 0;
	text-align: center;
	font-size: $uni-font-size-lg + 5;
	font-weight: bold;
	background: #ffffff;
}
.m-drawer-content {
	height: 100vh;
	overflow: auto;
	box-sizing: border-box;
	padding-top: 80upx + $uni-font-size-lg;
	padding-bottom: 50upx + $uni-font-size-lg;
	background: #ffffff;
	.item-list {
		box-sizing: border-box;
		border-top: solid 1upx #cccccc;
		font-size: $uni-font-size-base;
		padding-bottom: 20upx;
		.item-title {
			padding-left: 30upx;
		}
		.item-wrapper {
			padding-left: 90upx;
		}
		.item {
			display: inline-block;
			padding: 10upx 20upx;
			margin-right: 20upx;
			margin-top: 20upx;
			background: #fff;
			color: #333;
			border: solid 1upx $main-border-light-color;
			border-radius: 10upx;
		}
		.item.selected {
			color: #ffffff;
			background: $main-base-color;
		}
	}
}
.m-btn-group {
	position: absolute;
	bottom: 0;
	width: 100%;
	background: #ffffff;
	z-index: 10;
	.left-btn,
	.right-btn {
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: $uni-font-size-lg;
		width: 50%;
		padding: 25upx 0;
		border-top: solid 1upx #ccc;
	}
	.left-btn {
		border-right: solid 1upx #ccc;
	}
	.right-btn {
		background: #4cd964;
		color: #ffffff;
	}
}
</style>