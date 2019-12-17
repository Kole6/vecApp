<template>
	<view class="content">
		<view class="have-data" v-if="haveData">
			<QSTabs ref="tabs" :current="current" :tabs="tabs" width="375" swiperWidth="750" activeColor="#6451FC"
			 backgroundColor="#fff" @change="change($event)" />
			<swiper :style="{height:`${scrollH-84}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view v-for="(ite, ind) in schoolList" :key="ind" class="sc-it" hover-class="navigator-hover" @tap="toSchoolDetail(ite)">
							{{ite.schoolname}}
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view v-for="(ite, ind) in professionList" :key="ind" class="sc-it" hover-class="navigator-hover" @tap="toProfessionDesc(ite)">
							{{ite.majorname}}
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <view class="no-data">
			<image src="/static/no_data.png" mode="aspectFill"></image>
			<p>你目前还没有关注的学校哦～</p>
		</view> -->
	</view>
</template>

<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	export default {
		components: {
			QSTabs
		},
		data() {
			return {
				haveData: true,
				tabs: ["学校", "专业"],
				current: 0,
				schoolList: [{
					"createtime": "20191115154157",
					"id": "6accdc8520cb492a814aeda51a58e7ac",
					"type": "1",
					"updatetime": "20191211151523",
					"schoolno": "3633000526",
					"userid": "d05902562e544db29bbe777954d43bb0",
					"schoolname": "苍南县职业中等专业学校",
					"status": 1
				}],
				professionList: [{
					"createtime": "20191213160908",
					"majorname": "种子生产与经营",
					"id": "bfbc081855914154911765adf4e20a39",
					"type": "2",
					"userid": "d05902562e544db29bbe777954d43bb0",
					"majorcode": "510102",
					"status": 1
				}]
			}
		},
		computed: {
			scrollH() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth;
				let winHeight = parseInt(sys.windowHeight * winrate)
				return winHeight
			}
		},
		methods: {
			change(index) {
				console.log('change', index)
				this.current = index;
			},
			swiperChange({
				detail: {
					current
				}
			}) {
				console.log('swiperChange', current)
				this.current = current;
			},
			toSchoolDetail() {
				uni.navigateTo({
					url: "../../schoolDetails/SchoolDetail"
				})
			},
			toProfessionDesc() {
				uni.navigateTo({
					url: "../../indexIcon/majorDatabase/ProfessionDesc"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.have-data {
		border-top: 1px solid rgba(238, 238, 238, 1)
	}

	.swiper-item {
		background-color: #fff;

		.sc-it {
			background-color: #fff;
			border-bottom: 8upx solid #F6F8FE;
			height: 100upx;
			font-size: 28upx;
			line-height: 100upx;
			padding-left: 30upx;

			&:first-child {
				border-top: 17upx solid #F6F8FE;
			}
		}
	}

	.no-data {
		image {
			width: 444upx;
			height: 374upx;
			margin-top: 200upx;
			text-align: center;
		}

		p {
			text-align: center;
			margin-top: 10upx;
			font-size: 30upx;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			font-family: PingFangSC-Regular, PingFang SC;
			line-height: 40px;
		}
	}
</style>
