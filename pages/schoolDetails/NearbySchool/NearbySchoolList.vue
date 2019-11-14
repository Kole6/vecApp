<template>
	<view class="wrapper">
		<school-list :isText="true" :showType="4" :listArr="dataArr"></school-list>
	</view>
</template>

<script>
	import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue';
	export default {
		components:{schoolList},
		data(){
			return{
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
		}
	}
</script>

<style scoped>
	.wrapper{
		background: #FFFFFF;
	}
</style>
