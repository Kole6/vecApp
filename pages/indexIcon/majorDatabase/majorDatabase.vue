<!-- 专业库 -->
<template>
	<view>
		<view class="category">
		<uni-segmented-control :current="current" :values="items" @clickItem="handleTopClick" style-type="button" active-color="#6451FC"></uni-segmented-control>
		</view>
		<view class="content">
			<view class="page-body">
				<scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'">
					<view
						class="nav-left-item"
						@click="categoryClickMain(item, index)"
						:key="index"
						:class="index == categoryActive ? 'active' : ''"
						v-for="(item, index) in categoryList"
					>
						{{ item.name }}
					</view>
				</scroll-view>
				<scroll-view class="nav-right" scroll-y 
							 :scroll-top="scrollTop"
							 @scroll="scroll"
							 :style="'height:' + height + 'px'" 
							 scroll-with-animation>
						<uni-collapse >
							<view class="right-show-all">
								<text class="scroll-title">{{categoryList[categoryActive].name}}</text>
								<text class="scroll-btn" @tap="showAll">{{isShowAll?'关闭全部':'全部展开'}}</text>
							</view>
						    <uni-collapse-item v-for="(list,index) in subCategoryList" 
												:key="list.id"
												:title="list.name" 
												:show-animation="true"
												:open="list.open">
								<view class="category-item" v-for="(item,i) in list.detailList" 
												:key="item.id"
												@tap="handleItemTap(item,i,list,index)">
									{{item.name}}
								</view>
						    </uni-collapse-item>
						</uni-collapse>
					
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue"
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
export default {
	components: {uniSegmentedControl,uniCollapse,uniCollapseItem},
	data() {
		return {
			items:['高职院校专业','中职院校专业','技工院校专业'],
			current:0,//顶部大分类选中值
			categoryList: [],
			subCategoryList: [],
			height: 0,
			categoryActive: 0,//当前分类选中index值
			//滚动视图
			scrollTop: 0,
			scrollHeight: 0,
			isShowAll:false,//全部展开控制量
		};
	},
	onLoad: function() {
		this.getCategory();
		// 设置分类栏高度，保持在一屏内
		this.height = uni.getSystemInfoSync().windowHeight - 65;
	},
	methods: {
		handleTopClick(index){
			this.current = index;
		},
		showAll(){
			this.subCategoryList.forEach(item=>{
				item.open = !this.isShowAll;
			})
			this.isShowAll = !this.isShowAll;
		},
		// 监听scrollview的滚动事件，在切换时置顶
		scroll(e) {
			this.scrollHeight = e.detail.scrollHeight;
		},
		categoryClickMain(categroy, index) {
			this.isShowAll = false;
			this.categoryActive = index;
			this.subCategoryList = categroy.subCategoryList;
			this.scrollTop = -this.scrollHeight * index;
		},
		getCategory() {
			let data = [
				{
					name:'农林牧渔'
				},{
					name:'资源环境与安全'
				},{
					name:'土木工程'
				},{
					name:'资源环境与安全'
				},{
					name:'装备制造'
				},{
					name:'生物与化工'
				},{
					name:'轻工纺织'
				},{
					name:'食品药品与粮食'
				},{
					name:'交通运输'
				}
			]
			data.forEach((item,index)=>{
				item.subCategoryList=[
						{
							name:'农业类',
							open:false,
							id:'00'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'01'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'02'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'03'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'04'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'05'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'06'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'07'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'08'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'09'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'10'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'11'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						},{
							name:'农业类',
							open:false,
							id:'12'+index,
							detailList:[
								{
									name:'农业种植',
									id:'0000'+index
								},{
									name:'农业种植',
									id:'0001'+index
								},{
									name:'农业种植',
									id:'0002'+index
								},{
									name:'农业种植',
									id:'0003'+index
								},
							]
						}
					]
			})
			this.categoryList = data
			this.subCategoryList = this.categoryList[0].subCategoryList;
		},
		handleItemTap(target,targetIndex,list,listIndex){
			console.log(target,targetIndex,list,listIndex)
			uni.navigateTo({
				url:'./ProfessionDesc?id='+target.id+'&name='+target.name,
				animationType: 'pop-in',
				animationDuration: 200
			})
		}
	}
};
</script>

<style scoped lang="scss">
.uni-collapse-cell__title-text{
	color: #333333;
}
/* category */
.category{
	padding: 15px 0;
	border-bottom: solid 1px $main-dividing-line1;
}
/* 分类 */
.page-body {
	display: flex;
}

.nav {
	display: flex;
	width: 100%;
}

.nav-left {
	width: 30%;
}

.nav-left-item {
	height: 100upx;
	border-right: solid 1px $main-dividing-line1;
	border-bottom: solid 1px $main-dividing-line1;
	padding: 5upx 20upx;
	font-size: $uni-font-size-lg + 3upx;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #333;
}

.nav-right {
	width: 70%;
}

.nav-right-item image {
	width: 100upx;
	height: 100upx;
}

.active {
	color: $main-base-color;
}
.right-show-all{
	display: flex;
	justify-content: space-between;
	padding: 5px 10px;
	font-size: $uni-font-size-lg;
	border-bottom: solid 1px $main-dividing-line1;
	position: sticky;
	top: 0;
	z-index: 100;
	background: #fff;
	.scroll-title{
		color:$main-base-color;
		font-size: $uni-font-size-lg + 3upx;
	}
	.scroll-btn{
		border: solid 1px $main-base-color;
		border-radius: 10upx;
		padding: 5upx 10upx;
		color: #FFFFFF;
		background: $main-base-color;
	}
}
.category-item{
	padding: 15upx 30upx;
	font-size: $uni-font-size-lg + 3upx;
	color: #333333;//#3395ff
	text-align: center;
	border-top: solid 1px $main-dividing-line1;
}
</style>
