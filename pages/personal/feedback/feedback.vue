<!--意见反馈类型-->
<template>
	<view>
		<text class="top-title">意见反馈类型</text>
		<view class="vip">
			<view v-for="(item,index) in selList" :key="index">
				<view class="sc">
					<vec-select :sel="index==selIndex" @reStyle="reStyle(index)">
						<p slot="tip">{{item.name}}</p>
					</vec-select>
				</view>
			</view>
		</view>
		<view class="sc-area">
			<textarea v-model="message" placeholder="不能愉快的使用现有功能？上传相关页面内容方便我们快速解决问题哦～" />
			</view>
		<button class="vec-btn vip-open" type="primary" @tap="toSubmission()">提交</button>
	</view>

</template>

<script>
	import vecSelect from "../../../components/vec-select/vec-select.vue"
	export default {
		components: {
			vecSelect
		},
		data() {
			return {
				selIndex:0,
				selList:[
					{name:"功能异常",code:'0'},
					{name:"体验问题",code:'1'},
					{name:"新功能建议",code:'2'},
					{name:"其他",code:'3'}
				],
				message:'',
			};
		},
		methods: {
			toSubmission() {
				this.$http({
					url: '/zjq/User/FeedBack',
					header: 'form',
					data: {
						token:uni.getStorageSync('token'),
						type:this.selIndex,
						message:this.message
					}
				}).then((res) => {
					if (res.code == 0) {
						this.message = '';
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
			},
			reStyle(i){
				this.selIndex = i
			}
		},
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.top-title{
		font-size:30upx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:600;
		color:rgba(51,51,51,1);
		line-height:90upx;
		margin: 0upx 20upx;
	}
	.vip {
		display: flex;
		justify-content: center;
		width: 750upx;
		.sc {
			margin: 0upx 5upx;
			p {
				width: 160upx;
			}
		}
	}
	.sc-area{
		margin-top: 40upx;
		textarea{
			width: 650upx;
			height: 310upx;
			margin-left: 30upx;
			background-color: rgba(248,250,255,1);
			font-size:26upx;
			padding: 20upx;
		}
	}
	.vip-open{
		margin-top: 60px;
	}
</style>
