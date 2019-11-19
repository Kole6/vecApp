<template>
	<view class="">
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: systemInfo.screenHeight - 80 +'px'}" :loadStatus="loadStatus">
		<view class="list">
			<school-list showType="4" :listArr="dataArr" />
			</view>
		</load-more>
	</view>
</template>

<script>

import schoolList from './SchoolList.vue';
import {schoolData} from '../mockData.js'
import loadMore from '@/components/loadMore/you-scroll.vue'
export default {
	components: { schoolList ,loadMore},
	data() {
		return {
			dataArr: [...schoolData,...schoolData],
			loadStatus:'more',
			systemInfo: uni.getSystemInfoSync(),
		};
	},
	mounted() {
		// uni.setNavigationBarTitle({
		// 　　title:'测试标题'
		// })
	},
	methods: {
		onPullDown(done){
			setTimeout(()=>{
				this.dataArr = schoolData
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
				this.dataArr=[...this.dataArr,...schoolData]
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
						token:'d05902562e544db29bbe777954d43bb0',
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

<style scoped lang="scss">
.search {
	padding: 5upx 30upx;
	border-bottom: solid 1px $uni-border-color;
}
.list{
	background: #FFFFFF;
}
</style>
