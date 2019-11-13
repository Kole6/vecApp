<template>
	<view class="wy-table">
		<table>
			<tr>
				<th>项目名称</th>
				<th>项目种类</th>
				<th>奖助范围</th>
			</tr>
			<tr>
				<td>天津市中等职业学校国家助学金</td>
				<td>助学金</td>
				<td>国家级</td>
			</tr>
			<tr>
				<td>天津市中等职业学校国家助学金</td>
				<td>助学金</td>
				<td>国家级</td>
			</tr>
			<tr>
				<td>天津市中等职业学校国家助学金</td>
				<td>助学金</td>
				<td>国家级</td>
			</tr>
		</table>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
		font-size: 28upx;
	}

	.wy-table {
		table {
			width: 100%;
			border-collapse: collapse;
			text-align: center;
		}

		table td {
			border: 1px solid #cad9ea;
			color: #666;
			padding: 15upx 20upx;

		}

		table th {
			border: 1px solid #cad9ea;
			padding: 15upx 20upx;
			color: #fff;
			background-color: #199ED8;

		}

		table thead th {
			// background-color: #cce8eb;
			background-color: #199ED8;
		}
	}
</style>
