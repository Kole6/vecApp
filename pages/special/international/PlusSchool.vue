	<!--国际交流合作-->
	<template>
		<view>
			<view class="m-search"><uni-search-bar :radius="100" @confirm="search" /></view>
			<view class="school-list" :style="{height:wrapperHeight}"><school-list :isText="true" :showType="1" :listArr="dataArr"></school-list></view>
			
		</view>
	</template>

	<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
	export default {
		components: { uniSearchBar ,schoolList},
		data() {
			return {
				systemInfo:uni.getSystemInfoSync(),
				wrapperHeight:'auto',
				dataArr:[{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				},{
					title:'上海市江电职业学校'
				}]
			};
		},
		mounted(){
			// 限制列表高度
			let query = uni.createSelectorQuery().in(this)
			query.select('.school-list').boundingClientRect(data=>{
			this.wrapperHeight = this.systemInfo.screenHeight - data.top - 45 + 'px'
		}).exec()
	}
};
</script>

<style lang="scss" scoped>
.m-search {
	padding: 0 40upx;
	background: #FFFFFF;
}
.school-list{
	box-sizing: border-box;
	overflow: auto;
	padding-bottom: 50upx;
}
</style>
