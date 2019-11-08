	<!--国际交流合作-->
	<template>
		<view>
			<view class="m-search"><uni-search-bar :radius="100" @confirm="search" /></view>
			<view class="school-list" :style="{height:wrapperHeight}">
				<view class="list-item" v-for="(item,index) in dataArr" :key="index">
					<view :class="['rank','rank'+(index+1)]">{{index+1}}</view>
					<school-list-item :showBorder="false" class="content" showType="1" :item="item" />
				</view>
			</view>
			
		</view>
	</template>

	<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import schoolListItem from '@/pages/indexIcon/schoolDatabase/SchoolListItem.vue';
	export default {
		components: { uniSearchBar ,schoolListItem},
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
.list-item{
	display: flex;
	align-items: center;
	padding: 0 30upx;
	border-bottom: solid 1px $main-dividing-line1;
	&:first-child{
		border-top: solid 1px $main-dividing-line1;
		
	}
	.rank{
		box-sizing: border-box;
		width: 60upx;
		height: 60upx;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border: solid 1upx $main-dividing-line1;
		background: $main-base-color;
		color: #FFFFFF;
	}
	.rank1{
		background: #FF0000;
	}
	.rank2{
		background: #FFFF00;
	}
	.rank3{
		background: #0000FF;
	}
	.content{
		box-sizing: border-box;
		width: calc(100%  - 100upx);
	}
	
}
</style>
