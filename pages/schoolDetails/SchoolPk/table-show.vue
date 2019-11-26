<template>
	<view v-if="show">
	<view>
		<view class="t-table" :style="{ height: tableHeight, width: tableWidth }">
			<view class="t-row t-title">
				<view class="t-th">学校名称</view>
				<view class="t-th" v-for="(item, index) in dataObj.title.data" :key="index">{{ item }}</view>
			</view>
			<view class="t-row" v-for="(row, index) in dataObj.dataArr" :key="index">
				<view class="t-td">{{ row.name }}</view>
				<view class="t-td" v-for="(item, i) in row.data" :key="i">{{ item }}</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
export default {
	props: {
		tableHeight: String,
		tableWidth: String,
		dataObj: Object,
		showType: [String, Number]
	},
	watch:{
		tableHeight(){
			this.refresh();
		}
	},
	data(){
		return{
			show:true,
		}
	},
	methods:{
		refresh(){
			this.show = false;
			this.$nextTick(()=>{
				this.show = true;
			})
		}
	},
};
</script>

<style scoped lang="scss">
.t-table {
	box-sizing: border-box;
	width: 100%;
	padding: 0 10upx;
	overflow: auto;
	$border-color: #fff;
	.t-title {
		position: sticky;
		top: 0;
		background: #ffffff;
		z-index: 10;
		padding: 0;
		color: #666666;
	}
	.t-row {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		color: #666666;
		.t-td,
		.t-th {
			box-sizing: border-box;
			flex: 1;
			padding: 35upx 10upx;
			font-size: $uni-font-size-base;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			// border-top: solid 1px $border-color;
			// border-left: solid 1px $border-color;
		}
		.t-td:nth-of-type(even),
		.t-th:nth-of-type(even) {
			background-color: #f3f7ff;
		}
		.t-td:last-child,
		.t-th:last-child {
			// border-right: solid 1px $border-color;
		}
	}
	.t-row:last-child {
		.t-td,
		.t-th {
			// border-bottom: solid 1px $border-color;
		}
	}
}
.wrap {
	margin: 20upx;
}

</style>
