<template>
	<view class="you-scroll" ref="youScroll">
		<view class="pullDown" :style="{ transform: 'translateY('+translateY+'px)', transition: isDown ? '0s' : '0.3s' }">
			<slot name="pullDown">
				<view class="pulldown-tips">
					<view class="uni-load-more__img" v-if="pullDownStatus == 2">
						<view class="load1 load">
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
						</view>
						<view class="load2 load">
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
						</view>
						<view class="load3 load">
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
							<view :style="{ background: color }" class="uni-load-view_wrapper" />
						</view>
					</view>
					<span>
						<block v-if="pullDownStatus == 1">{{downPullToRefresh}}</block>
						<block v-if="pullDownStatus == 2">{{downReleaseToRefresh}}</block>
						<block v-if="pullDownStatus == 3">{{downRefreshing}}</block>
					</span>
				</view>
				
			</slot>
		</view>
		<scroll-view class="you-scroll-inner" ref="youScrollInner" :scroll-top="scrollToTop" scroll-with-animation scroll-y :style="{ transform: 'translateY('+translateY+'px)', transition: isDown ? '0s' : 'transform 0.3s',height:styleObj.height,overflow:'auto'}"
		 @touchstart="startFn" @touchmove="moveFn" @touchend="endFn" @touchcancel="endFn" @scroll="scroll">
			<view class="you-scroll-content" >
				<slot></slot>
				<load-tips :status="loadStatus" :color="loadTextColor"></load-tips>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import loadTips from './load-tips.vue'
	export default {
		components:{loadTips},
		data() {
			return {
				color:'#777777',
				scrollToTop: 0,
				scrollTop: 0,
				oldTop: 0,
				sPageY: 0,
				mPageY: 0,
				ePageY: 0,
				translateY: 0,
				pullDownStatus: 1, // 1：下拉刷新 2：松开刷新 3：刷新中
				isDown: false
			};
		},
		props: {
			loadTextColor:{
				type:String,
				default:'#333'
			},
			// 下拉加载提示 more loading noMore
			loadStatus:{
				type:String,
				default:'noMore'
			},
			// 在uniapp中样式无法直接作用在组件名称上，必须通过传值才可以实现
			styleObj:{
				type:Object,
				default(){
					return{}
				}
			},
			pullDownDistance: {
				type: Number,
				default: 50 // 下拉刷新距离
			},
			reachBottomDistance: {
				type: Number,
				default: 30 // 上拉加载距离
			},
			downPullToRefresh: {
				type: String,
				default: '下拉刷新'
			},
			downReleaseToRefresh: {
				type: String,
				default: '松开刷新'
			},
			downRefreshing: {
				type: String,
				default: '刷新中…'
			},
		},
		methods: {
			startFn(e) {
				this.isDown = true;
				this.sPageY = e.changedTouches[0].pageY;
				this.pointY = this.translateY;
			},
			moveFn(e) {
				let view = uni.createSelectorQuery().in(this).select(".you-scroll-inner");
				view.fields({ 
					size: true, 
					scrollOffset: true
				}, data => { 
					this.scrollTop = data.scrollTop;
					this.mPageY = e.changedTouches[0].pageY;
					if (this.scrollTop <= 0) {
						let translateY = ((this.mPageY - this.sPageY)  / 2) + this.pointY;
						this.translateY = (translateY < 0 ? 0 : translateY);
						
						if(this.pullDownStatus != 3) {
							if(this.translateY < this.pullDownDistance) {
								this.pullDownStatus = 1;
							} else if(this.translateY >= this.pullDownDistance) {
								this.pullDownStatus = 2;
							}
						}
					}
				}).exec();
				
			},
			endFn(e) {
				this.isDown = false;
				this.ePageY = e.changedTouches[0].pageY;
				setTimeout(() => {
					this.translateY = this.translateY >= this.pullDownDistance ? this.pullDownDistance : 0;
					if(this.pullDownStatus == 2) { // 开始刷新
						this.pullDownStatus = 3;
						this.$emit('onPullDown',this.endPullDown);
					}
				},100)
				
				
			},
			endPullDown(mm) {
				if(this.timeout) clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.translateY = 0;
					this.pullDownStatus = 1;
				}, mm || 0);
			},
			prevent(e) {  
				if(this.translateY > 0) {
					e.preventDefault();
				}
			},
			scroll(e) {
				this.$emit('onScroll',e);
				this.oldTop = e.detail.scrollTop;
				
				if(this.timeout) clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.scrolltolower(e);
				},50);
			},
			scrolltolower(e) {
				let view = uni.createSelectorQuery().in(this).select(".you-scroll-inner");
				view.fields({ 
					size: true, 					
					scrollOffset: true
				}, data => { 
					if(data.scrollTop >= (e.detail.scrollHeight - data.height - this.reachBottomDistance)) {
						this.$emit('onLoadMore',e);
					}
				}).exec();
				
			},
			isWeixinCient(){
				var ua = navigator.userAgent.toLowerCase();
				if(ua.match(/MicroMessenger/i)=="micromessenger") {
					return true;
				} else {
					return false;
				}
			},
			goTop(top) {
				this.scrollToTop = this.oldTop;
				this.$nextTick(function() {
					this.scrollToTop = top || 0;
				});
			}
		},
		mounted() {
			// #ifdef H5
			if(this.isWeixinCient()) {
				document.body.addEventListener('touchmove', this.prevent);
			}
			// #endif
		},
		destroyed() {
			// #ifdef H5
			if(this.isWeixinCient()) {
				document.body.removeEventListener('touchmove', this.prevent);
			}
			// #endif
		}
	}
