<template>
	<view v-if="show">
		
	<view v-if="showType == '1'">
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
	<view v-else>
		<view :style="{ height: tableHeight,overflow:'auto',position:'relative'}">
			<view class="div-table m-fixed">
				<view class="thead">
					<view class="tr">
						<view class="td" v-for="(item,index) in titleData" :key="index">{{item}}</view>
					</view>
				</view>
			</view>
			<view class="div-table" >
				<view class="tbody">
					<view class="tr" v-for="(level1,index1) in listArr" :key="index1">
						<view class="td">
							{{level1.title}}
						</view>
						<!-- 二级标签设置 -->
						<view :class="{'td':true,noPadding:level1.hasChild}">
							<block v-if="level1.hasChild">
								<view class="rowspan">
									<view class="tr" v-for="(level2,index2) in level1.children" :key='index2'><view class="td">{{level2}}</view></view>
								</view>
							</block>
							<block v-else>
								-
							</block>
							
						</view>
						<!-- 学校数据 -->
						<block v-if="level1.hasChild">
							<view class="td noPadding" v-for="(level2,index2) in level1.data" :key="index2+'***'">
								<view class="rowspan">
									<view class="tr" v-for="(level2data,index3) in level2" :key="index3+'---'"><view class="td">{{level2data}}</view></view>
								</view>
							</view>

						</block>
						<block v-else>
							<view class="td" v-for="(level2data,index2) in level1.data" :key="index2">{{level2data}}</view>
						</block>
					</view>
					
				</view>
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
			console.log('===')
			this.refresh();
		}
	},
	data(){
		return{
			show:true,
			titleData:['一级标签','二级标签','上海市江电职业技术学校','上海市江电职业技术学校'],
			listArr: [{
					title: '主持国家级专业教学资源',
					hasChild: false,
					data: [2, '-']
				}, {
					title: '国家级教育教学试点',
					hasChild: true,
					children: ['现代学徒', '三权育人', '诊改', '培养士官'],
					data: [['-', 32, '-', '-'], ['-', '-', '45', '25']]
				}, {
					title: '国家级重点专业',
					hasChild: true,
					children: ['国示范专业', '国骨干专业'],
					data: [['-', 25], ['-', 32]]
				}, {
					title:'近五年国家就业创业典型',
					hasChild:true,
					children:['就业典型','创新就业典型','创新就业示范'],
					data:[['-','-','-'],['-','-','-']]
				},{
					title:'近五年学生国家级竞赛获奖',
					hasChild:true,
					children:['世界技能大赛','全国技能大赛',`"互联网+"大学生创业创新大赛`,`"挑战杯"全国大学生课外学术科技作品竞赛`,'全国大学生创业计划竞赛'],
					data:[['-','-','-','-','-'],['-','-','-','-','-']]
				},{
					title:'教师获国家级奖励',
					hasChild:true,
					children:['万人计划学校名师','全国高校黄大年式团队','全国教学能力比赛'],
					data:[['-','-','-'],['-','-','-']]
				},{
					title:'近五年承办全国职业院校技能大赛',
					hasChild:false,
					data:['-','-']
				},{
					title:'近五年连续发布质量年报且无负面',
					hasChild:false,
					data:['-','-']
				}
			]
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
$div-table-border-width: 1upx;

.div-table {
	box-sizing: border-box;
	table-layout: fixed;
	display: table;
	width: 100%;
	padding: 0 20upx;
	height: 100%;
	position: relative;
	overflow:auto;
	.celspan {
		display: table;
		width: 100%;
		height: 100%;
		.td {
			display: table-cell;
			border: none !important;
		}
	}
	.rowspan {
		display: table;
		width: 100%;
		height: 100%;
		.tr {
			display: table-row;
			.td{
					padding: 0;
					height: 80px;
					border: none;
					border-bottom: solid 1upx $main-dividing-line1;
			}
			&:last-child{
				.td{
					border: none;
				}
			}
		}
	}
	.tr{
		display: table-row;
		
	}

	.td {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		box-sizing: border-box;
		padding: 10upx;
		word-break: break-word;
		color: #666666;
		font-size: $uni-font-size-base;
		border-left: solid 1upx $main-dividing-line1;
		border-top: solid 1upx $main-dividing-line1;
		&.noPadding {
			padding: 0;
		}
		& + .td {
		}
	}
	.td:nth-of-type(even){
		background-color: #f3f7ff;
	}
	.tbody {
		display: table-row-group;
		&>.tr:last-child>.td{
			border-bottom: solid 1upx $main-dividing-line1;
		}
	}
	.thead {
		display: table-header-group;
		.tr{
			.td{
				background: #FFFFFF;
			}
			.td:nth-of-type(even){
				background-color:#f3f7ff ;
			}
		}
	}
}
.m-fixed{
	position: sticky;
	top: 0;
	z-index: 10;
}
</style>
