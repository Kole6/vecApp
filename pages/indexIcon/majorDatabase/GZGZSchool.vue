<!-- 专业库 -->
<template>
	<view>
		<view class="content">
			<view class="page-body">
				<scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'">
					<view
						class="nav-left-item"
						@click="level1Click(item, index)"
						:key="index"
						:class="index == categoryActive ? 'active' : ''"
						v-for="(item, index) in level1"
					>
						{{ item.majorname }}
					</view>
				</scroll-view>
				<scroll-view class="nav-right" scroll-y 
							 :scroll-top="scrollTop"
							 @scroll="scroll"
							 :style="'height:' + height + 'px'" 
							 scroll-with-animation>
						<uni-collapse >
						    <uni-collapse-item v-for="(list,index) in level2" 
												@taped="level2Click(list,index)"
												:key="list.majorcode"
												:title="list.majorname" 
												:show-animation="true"
												:open="list.open">
								<view class="category-item" v-for="(item,i) in level3" 
												:key="item.majorcode"
												@tap="handleItemTap(item)">
									{{item.majorname}}
								</view>
						    </uni-collapse-item>
						</uni-collapse>
					
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import uniCollapse from "@/components/uni-collapse/uni-collapse.vue"
import uniCollapseItem from "@/components/uni-collapse-item/uni-collapse-item.vue"
export default {
	components: {uniCollapse,uniCollapseItem},
	data() {
		return {
			categoryList: [],
			subCategoryList: [],
			level1:[],
			level2:[],
			level2Open:0,
			level3:[],
			height: 0,
			categoryActive: 0,//当前分类选中index值
			//滚动视图
			scrollTop: 0,
			scrollHeight: 0,
			isShowAll:false,//全部展开控制量
		};
	},
	onLoad: function() {
		// 设置分类栏高度，保持在一屏内
		this.height = uni.getSystemInfoSync().windowHeight;
	},
	mounted(){
	},
	created(){
		this.initData()
	},
	methods: {
		level1Click(categroy, index) {
			this.categoryActive = index;
			this.scrollTop = -this.scrollHeight * index;
			this.initData(categroy.majorcode)
		},
		level2Click(item,index){
			let level2Data = this.getData({
				type:'zyfl',
				pid:item.majorcode,
				schoolType:'1',
			}).then((data)=>{
				if(data.length){
					this.level2[this.level2Open].open=false;
					this.level2Open = index;
					item.open = true;
					this.level3 = data
				}else{
					this.level3 = []
				}
			}).catch((err)=>{
				uni.showToast({
					title:err,
					icon:'none'
				})
			})
		},
		async initData(majorId=''){
			let level1Data = []
			if(!majorId){
				level1Data = await this.getData({
					type:'zyfl',
					pid:majorId,
					schoolType:'1',
				})
				this.level1 = level1Data;
				if(!level1Data.length){
					this.level2 = this.level3 = []
					return
				};
			}
			let level2Data = await this.getData({
				type:'zyfl',
				pid:majorId || level1Data[0].majorcode,
				schoolType:'1',
			})
			if(level2Data.length){
				level2Data[0].open = true;
				this.level2Open = 0;
				this.level2 = level2Data
			}else{
				this.level3 = []
				return;
			}
			let level3Data = await this.getData({
				type:'zyfl',
				pid:level2Data[0].majorcode,
				schoolType:'1',
			})
			this.level3 = level3Data;
		},
		getData(data){
			return new Promise((resolve,reject)=>{
				this.$HTTP({
					url:'/zjq/mainpage/GetDict',
					header:'form',
					data,
				}).then((res)=>{
					if(res.code == 0){
						resolve(res.data)
					}else{
						reject(res.message)
					}
				})
			})
			
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

		handleItemTap(target,targetIndex){
			uni.navigateTo({
				url:`./ProfessionDesc?id=${target.majorcode}&name=${target.majorname}&type=1`
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
	background: #999999;
}

.nav-left-item {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 110upx;
	// border-right: solid 1px $main-dividing-line1;
	// border-bottom: solid 1px $main-dividing-line1;
	padding: 5upx 20upx;
	font-size: $uni-font-size-lg ;
	text-align: center;
	color: #333;
	&.active {
		border-left: solid 10upx $main-base-color;
		background: #FFFFFF;
	}
}

.nav-right {
	width: 70%;
	background: #FFFFFF;
}

.nav-right-item image {
	width: 100upx;
	height: 100upx;
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
	padding: 15upx 30upx 15upx 93upx;
	font-size: $uni-font-size-base;
	color: #999999;
	border-top: solid 1px #F7F7F7;
}
</style>
