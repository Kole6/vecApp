<template>
	<view>
		<!-- 专业对比 -->
		<!-- 已选中的对比专业 -->
		<view class="m-btn-group">
			<view class="f-btn">添加专业</view>
		</view>
		<view class="">
			<checkbox-group @change="checkboxChange">
				<view class="uni-list-cell uni-list-cell-pd list-item" v-for="(item, index) in CheckedListArr" :key="index">
					<checkbox :value="item.value" :checked="item.checked" />
					<view class="list-content" @tap="handleChecked(item,index)">
						<view class="left">{{ item.title.substr(0, 1) }}</view>
						<view class="right">
							<view class="title">{{ item.title }}</view>
							<scroll-view scroll-x="true">
								<view class="tag tag-text" v-for="(tag, i) in item.tags" :key="i">{{ tag.name + ':' + tag.value }}</view>
							</scroll-view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<!-- 可以选择的对比列表 -->
		<view class="m-card">
			<view :class="['card-item', activeIndex == 1 ? 'active' : '']" @click="activeIndex = 1">热门专业</view>
			<view :class="['card-item', activeIndex == 2 ? 'active' : '']" @click="activeIndex = 2">我的关注</view>
		</view>
		<view class="">
			<view class="uni-list m-bottom-list">
				<checkbox-group @change="checkboxChange">
					<view class="uni-list-cell uni-list-cell-pd list-item" v-for="(item, index) in listArr" :key="index">
						<checkbox :value="item.value" :checked="item.checked" />
						<view class="list-content" @tap="handleChecked(item,index)">
							<view class="left">{{ item.title.substr(0, 1) }}</view>
							<view class="right">
								<view class="title">{{ item.title }}</view>
								<scroll-view scroll-x="true">
									<view class="tag tag-text" v-for="(tag, i) in item.tags" :key="i">{{ tag.name + ':' + tag.value }}</view>
								</scroll-view>
							</view>
						</view>
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
export default {
	components: {
		uniSwipeAction
	},
	data() {
		return {
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
			CheckedListArr:[
				{
					value: '111',
					checked:true,
					title: '汽车运用于维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '957698' }, { name: '层次', value: '高职' }]
				}
			],
			listArr: [
				{
					value: '001',
					title: '汽车运用于维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '957698' }, { name: '层次', value: '高职' }]
				},
				{
					value: '002',
					title: '汽车运用于维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '957698' }, { name: '层次', value: '高职' }]
				},
				{
					value: '003',
					title: '汽车运用于维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '957698' }, { name: '层次', value: '高职' }]
				},
				{
					value: '004',
					title: '汽车运用于维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '957698' }, { name: '层次', value: '高职' }]
				},
				{
					value: '005',
					title: '汽车运用于维护',
					tags: [{ name: '专业大类', value: '交通运输类' }, { name: '代码', value: '957698' }, { name: '层次', value: '高职' }]
				}
			]
		};
	},
	methods: {
		checkboxChange() {
			console.log(arguments,'arg')
		},
		handleSwipeChange() {},
		handleChecked(item,index){
			this.$set(item,'checked',!item.checked)
		},
		handleRouter(){
			uni.navigateTo({
				url:'./ProfessionPKDetail'
			})
		}
	}
};
</script>

<style scoped lang="scss">
@import  './profession.scss';
</style>
