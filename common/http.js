import {
	baseURL
} from '../config'
const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...',
			mask: options.load ? true : false //是否出现透明层
		});
		uni.request({
			url: (options.baseURL ? options.baseURL : baseURL) + options.url,
			method: options.method,
			data: options.data,
			header: {
				'v-token': '333333'
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
  methods: 'get',
  url: 'https://unidemo.dcloud.net.cn/api/news',
  data: {},
  load:true
}).then((data) =>{
  console.log(data)
}, (err) => {
  console.log(err)
})
 */
