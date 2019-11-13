<template>
	<view>
		<!-- 专业对比 -->
		<!-- 已选中的对比专业 -->
		<view class="m-btn-group"><view class="f-btn">添加学校</view></view>
		<view class="">
			<checkbox-group @change="checkboxChange">
				<view class="uni-list-cell uni-list-cell-pd list-item" v-for="(item, index) in CheckedListArr" :key="index">
					<checkbox :value="item.value" :checked="item.checked" />
					<school-list-item :showBorder="false" class="list-content" showType="4" :item="item" :handleTaped="handleTaped" />
				</view>
			</checkbox-group>
		</view>
		<!-- 可以选择的对比列表 -->
		<view class="m-card">
			<view :class="['card-item', activeIndex == 1 ? 'active' : '']" @click="activeIndex = 1">热门专业</view>
			<view :class="['card-item', activeIndex == 2 ? 'active' : '']" @click="activeIndex = 2">我的关注</view>
		</view>
		<view class="">
			<view class="uni-list m-bottom-list" :style="{ height: wrapperHeight, overflow: 'auto' }">
				<checkbox-group @change="checkboxChange">
					<view class="uni-list-cell uni-list-cell-pd list-item" v-for="(item, index) in listArr" :key="index">
						<checkbox :value="item.value" :checked="item.checked" />
						<school-list-item :handleTaped="handleTaped" :showBorder="false" class="list-content" showType="4" :item="item" />
					</view>
				</checkbox-group>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom" @tap="handleRouter"><text>开始对比</text></view>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
export default {
	components: {
		uniSwipeAction,
		schoolListItem
	},
	data() {
		return {
			wrapperHeight: 'auto',
			systemInfo: uni.getSystemInfoSync(),
			activeIndex: 1,
			options: [
				{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			title: 'checkbox 复选框',
			items: [
				{
					value: 'USA',
					name: '美国'
				},
				{
					value: 'CHN',
					name: '中国',
					checked: 'true'
				},
				{
					value: 'BRA',
					name: '巴西'
				},
				{
					value: 'JPN',
					name: '日本'
				},
				{
					value: 'ENG',
					name: '英国'
				},
				{
					value: 'FRA',
					name: '法国'
				}
			],
			CheckedListArr: [
				{
					value: '111',
					checked: true,
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				}
			],
			listArr: [
				{
					value: '001',
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					value: '002',
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					value: '003',
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					value: '004',
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},
				{
					value: '005',
					title: '北京电子科技职业技术学院',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				}
			]
		};
	},
	mounted() {
		// 限制列表高度
		let query = uni.createSelectorQuery().in(this);
		query
			.select('.m-bottom-list')
			.boundingClientRect(data => {
				let height = '';
				// #ifdef APP-PLUS
				height = this.systemInfo.screenHeight - data.top - 154 + 'px';
				// #endif
				// #ifdef H5
				height = this.systemInfo.screenHeight - data.top - 110 + 'px';
				// #endif
				if (height) {
					this.wrapperHeight = height;
				}
			})
			.exec();
	},
	methods: {
		handleTaped(arg){
			console.log(arg,'arg')
		},
		checkboxChange(event) {
		},
		handleSwipeChange() {},
		handleChecked(item, index) {
			this.$set(item, 'checked', !item.checked);
		},
		handleRouter() {
			uni.navigateTo({
				url:'./SchoolPkDetail'
			})
		}
	}
};
</script>

<style scoped lang="scss">
.m-btn-group {
	text-align: center;
	padding: 15upx 0;
	.f-btn {
		display: inline-block;
		width: 300upx;
		padding: 10upx 50upx;
		background: $main-base-color;
		color: #ffffff;
		border-radius: 10upx;
	}
}
.m-bottom {
	position: fixed;
	bottom: 0;
	font-size: $uni-font-size-lg + 5;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20upx 0;
	background: $main-base-color;
	color: #ffffff;
	width: 100%;
	z-index: 10;
}
.m-card {
	box-sizing: border-box;
	width: 100%;
	padding: 10upx 20upx;
	display: flex;
	font-size: $uni-font-size-lg;
	.card-item {
		padding: 10upx;
	}
	.card-item:last-child {
		margin-left: 20upx;
	}
	.card-item.active {
		color: $main-base-color;
		border-bottom: solid 3upx $main-base-color;
	}
}
.list-item {
	margin-bottom: 10upx;
	padding-left: 25upx;
}
.list-content {
	display: inline-block;
	width: calc(100% - 120upx);
}
.m-bottom-list {
	padding-bottom: 100upx;
}
</style>
