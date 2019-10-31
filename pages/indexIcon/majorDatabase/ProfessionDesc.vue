<template>
	<view :style="styleObj">
		<!-- 专业信息-专业介绍 -->
		<view class="top">
			<view class="top-btn active">专业介绍</view>
			<view class="top-btn" @tap="handleRouter({ url: './ProfessionSchool' }, true)">开设学校</view>
		</view>
		<!-- 基本信息 -->
		<view class="m-base">
			<view class="title">基本信息</view>
			<view class="item">
				<text class="name">专业名称：</text>
				<text class="value">{{professionInfo.name}}</text>
			</view>
			<view class="item">
				<text class="name">专业大类：</text>
				<text class="value">{{professionInfo.zydl}}</text>
			</view>
			<view class="item">
				<text class="name">专业代码：</text>
				<text class="value">{{professionInfo.zydm}}</text>
			</view>
			<view class="item">
				<text class="name">学历层次：</text>
				<text class="value">{{professionInfo.xlcc}}</text>
			</view>
			<view class="item">
				<text class="name">修业年限：</text>
				<text class="value">{{professionInfo.xynx}}</text>
			</view>
			<view :class="['f-base',hasCompare?'yes':'no']" @tap="hasCompare=!hasCompare">
				{{hasCompare?'取消对比':'加入对比'}}
			</view>
		</view>
		<!-- 专业解读 -->
		<view class="m-pro">
			<view class="title">专业解读</view>
			<view class="item">
				<view class="name">主要对应职业类型:</view>
				<view class="value">{{professionInfo.zylxE}}</view>
			</view>
			<view class="item">
				<view class="name">衔接高职专业举例:</view>
				<view class="value">{{professionInfo.gzjlE}}</view>
			</view>
			<view class="item">
				<view class="name">专业教学标准:</view>
				<view class="value ">下载内容: <text class="link" @tap="handleDownload">{{professionInfo.downloadName}}</text> 
			</view>
			</view>
		</view>
		<!-- 相近专业 -->
		<view class="m-simi">
			<view class="title">相近专业</view>
			<school-list :listArr="dataArr"></school-list>
		</view>
		<!-- 底部按钮 -->
		<view class="m-bottom">
			<view class="left" @tap="handleSave">
				<text class="vecfont icon-menu iconguanzhu" :class="{'saved':hasSaved}"></text>
				<text class="text">
					{{hasSaved?'取消收藏':'收藏'}}
				</text>
			</view>
			<view class="right">
				<text>专业对比</text>
			</view>
		</view>
	</view>
</template>

<script>
import  schoolList from '@/pages/indexIcon/schoolDatabase/SchoolList.vue'
export default {
	components:{schoolList},
	data() {
		return {
			styleObj:{
				'overflow':'auto'
			},
			professionInfo:{
				name:'部队政治工作',
				zydl:'公安与司法大类',
				zydm:'38327398',
				xlcc:'学历层次',
				xynx:'修业年限',
				zylxE:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.',
				gzjlE:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
				downloadName:'让新职教事业越来越红火',
				
			},
			hasCompare:false,//是否已添加对比
			hasSaved:false,//是否已收藏
			dataArr: [
				{
					title: '上海市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
				},
				{
					title: '河北市滨海职业大学',
					tags: [{ name: '民办', color: '' }, { name: '本科层次职业教育', color: '' }]
				}
			]
		};
	},
	onLoad(Option) {
		this.$set(this.styleObj,'height',uni.getSystemInfoSync().windowHeight + 'px' )
	},
	methods: {
		handleSave(){
			this.hasSaved = !this.hasSaved
		},
		handleDownload(){
			const downloadTask = uni.downloadFile({
				url:'https://github.com/wonderfulthing/myPlugins/raw/master/pdf/TypeScript.pdf',
				success(res){
					if(res.statusCode == 200){
						// 打开下载文件
						uni.openDocument({
							filePath:res.tempFilePath
						})
					}
				}
			})
			// 监控下载进度，TODO是否需要下载提示
			// downloadTask.onProgressUpdate(function (res) {
			//     console.log('下载进度' + res.progress);
			//     console.log('已经下载的数据长度' + res.totalBytesWritten);
			//     console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
			// });
		},
		handleRouter({ url }, isRedirect = false) {
			if (isRedirect) {
				uni.redirectTo({
					url
				});
			} else {
			}
		}
	}
};
</script>

<style scoped lang="scss">
@import './common.scss';
</style>
