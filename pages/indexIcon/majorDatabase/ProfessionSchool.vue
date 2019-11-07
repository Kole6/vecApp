<template>
	<view :style="styleObj">
		<!-- 专业信息-专业介绍 -->
		<view class="top">
			<view class="top-btn" @tap="handleRouter({ url: './ProfessionDesc' }, true)">专业介绍</view>
			<view class="top-btn active">开设学校</view>
		</view>
		<view class="f-filter">	
			<!-- <my-filter  ref="myfilter" ></my-filter> -->
			<sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" :topFixedHeight="topFixedHeight" @result="handleSearch"></sl-filter>
		</view>
		<view class="m-result">
			<school-list :listArr="dataArr" ref="aaa">
			</school-list>
		</view>
		<view class="m-simi">
			<view class="title">相近专业</view>
		</view>
		<view class="list">
			<school-list :listArr="listArr" :isText="true" />
		</view>
		
	</view>
</template>

<script>
	
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from '@/pages/indexIcon/schoolDatabase/ProvinceCity.js';
// import myFilter from '@/pages/indexIcon/majorDatabase/filter.vue';
import testCom from '@/components/sl-filter/filter.vue';
import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
export default {
	components:{slFilter,schoolList},
	data() {
		return {
			topFixedHeight:'44px',
			styleObj:{
				'overflow':'auto'
			},
			dataArr: [
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
				},
				{
					title: '河北市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
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
					detailList: [{
						title:'全部',
						value:''
					}]
				},
				{
					title: '学校属性',
					key: 'key_3',
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
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' }, { name: '性质', value: '综合' }]
				}
			]
		};
	},
	onLoad(Option) {
		// #ifdef APP-PLUS
		this.topFixedHeight='44px',
		// #endif
		// #ifdef H5
		this.topFixedHeight='99px',
		// #endif
		this.$set(this.styleObj,'height',uni.getSystemInfoSync().windowHeight + 'px' )
		this.$nextTick(()=>{
			this.setSearch()
		})
	},
	methods: {
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

<style scoped lang="scss">
@import './common.scss';
.list-item {
	padding: 30upx;
	border-bottom: solid 1px $uni-border-color;
	.left {
		display: inline-flex;
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		background: #4cd964;
		vertical-align: middle;
		align-items: center;
		justify-content: center;
		font-size: 50upx;
	}
	.right {
		display: inline-block;
		width: 550upx;
		vertical-align: middle;
		margin-left: 20upx;
		.tag {
			display: inline-block;
			font-size: 28upx;
			padding: 0 10upx;
			border-right: solid 1px $uni-border-color;
		}
		.tag:last-child {
			border: none;
		}
	}
}
.m-result{
	margin-top: 1px;
}

</style>
