<!--国际交流合作-->
<template>
	<view>
		<!-- <view class="m-search"><uni-search-bar :radius="100" @confirm="search" /></view> -->
		<view class="" style="height: 20upx;"></view>
		<view class="nav">
			<navigator url="./USASchool">
				<view class="nav-item nav-item-1"><text>中美合作学校</text></view>
			</navigator>
			<navigator url="./PlusSchool">
				<view class="nav-item nav-item-2"><text>中加合作学校</text></view>
			</navigator>
		</view>
		<view class="list-title">
			<view class="hot">热门学校</view>
			<image class="hot-img" src="/static/indexIcon/hot.png" mode="aspectFit"></image>
		</view>
		<view class="school-list" :style="{ height: wrapperHeight }"><school-list :isText="true" :showType="4" :listArr="dataArr"></school-list></view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
export default {
	components: { uniSearchBar, schoolList },
	data() {
		return {
			systemInfo: uni.getSystemInfoSync(),
			wrapperHeight: 'auto',
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
				},
			]
		};
	},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.school-list')
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
	}
};
</script>

<style lang="scss" scoped>
.m-search {
	padding: 0 40upx;
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
@for $i from 1 through 2 {
	.nav-item-#{$i} {
		background: url('../../../static/indexIcon/hzbx-bg'+$i+'.png') no-repeat;
		background-size: 100% 100%;
	}
}
.list-title {
	padding: 10upx;
	margin-top: 20upx;
	background: #eaeaea;
	background: #ffffff;
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
		line-height: 1.2;
	}
	.hot-img {
		width: 28upx;
		height: 28upx;
		vertical-align: middle;
		margin-left: 10upx;
	}
}
.school-list {
	box-sizing: border-box;
	overflow: auto;
	padding-bottom: 50upx;
	background: #FFFFFF;
}
</style>
