<template>
	<view class="content">
		<view class="png">
			<image src="https://pic.36krcnd.com/201911/06023811/0nccc1mhji53qxzj!heading" mode="aspectFill"></image>
		</view>
		<view class="info-art">
			<text class="art-title">关于专项整治教师违规补课问题的通知</text>
			<p class="art-info">时间：2018.10.10 &nbsp;&nbsp;&nbsp;&nbsp; 来源：校园网</p>
			<text class="art-text">为深入贯彻落实习近平新时代中国特色社会主义思想和党的十九大精神，全面实施素质教育，切实减轻学生和家长负担，加强师德师风建设，进一步规范学校办学行为和教师从教行为，树立良好教育形象，根据自治区教育厅《关于进一步加强治理在职中小学教师有偿补课问题的通知》、呼和浩特市教育局《关于印发呼和浩特市规范办学行为开展中小学教师在校外培训机构兼职和有偿补课专项整治工作实施方案的通知》等文件精神，现就专项整治教师违规补课问题有关事宜通知如下：项整治教师违规补课问题有关事宜通知。</text>
		</view>
		<view class="extend">
			<view class="example-title">
				<span>延伸阅读</span>
			</view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
				<view class="scroll-view-item_H uni-bg-red">
					<image src="https://pic.36krcnd.com/201911/05050439/e5a59suvfy2f70sf!heading" mode="aspectFill"></image>
					<p class="ex-title">艺术设计专业办校园艺术大赛</p>
					<p class="ex-time">2018.07.23</p>
				</view>
				<view class="scroll-view-item_H uni-bg-red">
					<image src="https://pic.36krcnd.com/201911/06023811/0nccc1mhji53qxzj!heading" mode="aspectFill"></image>
					<p class="ex-title">第二临床医学院师生共话学业发展</p>
					<p class="ex-time">2018.07.23</p>
				</view>
				<view class="scroll-view-item_H uni-bg-red">
					<image src="https://pic.36krcnd.com/201910/31113337/dblb8niihg3y9pgb!heading" mode="aspectFill"></image>
					<p class="ex-title">艺术设计专业办校园艺术大赛</p>
					<p class="ex-time">2018.07.23</p>
				</view>
				<view class="scroll-view-item_H uni-bg-red">
					<image src="https://pic.36krcnd.com/201911/06034718/5tdyeebs8wgckl8q!heading" mode="aspectFill"></image>
					<p class="ex-title">第二临床医学院师生共话学业发展</p>
					<p class="ex-time">2018.07.23</p>
				</view>
				<view class="scroll-view-item_H uni-bg-red">
					<image src="https://pic.36krcnd.com/201911/06052619/cd2viy851dbu5tsr!heading" mode="aspectFill"></image>
					<p class="ex-title">艺术设计专业办校园艺术大赛</p>
					<p class="ex-time">2018.07.23</p>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {}
</script>

<style scoped lang="scss">
	.png {
		background-color: #fff;

		image {
			width: 750upx;
		}
	}

	.info-art {
		font-family: PingFangSC-Regular, PingFang SC;
		background-color: #fff;
		padding: 0 30upx 30upx 30upx;

		.art-title {
			font-size: 34upx;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			line-height: 70upx;
		}

		.art-info {
			font-size: 24upx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-bottom: 30upx;
		}

		.art-text {
			font-size: 26upx;
			font-weight: 400;
			color: #777;
			line-height: 33upx;
		}
	}

	.extend {
		background-color: #fff;

		.example-title {
			font-size: 34upx;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
			padding: 12px 14px;
			margin-top: 15upx;
			background-color: #fff;
		}
		.scroll-view_H {
			padding-bottom: 30upx;
			white-space: nowrap;
			width: 100%;
		}
		.scroll-view-item_H {
			display: inline-block;
			position: static;
			vertical-align: top;
			width: 320upx;
			text-align: center;
			image{
				padding-top:15upx;
				width: 260upx;
				height: 240upx;
			}
			.ex-title{
				margin: 0 auto;
				white-space:normal;
				text-align: left;
				font-size:28upx;
				color:rgba(51,51,51,1);
				line-height:38upx;
				width: 260upx;
				position: relative;
			}
			.ex-time{
				width: 260upx;
				margin: 0 auto;
				text-align: left;
				font-size:24upx;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:50upx;
			}
		}
	}
</style>
