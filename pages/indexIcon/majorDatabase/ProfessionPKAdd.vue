<template>
	<view>
		<!-- 专业对比 -->
		<!-- 已选中的对比专业 -->
		<view class="m-message"><message-info :message="searchResultMessage" :isShow.sync="isShowMessage" @close="handleMessageClose"></message-info></view>
		<view class="m-search"><uni-search-bar radius="100" clearButton="auto" @confirm="search" /></view>

		<!-- 可以选择的对比列表 -->
		<view class="m-card">
			<view :class="['card-item', activeIndex == 1 ? 'active' : '']" @tap="handleTab(1)">我的关注</view>
			<view :class="['card-item', activeIndex == 2 ? 'active' : '']" @tap="handleTab(2)">热门专业</view>
		</view>
		<view class="wrapper" :style="{ height: wrapperHeight, overflow: 'auto' }">
			<view class="list-item" v-for="(item, index) in listArr" :key="index">
				<view class="flag">
					<block v-if="item.hasSelected">
						<view class="selecting"></view>
					</block>
					<block v-else>
						<image src="/static/indexIcon/selected.png" mode="aspectFit" style="height: 36upx; width:36upx"></image>
					</block>
				</view>
				<school-list-item :item="item" :showType="4" :is-special="true" :handleTaped="false" @taped="handleListTaped(item)"></school-list-item>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left">退出</view>
			<view class="right"  @tap="handleRouter">开始对比</view>
		</view>
	</view>
</template>

<script>
import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import messageInfo from '@/pages/indexIcon/schoolDatabase/messageInfo.vue';
export default {
	components: {
		schoolListItem,
		uniSearchBar,
		messageInfo
	},
	data() {
		return {
			searchResultMessage: '已添加3个专业到对比库',
			isShowMessage: true,
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			activeIndex: 1,

			listArr: [
				{
					hasSelected: true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: true,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				},
				{
					hasSelected: false,
					title: '汽车运用与维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
					cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
				}
			]
		};
	},
	mounted() {
		this.calcScrollHeight()
	},
	methods: {
		handleTab(tabIndex) {
			this.activeIndex = tabIndex;
			if (tabIndex == 1) {
				this.listArr = [
					{
						hasSelected: true,
						title: '汽车运用与维护',
						tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
						cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
					}
				];
			} else if (tabIndex == 2) {
				this.listArr = [
					{
						hasSelected: false,
						title: '汽车运用与维护',
						tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
						cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
					},
					{
						hasSelected: false,
						title: '汽车运用与维护',
						tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
						cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
					},
					{
						hasSelected: true,
						title: '汽车运用与维护',
						tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '0825001234' }],
						cards: [{ name: '学历层次', value: '高职' }, { name: '专业年限', value: '3年' }]
					}
				];
			}
		},
		handleListTaped(item) {
			item.hasSelected= !item.hasSelected
		},
		handleMessageClose() {
			this.isShowMessage = false;
			this.calcScrollHeight();
		},
		search(value) {
			console.log(value);
		},
		handleChecked(item, index) {
			this.$set(item, 'checked', !item.checked);
		},
		handleRouter() {
			uni.navigateTo({
				url:'./ProfessionPK'
			})
		},
		calcScrollHeight() {
			setTimeout(() => {
				// 限制列表高度
				let query = uni.createSelectorQuery().in(this);
				query
					.select('.wrapper')
					.boundingClientRect(data => {

					 	let height = this.systemInfo.screenHeight - data.top - uni.upx2px(200) ;
						// #ifdef APP-PLUS
							height = height - 30
						// #endif
						this.wrapperHeight = height + 'px'
					})
					.exec();
			}, 300);
		}
	}
};
</script>

<style scoped lang="scss">
// @import  './profession.scss';
.m-search {
	padding: 20upx 32upx;
}
.m-card {
	display: flex;
	justify-content: space-between;
	align-content: center;
	padding: 0 110upx;
	background: #ffffff;
	.card-item {
		box-sizing: border-box;
		padding: 21upx 10upx;
		font-size: $uni-font-size-lg;
		color: $main-text-color;
	}
	.card-item.active {
		border-bottom: solid 4upx $main-base-color;
		color: $main-base-color;
	}
}
.m-bottom {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	font-size: $uni-font-size-lg + 5;
	display: flex;
	justify-content: center;
	align-items: center;
	// padding: 20upx 0;
	// background: $main-base-color;
	// color: #ffffff;
	width: 100%;
	z-index: 10;
	border-top: solid 1upx $main-dividing-line1;
	.left {
		width: 324upx;
		text-align: center;
		padding: 25upx 0;
		color: #666666;
		background: #ffffff;
	}
	.right {
		width: 426upx;
		text-align: center;
		background: $main-base-color;
		padding: 25upx 0;
		color: #ffffff;
	}
}
.list-item {
	background: #ffffff;
	position: relative;
	&:first-child {
		border-top: solid 1upx $main-dividing-line1;
	}
	.flag {
		position: absolute;
		z-index: 2;
		top: 26upx;
		right: 29upx;
		width: 36upx;
		height: 36upx;
		.selecting {
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: solid 1upx $main-dividing-line1;
			background: #ffffff;
		}
	}
}
</style>
