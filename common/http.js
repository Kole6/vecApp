// created by wangyong for uni-app request
import {
	ConfigBaseURL
} from '../config'
const http = (options) => {
	return new Promise((resolve, reject) => {
		if (options.load) { //默认遮罩是否出现
			uni.showLoading({
				title: '加载中...',
				mask: false // 遮罩出现可以继续操作
			});
		}
		try {
			uni.request({
				url: (options.baseURL || ConfigBaseURL) + options.url,
				method: options.method || 'POST', // 默认为POST请求
				data: options.data, //请求超时在manifest.json配置
				header: {
					'v-token': '333333',
					'Content-Type': options.header == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
				},
				success: res => {
					//全局处理权限问题
					/* if (res.data.message == "token不能为空" || res.data.message == "用户不能为空，请先登录" || res.data.message == "用户不能为空") {
						uni.showModal({
							content: '登录之后才可以查看哦!',
							success: function (res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '/pages/login/signIn/signIn'
									})
								} else if (res.cancel) {
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
					} */
					resolve(res.data)
				},
				fail: (err) => {
					uni.showToast({
						title: '请检查网络连接',
						duration: 2000,
						icon: 'none'
					});
					reject(err.data);
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