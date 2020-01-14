<template>
	<view class="m-wrapper" :animation="animationData">
		<slot>
			<view class="">{{ message ? message : '暂无信息' }}</view>
		</slot>
		<image class="img" src="/static/indexIcon/close.png" mode="aspectFit" @tap="handleTap" />
	</view>
</template>

<script>
export default {
	props: {
		isShow: {
			type: Boolean,
			default: true
		},
		message: String,
		duration:{
			type:Number,
			default:1500,
		}
	},
	watch: {
		isShow: {
			handler(val) {
				this.$nextTick(() => {
					if (val) {
						this.animation.height(uni.upx2px(88)).step();
						this.timer = setTimeout(()=>{
							this.$emit('update:isShow',false)
						},this.duration)
					} else {
						this.animation.height(0).step();
					}
					this.animationData = this.animation.export();
				});
			}
		}
	},
	data() {
		return {
			animationData: '',
			timer:'',
		};
	},
	mounted() {
		let animation = uni.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		this.animation = animation;
		if (this.isShow) {
			this.animation.height(uni.upx2px(88)).step();
		} else {
			this.animation.height(0).step();
		}
		this.animationData = this.animation.export();
	},
	methods: {
		handleTap() {
			this.$emit('close');
		}
	}
};
</script>

<style scoped lang="scss">
.m-wrapper {
	box-sizing: border-box;
	overflow: hidden;
	position: relative;
	display: flex;
	align-items: center;
	height: 0;
	width: 100%;
	// animation: load .5s ease-in-out;
	color: #ff750f;
	background: #fffbea;
	padding-right: 85upx;
	padding-left: 30upx;
	font-size: $uni-font-size-lg;
	.img {
		width: 45upx;
		height: 45upx;
		position: absolute;
		right: 20upx;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
	}
}
@keyframes load {
	from {
		height: 0;
	}
	to {
		height: 88upx;
	}
}
</style>
