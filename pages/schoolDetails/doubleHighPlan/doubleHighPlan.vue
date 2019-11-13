<template>
	<view>
		<view v-for="(item,index) in double" :key="index">
			<view class="title">
				{{item.title}}
			</view>
			<view class="content">
				<view v-for="(item2,index2) in item.list" :key="index2" class="con-txt">
					{{item2}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				double: [{
						title: '国家级教育教学试点',
						list: ['现代学徒制', '三全育人', '诊改试点', '培养士官']
					},
					{
						title: '国家级重点专业',
						list: ['国示范专业', '国骨干专业']
					},
					{
						title: '近五年全国就业创业典型',
						list: ['就业典型', '创新创业典型', '创新创业示范']
					},
					{
						title: '近五年学生国家级竞赛获奖',
						list: ['世界技能大赛', '全国技能大赛', '“互联网+”大学生创新创业大赛', '全国大学生创业计划竞赛', '“挑战杯”全国大学生课外学术科技作品竞赛']
					},
					{
						title: '教师获国家级奖励',
						list: ['万人计划教学名师', '全国高校黄大年式团队', '全国教学能力比赛']
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		margin-top: 10upx;
		font-size: 32upx;
	}

	.content {
		background-color: #FFFFFF;

		.con-txt {
			display: inline-block;
			border: 1px solid #333333;
			border-radius: 7upx;
			margin: 20upx 10upx;
			font-size: 28upx;
			padding: 5upx;
			color: #333333;
		}
	}
</style>
