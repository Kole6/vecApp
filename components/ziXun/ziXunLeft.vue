<template>
	<view>
		<view class="ziXun" v-for="(item,index) in infoListTest" :key="index">
			<view class="z-left">
				<image mode="aspectFill" :src="item.img" class="image1"></image>
			</view>
			<view class="z-right">
				<p class="left-title">{{item.title}}</p>
				<p class="left-text">{{`时间：2019-03-02 来源：校园网`}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoListTest: [{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06052619/cd2viy851dbu5tsr!heading",
						time: '2019-03-02',
						source: "校园网"
					},
					{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06034718/5tdyeebs8wgckl8q!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201910/31113337/dblb8niihg3y9pgb!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06023811/0nccc1mhji53qxzj!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/05050439/e5a59suvfy2f70sf!heading",
						time: '2019-03-02',
						source: "校园网"
					},
					{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06062518/dmq1wk7eun6h5kqm!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06055456/cp3o4f1m8qxdb9w7!heading",
						time: '2019-03-02',
						source: "校园网"
					},
					{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06034718/5tdyeebs8wgckl8q!heading",
						time: '2019-03-02',
						source: "校园网"
					},
					{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/05073218/3nz0iv38brbivack!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06030536/bnv4v7ckhatuy5e9!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06024231/8a6f9i75mzzzdcty!heading",
						time: '2019-03-02',
						source: "校园网"
					},
					{
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/06033623/jy7d4zpt3dn8jy6s!heading",
						time: '2019-03-02',
						source: "校园网"
					}, {
						title: "恭喜我校“六音”吉他社，荣获上海市第三届音乐会三等奖，我校月…",
						img: "https://pic.36krcnd.com/201911/05115608/4351qau8cqebkxr8!heading",
						time: '2019-03-02',
						source: "校园网"
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.ziXun {
		width: 750upx;
		height: 200upx;
		background-color: white;
		border-bottom: 1px #F8FAFF solid;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.z-right {
			padding-right: 26upx;

			.left-title {
				width: 445upx;
				height: 80upx;
				font-size: 28upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				line-height: 40upx;
			}

			.left-text {
				font-size: 20upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				margin-top: 18upx;
			}
		}

		.image1 {
			// padding-right: 30upx;
			margin-left: 26upx;
			width: 210upx;
			height: 140upx;
			border-radius: 10px;
		}
	}
</style>
