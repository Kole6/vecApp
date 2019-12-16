import {
	baseURL
} from '../config'
const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...',
			mask: options.load || false // 默认不出现遮罩
		});
		uni.request({
			url: (options.baseURL ? options.baseURL : baseURL) + options.url,
			method: options.method || 'POST', // 默认为POST请求
			data: options.data,
			header: {
				'v-token': '333333',
				'Content-Type': options.header == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
			},
			success: res => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err.data);
				let code = err.data.code; //错误码处理
				switch (code) {
					case 1000:
						break;
					default:
						break;
				}
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	})
}

export default http

//调用例子
/*
this.$HTTP({
  method: 'GET',
  url: '/api/news',
  data: {},
  header:'form',
  load:true
}).then((res) =>{
  console.log(res)
}, (err) => {
  console.log(err)
})
 */
