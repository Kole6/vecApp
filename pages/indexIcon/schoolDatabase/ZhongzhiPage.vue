<template>
	<view>
		<vec-school-page :categoryArr="categoryArr" :type="type"/>
	</view>
</template>

<script>
	import vecSchoolPage from "@/components/vec-school-page/vec-school-page.vue" 
	export default {
		data() {
			return {
				categoryArr: [],
				type:'中职'
			}
		},
		components: {
			vecSchoolPage
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				this.$api.apiGetYxsl(this);
			},
		}
	}
</script>