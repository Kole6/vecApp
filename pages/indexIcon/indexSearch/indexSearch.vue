<template>
	<view class="content">
		<view class="search">
			<uni-search-bar radius="100" clearButton="left" @confirm="search" placeholder=" 学校 / 人名 / 专业 " />
		</view>
		<view class="have-data">
			<QSTabs ref="tabs" :current="current" :tabs="tabs" width="250" swiperWidth="750" activeColor="#6451FC"
			 backgroundColor="#fff" @change="change($event)" />
			<swiper :style="{height:`${scrollH - 185}upx`,borderTop: '1upx solid rgba(238, 238, 238, 0.3)'}" :current="current"
			 @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="list-title">
							<p>院校</p>
						</view>
						<view class="school-list">
							<school-list class="" :isText="true" :showType="4" :listArr="dataArr"></school-list>
						</view>
						<view class="list-title">
							<p>专业</p>
						</view>
						<view class="school-list">
							<school-list :showType="4" :is-special="true" :listArr="dataArr2" :handleTaped="false" @taped="handleListTaped" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="school-list">
							<school-list class="" :isText="true" :showType="4" :listArr="dataArr"></school-list>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;">
						<view class="school-list">
							<school-list :showType="4" :is-special="true" :listArr="dataArr2" :handleTaped="false" @taped="handleListTaped" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	import schoolList from '@/components/vec-school-list/vec-school-list.vue';
	export default {
		components: {
			uniSearchBar,
			QSTabs,
			schoolList
		},
		onLoad() {
			this.apiGetSchoolSearchList('');
			this.apiGetMajors('');
		},
		data() {
			return {
				tabs: ["全部", "院校", "专业"],
				current: 0,
				dataArr: [],
				dataArr2: []
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
			search(res) {
				/* uni.showModal({
					content: '搜索：' + res.value,
					showCancel: false
				}) */
				this.apiGetSchoolSearchList(res.value)
				this.apiGetMajors(res.value)
			},
			async apiGetSchoolSearchList(key) {
				let list = await this.$api.apiGetSchoolSearchList(this,key);
				this.dataArr = this.$tool.toolSchoolList(list);
			},
			async apiGetMajors(key) {
				let list = await this.$api.apiGetMajors(this,key);
				this.dataArr2 = this.$tool.toolMajorList(list);
			},
			handleListTaped({
				item,
				index
			}) {
				uni.navigateTo({
					url: `/pages/indexIcon/majorDatabase/ProfessionDesc?id=${item.majorcode}&name=${item.majorname}&type=1`
				})
			},
			change(index) {
				this.current = index;
			},
			swiperChange({
				detail: {
					current
				}
			}) {
				this.current = current;
			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
			},
		},
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.search {
		padding: 0 32upx;
	}

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

	.list-title {
		padding-left: 30upx;
		height: 98upx;
		font-size: 32upx;
		font-weight: 700;
		color: rgba(51, 51, 51, 1);
		line-height: 98upx;
	}

	.school-list {
		background: #ffffff;
		overflow: auto;
	}
</style>
