<template>
	<view class="wrapper">
		<load-more ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore" :styleObj="{ height: systemInfo.screenHeight - 80 +'px'}" :loadStatus="loadStatus">
			<school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
		</load-more>

	</view>
</template>

<script>
	import loadMore from '@/components/loadMore/you-scroll.vue'
	import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
	export default {
		components:{schoolList,loadMore},
		data(){
			return{
				loadStatus:'noMore',
				systemInfo: uni.getSystemInfoSync(),
				page:{
					pageIndex:1,
					pageSize:10,
					sid:'',
				},
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
			}
		},
		onLoad(params){
			this.page.sid = params.sid || '3633000526'
			this.getData()
		},
		methods:{
			onPullDown(done){
				this.getData().then(()=>{
					done()
				})
			},
			onLoadMore(){
				this.loadStatus = 'loading'
				this.getData()
			},
			getData(){
				return new Promise((resolve,reject)=>{
					uni.request({
						url:'http://47.103.69.156:18089/zjq/College/GetLeaderInfo',
						header:{
							'content-type':'application/x-www-form-urlencoded'
						},
						data:{
							sid:this.page.sid,
							token:'d05902562e544db29bbe777954d43bb0',
							pageIndex:this.page.pageIndex,
							pageSize:this.page.pageSize
						},
						method:'POST',
						success:({data}) => {
							if(data.code == 0){
								let arr = data.data.list.map(item=>{
									return{
										...item,
										tags:item.positon.split('、')
									}
								})
								// this.dataArr = arr;
								// 是否为最后一页
								if(data.data.lastPage){
									this.loadStatus = 'noMore'
								}else{
									this.page.pageIndex++;
									this.loadStatus = 'more'
								}
							}else{
								this.loadStatus = 'noMore'
								uni.showModal({
									content:data.message,
									icon:'none'
								})
							}
						},
						complete() {
							resolve();
						}
					})
				})
			},
		}
	}
</script>

<style scoped>
	.wrapper{
		background: #FFFFFF;
	}
</style>
