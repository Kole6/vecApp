<template>
	<view class="">
		<view class=""><sl-filter ref="filter" @conditionTap="handleConditionTap" :menuListArr="menuList" :topFixed="true" @result="handleSearch"></sl-filter></view>
		<view class="list">
			<view class="list-item" v-for="(item, index) in listArr" :key="index">
				<view class="left">{{ item.title.substr(0, 1) }}</view>
				<view class="right">
					<view class="">{{ item.title }}</view>
					<view class="tag" v-for="(tag, i) in item.tags" :key="i">{{ tag.name+':'+tag.value }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import slFilter from '@/components/sl-filter/sl-filter.vue';
import cityData from './ProvinceCity.js';
import schoolList from './SchoolList.vue';
export default {
	components: { slFilter,schoolList },
	data() {
		return {
			listArr:[{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				},
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '党委书记', value: '姜建国' }, { name: '校长', value: '姜建国' },{name:'性质',value:'综合'}]
				}],
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
					title: '学校类型',
					key: 'key_3',
					isMutiple: false,
					detailList: [
						{
							title: '全部',
							value: ''
						},
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
				},
				{
					title: '国家示范校',
					key: 'key_4',
					isMutiple: false,
					nowrap:true,
					detailList: [
						{
							title: '国家示范校',
							value: '1'
						},
						{
							title: '国家骨干校',
							value: '2'
						},
						{
							title: '高水平学校',
							value: '3'
						}
					]
				}
			]
		};
	},
	created(){
		// this.initSearch();
	},
	onLoad(Option) {
		if (Option.province) {
			this.setSearch(Option.province);
		}else{
			this.setSearch()
		}
	},
	methods: {
		setSearch(provinceName) {
			// 初始省份
			let  index = 0,
				provinceArr = cityData.map((item,idx)=> {
					if(provinceName === item.title){
						index = idx
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
			if(provinceName){
				data[0].defaultSelectedIndex = index
				data[1].detailList = cityData[index].children
				if(cityData[index].children.length === 1){
					data[1].defaultSelectedIndex = 0
				}
			}
			this.$nextTick(() => {
				this.$refs.filter.resetMenuList(data);
			});
		},
		handleSearch(result) {
			if(!result.key_2){
				uni.showToast({
				    title: '请选择具体城市',
				    duration: 2000,
					icon:'none'
				})
			}
		},
		handleConditionTap({ key, list, index }) {
			// 选择省份的时候进行城市赋值
			if (key == 'key_1') {
				this.setSearch(list[index].title)
			}
		}
	}
};
</script>
<style scoped lang="scss">
	.list-item{
		padding: 30upx;
		border-bottom: solid 1px $uni-border-color;
		.left{
			display: inline-flex;
			width:120upx;
			height:120upx;
			border-radius: 60upx;
			background: #4CD964;
			vertical-align: middle;
			align-items: center;
			justify-content: center;
			font-size: 50upx;
		}
		.right{
			display: inline-block;
			width: 550upx;
			vertical-align: middle;
			margin-left: 20upx;
			.tag{
				display: inline-block;
				font-size: 20upx;
				padding: 0 10upx;
				border-right: solid 1px $uni-border-color;
			}
			.tag:last-child{
				border: none;
			}
		}
	}
</style>
