<!-- 院校库 -->
<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="" style="height: 35px;background: #FFFFFF;"></view>
		<!-- #endif -->
		<uni-nav-bar @click-left="handleBack" left-icon="arrowleft" :shadow="false" :border="false">
			<uni-search-bar style="width: 100%;" :radius="100" @confirm="search" :isDisabled="true" clearButton="always" @searchClick="handleSearchTap" />
		</uni-nav-bar>
		<view class="nav">
			<navigator url="/pages/indexIcon/schoolDatabase/BenkePage">
				<view class="nav-item nav-item-1"><text>本科层次职业教育</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/schoolDatabase/GaozhiPage">
				<view class="nav-item nav-item-2"><text>高职高专院校</text></view>
			</navigator>
			<navigator url="/pages/indexIcon/schoolDatabase/ZhongzhiPage">
				<view class="nav-item nav-item-3"><text>中等职业学校</text></view>
			</navigator>
		</view>
		<view class="list-title">
			<view class="hot">热门专业</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit"></image>
		</view>
		<view class="school-list" :style="{ height: wrapperHeight }"><school-list :isText="true" :showType="4" :listArr="dataArr"></school-list></view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from './SchoolList.vue';
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
export default {
	components: { uniSearchBar, schoolList, uniNavBar },
	data() {
		return {
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
			dataArr: [
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
			]
		};
	},
	onNavigationBarSearchInputClicked() {
		console.log(arguments, 'arg');
	},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.school-list')
			.boundingClientRect(data => {
				this.wrapperHeight = this.systemInfo.screenHeight - data.top + 'px';
			})
			.exec();
	},
	methods: {
		search({ value }) {
			console.log(value, 'value');
		},
		handleBack() {
			uni.navigateBack();
		},
		handleSearchTap() {
			uni.navigateTo({
				url: './SearchResult'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.search {
	padding: 10upx 50upx;
}
.nav {
	display: flex;
	justify-content: space-around;
	padding: 35upx 0;
	background: #ffffff;
}
.nav-item {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;

	width: 220upx;
	text-align: center;
	box-sizing: border-box;
	padding: 20upx 40upx;
	color: #fff;
	border-radius: 20upx;
	font-size: $uni-font-size-lg;
	background: $main-base-color;
	height: 180upx;
	box-shadow: 5upx 10upx 10upx rgba($color: #000000, $alpha: 0.1);
}
@for $i from 1 through 3 {
	.nav-item-#{$i} {
		background: url('../../../static/indexIcon/bg'+$i+'.png');
		background-size: 100% 100%;
	}
}
.list-title {
	padding: 10upx;
	margin-top: 20upx;
	background: #ffffff;
	border-bottom: solid 1upx $main-dividing-line1;
	image {
		width: 60upx;
		height: 60upx;
		vertical-align: middle;
	}
	.hot {
		font-size: $uni-font-size-lg;
		display: inline-block;
		margin-left: 20upx;
		font-weight: bold;
		color: #333333;
	}
	.hot-img {
		width: 28upx;
		height: 28upx;
		vertical-align: middle;
	}
}
.school-list {
	background: #ffffff;
	overflow: auto;
}
</style>