</script>

<style scoped>
	@charset "UTF-8";
	.you-scroll {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}
	.you-scroll .pullDown {
		width: 100%;
		height: 40px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
		overflow: hidden;
		transform: translateY(-100%);
		position: absolute;
		top: -40px;
		left: 0;
	}
	.you-scroll .pullDown .down-icon {
		width: 40px;
		height: 32px;
		display: inline-block;
		vertical-align: middle;
	}
	.you-scroll .pullDown .animate {
		-webkit-animation: scaleIcon 1s infinite linear;
		-moz-animation: scaleIcon 1s infinite linear;
		-ms-animation: scaleIcon 1s infinite linear;
		animation: scaleIcon 1s infinite linear;
	}
	.you-scroll .pullDown span {
		white-space: nowrap;
		overflow: hidden;
		display: inline-block;
		vertical-align: middle;
	}
	
	.you-scroll .you-scroll-inner {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}
	.you-scroll-content {
		overflow: hidden;
	}

	@-webkit-keyframes scaleIcon {
		0% {
			transform: scaleY(1);
		}
		40% {
			transform: scaleY(0.8);
		}
		80% {
			transform: scaleY(0.9);
		}
		100% {
			transform: scaleY(1);
		}
	}
	@-moz-keyframes scaleIcon {
		0% {
			transform: scaleY(1);
		}
		40% {
			transform: scaleY(0.8);
		}
		80% {
			transform: scaleY(0.9);
		}
		100% {
			transform: scaleY(1);
		}
	}
	@-ms-keyframes scaleIcon {
		0% {
			transform: scaleY(1);
		}
		40% {
			transform: scaleY(0.8);
		}
		80% {
			transform: scaleY(0.9);
		}
		100% {
			transform: scaleY(1);
		}
	}
	@keyframes scaleIcon {
		0% {
			transform: scaleY(1);
		}
		40% {
			transform: scaleY(0.8);
		}
		80% {
			transform: scaleY(0.9);
		}
		100% {
			transform: scaleY(1);
		}
	}
	.pulldown-tips{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pulldown-tips span{
		padding-left: 20upx;
	}
	.uni-load-more__img {
		position: relative;
		display:inline-block;
		height: 24px;
		width: 24px;
		margin-right: 10px;
	}
	
	.uni-load-more__img>.load {
		position: absolute
	}
	
	.uni-load-more__img>.load .uni-load-view_wrapper {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load .96s ease infinite
	}
	
	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>.load .uni-load-view_wrapper:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.uni-load-more__img>.loader-android {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		box-sizing: border-box;
		border: solid 2px #777;
		border-radius: 50%;
		border-bottom-color: transparent !important;
		animation: loader-android 1s 0s linear infinite
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 .uni-load-view_wrapper:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 .uni-load-view_wrapper:nth-child(1) {
		animation-delay: 80ms
	}
	
	.load3 .uni-load-view_wrapper:nth-child(1) {
		animation-delay: .16s
	}
	
	.load1 .uni-load-view_wrapper:nth-child(2) {
		animation-delay: .24s
	}
	
	.load2 .uni-load-view_wrapper:nth-child(2) {
		animation-delay: .32s
	}
	
	.load3 .uni-load-view_wrapper:nth-child(2) {
		animation-delay: .4s
	}
	
	.load1 .uni-load-view_wrapper:nth-child(3) {
		animation-delay: .48s
	}
	
	.load2 .uni-load-view_wrapper:nth-child(3) {
		animation-delay: .56s
	}
	
	.load3 .uni-load-view_wrapper:nth-child(3) {
		animation-delay: .64s
	}
	
	.load1 .uni-load-view_wrapper:nth-child(4) {
		animation-delay: .72s
	}
	
	.load2 .uni-load-view_wrapper:nth-child(4) {
		animation-delay: .8s
	}
	
	.load3 .uni-load-view_wrapper:nth-child(4) {
		animation-delay: .88s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
	
	@-webkit-keyframes loader-android {
		0% {
			transform: rotate(0)
		}
	
		100% {
			transform: rotate(360deg)
		}
	}
</style>
