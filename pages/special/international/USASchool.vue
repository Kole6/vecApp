<!--国际交流合作-->
<template>
	<view>
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: wrapperHeight}" :loadStatus="loadStatus">
		<view class="school-list" ><school-list :isText="true" :showType="4" :listArr="dataArr"></school-list></view>
		</load-more>

	</view>
</template>

<script>
import schoolList from '@/components/vec-school-list/vec-school-list.vue';
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: { schoolList ,loadMore},
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
				},
			]
		};
	},
	mounted() {
		this.wrapperHeight = this.systemInfo.screenHeight - 80 +'px'
		// #ifdef H5
		this.wrapperHeight = this.systemInfo.screenHeight - 10 + 'px'
		// #endif
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
	}
};
</script>

<style lang="scss" scoped>

.school-list {
	margin-top: 5upx;
	box-sizing: border-box;
	background: #FFFFFF;
}
</style>
