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
	import schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList';
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
			apiGetSchoolSearchList(key) {
				this.$HTTP({
					url: '/zjq/College/GetSchoolSearchList',
					data: {
						token: uni.getStorageSync('token'),
						key
					},
					load: true,
					header: 'form'
				}).then((res) => {
					if (res.code == 0) {
						let va = res.data.list.map(item => {
							item.tags = item.tags + ''
							return {
								...item,
								title: item.schoolname,
								cards: item.tags.split(',').map(item => {
									return {
										name: item
									};
								}),
								tags: [{
									name: '地区',
									value: item.area
								}, {
									name: '层次',
									value: item.level==1?'高职':(item.level==2?'中职':item.level)
								}]
							};
						});
						this.dataArr = va
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
			},
			apiGetMajors(key) {
				this.$HTTP({
					url: '/zjq/College/GetMajors',
					data: {
						token: uni.getStorageSync('token'),
						key
					},
					header: 'form'
				}).then((res) => {
					if (res.code == 0) {
						let data = res.data.list.map(item => {
							return {
								...item,
								title: item.majorname,
								cards: [{
										name: '学历层次',
										value: item.xlcc || ''
									},
									{
										name: '专业年限',
										value: item.xynx || ''
									}
								],
								tags: [{
										name: '专业大类',
										value: item.zydl || ''
									},
									{
										name: '代码',
										value: item.majorcode
									}
								]
							};
						});
						this.dataArr2 = data
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
			},
			handleListTaped({
				item,
				index
			}) {
				uni.navigateTo({
					url: `/pages/indexIcon/majorDatabase/ProfessionDesc?id=${item.code}&name=${item.name}&type=${item.type}`
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
