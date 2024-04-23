import {apiDomain} from '@/configs/env';
import store from '@/store/';

const Fly = require('flyio/dist/npm/wx');

const fly = new Fly();
fly.config.baseURL = apiDomain;
// 添加请求拦截器
let timer = null;
fly.interceptors.request.use(async (request) => {
	// 给所有请求添加自定义header
	if (store.state.token != '') {
		request.headers['X-Access-Token'] = store.state.token;
	}
	if (!timer) {
		timer = setTimeout(() => {
			wx.showLoading({title: '加载中', mask: true})
		}, 1000)
	}

	return request;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
	(response) => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
			wx.hideLoading();
		}
		const {data} = response;
		if (data.error) {
			wx.showToast({title: data.error.message, icon: 'none', duration: 3000});
			return Promise.resolve(data);
		}
		return response;
	},
	(error) => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
			wx.hideLoading();
		}

		if (!error.response) {
			wx.showToast({title: '请检查网络设备', icon: 'none', duration: 3000});
			return;
		}

		// 发生网络错误后会走到这里
		const {status, data} = error.response;
		console.log('status', status);
		console.log('data', data)
	},
);

export default fly;
