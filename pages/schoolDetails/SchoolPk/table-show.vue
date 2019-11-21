<template>
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
</template>

<script>
export default {
	props: {
		tableHeight: String,
		tableWidth: String,
		dataObj: Object
	}
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
$div-table-border-color: #666;
$div-table-border-width: 1upx;

.div-table {
	display: table;
	width: 100%;
	height: 100%;
	border: $div-table-border-width solid $div-table-border-color;
	box-sizing: border-box;
	table-layout: fixed;
	position: relative;
	.celspan {
		display: table;
		width: 100%;
		height: 100%;
		.td {
			display: table-cell;
			border: none !important;
		}
		.td + .td {
			border-left: $div-table-border-width solid $div-table-border-color !important;
		}
	}
	.rowspan {
		display: table;
		width: 100%;
		height: 100%;
		.tr {
			display: table-row;
			border: none !important;
		}
	}

	&.fixed-thead {
		.tbody,
		.thead,
		.tr,
		.th,
		.td {
			display: block;
		}
		.tr,
		.th {
			&:after {
				content: '';
				display: block;
				visibility: hidden;
				clear: both;
				height: 0;
			}
		}
		.td {
			float: left;
			width: 33.33%;
		}
		.tbody {
			height: 400upx;
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

	.tr,
	.th {
		display: table-row;
		& + .tr,
		& + .th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
				word-break: break-word;
			}
		}
	}
	.rowspan {
		.tr,
		.th {
			display: table-row;
			.td,
			.th {
				border: none;
			}
			& + .tr,
			& + .th {
				.td,
				.th {
					border-top: $div-table-border-width solid $div-table-border-color;
				}
			}
		}
	}
	.td {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		box-sizing: border-box;
		padding: 10upx;
		&.noPadding {
			padding: 0;
		}
		& + .td {
			border-left: $div-table-border-width solid $div-table-border-color;
		}
	}
	.th .td {
		font-weight: bold;
	}
	.tbody {
		display: table-row-group;
	}
	.thead {
		display: table-header-group;
		.tr,
		.th {
			.td,
			.th {
				border-bottom: $div-table-border-width solid $div-table-border-color;
			}
		}
	}
	.tfoot {
		display: table-footer-group;
		.tr,
		.th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
			}
		}
	}
	.colgroup {
		display: table-column-group;
	}
	.col {
		display: table-column;
	}
	.caption {
		display: table-caption;
	}
}
</style>
