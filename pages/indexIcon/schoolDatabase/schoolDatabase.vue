<!-- 院校库 -->
<template>
	<view>
		<view class="search">
			<uni-search-bar radius="100" clearButton="auto" @confirm="search" /></view>
		<view class="nav">
			<navigator url="/pages/indexIcon/schoolDatabase/BenkePage"><view class="nav-item">本科层次职业教育</view></navigator>
			<navigator url="/pages/indexIcon/schoolDatabase/GaozhiPage"><view class="nav-item">高职高专院校</view></navigator>
			<navigator url="/pages/indexIcon/schoolDatabase/ZhongzhiPage"><view class="nav-item">中等职业学校</view></navigator>
		</view>
		<view class="list-title">
			<image src="/static/home_icon1.png" mode="aspectFit"></image>
			<view class="hot">热门专业</view>
		</view>
		<view class="school-list"><school-list :listArr="dataArr"></school-list></view>
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolList from './SchoolList.vue';
export default {
	components: { uniSearchBar, schoolList },
	data() {
		return {
			dataArr: [
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' },]
				},
				{
					title: '河北市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
				}
			]
		};
	},
	methods: {
		search({ value }) {
			console.log(value, 'value');
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
}
.nav-item {
	width: 220upx;
	text-align: center;
	box-sizing: border-box;
	padding: 10upx;
	background: #17D8A9;
	color: #fff;
	border-radius: 20upx;
	font-size: 36upx;
	height: 110upx;
	box-shadow: 5upx 10upx 10upx rgba($color: #000000, $alpha: 0.1);
}
.list-title {
	padding: 10upx;
	margin-top: 30upx;
	background: #eaeaea;
	border-bottom: solid 1px $uni-border-color;
	border-top: solid 1px $uni-border-color;
	image {
		width: 60upx;
		height: 60upx;
		vertical-align: middle;
	}
	.hot {
		font-size: 36upx;
		display: inline-block;
		margin-left: 20upx;
	}
}
</style>
