<!--国际交流合作-->
<template>
	<view>
		<view class="m-search"><uni-search-bar :radius="100" @confirm="search" /></view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height:wrapperHeight}" :loadStatus="loadStatus">
		<view class="school-list" >
			<view class="list-item" v-for="(item, index) in dataArr" :key="index">
				<view :class="['rank', 'rank' + (index + 1)]">{{ index + 1 }}</view>
				<school-list-item :showBorder="false" class="content" showType="4" :item="item" />
			</view>
		</view>
		</load-more>

	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
import schoolListItem from '@/components/vec-school-list/SchoolListItem.vue';
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: { uniSearchBar, schoolListItem ,loadMore},
	data() {
		return {
			loadStatus:'more',
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
				},{
					title: '上海市江电职业学校',
					tags: [{ name: '地区', value: '上海' }, { name: '层次', value: '高职' }],
					cards: [{ name: '民办' }, { name: '本科层次职业教育' }]
				},{
					title: '上海市江电职业学校',
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
			.select('.school-list')
			.boundingClientRect(data => {
				let height = '';
				// #ifdef APP-PLUS
				height = this.systemInfo.screenHeight - data.top - 84 + 'px';
				// #endif
				// #ifdef H5
				height = this.systemInfo.screenHeight - data.top - 50 + 'px';
				// #endif
				if (height) {
					this.wrapperHeight = height;
				}
			})
			.exec();
	},
	methods:{
		onPullDown(done){
			setTimeout(()=>{
				done();
			},2000)
		},
		onScroll(){
		},
		onLoadMore(){
			this.loadStatus = 'loading'
			// this.getData().then(()=>{
			// })
			setTimeout(() =>{
				this.loadStatus = 'more'
			}, 1000);
		},
		getData(){
			return new Promise((resolve,reject)=>{
				uni.request({
					url:'http://47.103.69.156:18089/zjq/College/GetSchoolMajorHighLightSearchList',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					},
					data:{
						token: uni.getStorageSync('token'),
						pageIndex:'1',
						pageSize:'10',
						key:'浙江'
					},
					method:'POST',
					success:({data}) => {
						if(data.code == 0){
							
						}
						console.log(data,'res')
					},
					complete() {
						resolve();
					}
				})
			})
		},
		search(){
			
		}
	}
};
</script>

<style lang="scss" scoped>
.m-search {
	padding: 0 40upx;
	background: #ffffff;
}
.school-list {
	box-sizing: border-box;
	background: #FFFFFF;
}
.list-item {
	display: flex;
	position: relative;
	align-items: center;
	padding: 0 30upx;
	border-bottom: solid 1px $main-dividing-line1;
	&:first-child {
		border-top: solid 1px $main-dividing-line1;
	}
	.rank {
		position: absolute;
		top: 45upx;
		left:145upx;
		box-sizing: border-box;
		width: 36upx;
		height: 36upx;
		padding: 2upx;
		font-size: $uni-font-size-base;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		// border: solid 1upx $main-dividing-line1;
		// background: $main-base-color;
		background: url(../../../static/indexIcon/rank.png) no-repeat;
		background-size: 100% 100%;
		color: #ffffff;
	}
	.rank1 {
		// background: #ff0000;
	}
	.rank2 {
		// background: #ffff00;
	}
	.rank3 {
		// background: #0000ff;
	}
	.content {
		box-sizing: border-box;
		width: calc(100% - 100upx);
	}
}
</style>
