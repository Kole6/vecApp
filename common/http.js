// created by wangyong for uni-app request
import {
	baseURL
} from '../config'
const http = (options) => {
	return new Promise((resolve, reject) => {
		if (options.load) { //默认遮罩不出现
			uni.showLoading({
				title: '加载中...',
				mask: false // 遮罩出现可以继续操作
			});
		}
		try {
			uni.request({
				url: (options.baseURL || baseURL) + options.url,
				method: options.method || 'POST', // 默认为POST请求
				data: options.data, //请求超时在manifest.json配置
				header: {
					'v-token': '333333',
					'Content-Type': options.header == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
				},
				success: res => {
					resolve(res.data)
				},
				fail: (err) => {
					reject(err.data);
					uni.showToast({
						title: '请检查网络连接',
						icon: 'none'
					})
					/*错误码处理
					let code = err.data.code; 
					switch (code) {
						case 1000:
							break;
						default:
							break;
					} */
				},
				complete: () => {
					if (options.load) {
						uni.hideLoading();
					}
				}
			});
		} catch (e) {
			if (options.load) {
				uni.hideLoading();
			}
			uni.showToast({
				title: '服务端异常',
				icon: 'none'
			})
		}
	})
}

export default http

// 调用例子
/*
this.$HTTP({
  method: 'GET',
  url: '/api/news',
  data: {},
  header:'form'
}).then((res) =>{
  console.log(res)
})
 */
