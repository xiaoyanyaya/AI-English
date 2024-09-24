import {apiDomain} from '@/configs/env';
import store from '@/store/';
import {login} from "@/api/user";

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

		// 会员过期
		if (data.code === 10500) {
			uni.hideLoading();
			uni.showToast({title: data.message, icon: 'none', duration: 3000});
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/me/apply/apply'
				})
			}, 2000)
			return Promise.resolve(data);
		}
		if (data.code !== 200) {
			uni.showToast({title: data.message, icon: 'none', duration: 3000});
			return Promise.resolve(data);
		}
		if (data.error) {
			uni.showToast({title: data.error.message, icon: 'none', duration: 3000});
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
		if (status === 401) {
			console.log("testtest")
			uni.showToast({
				title: '登录过期，请重新登录',
				icon: 'none',
				duration: 1000
			})
			// 清除vuex和本地缓存
			store.dispatch('setToken', '');
			store.dispatch('userInfo', '');
			uni.removeStorageSync('personInfo');
			// 重新登录
			setTimeout(() => {
				const pages = getCurrentPages(); // 获取当前页面栈
				const currentPage = pages[pages.length - 1]; // 获取当前页面
				const url = `/${currentPage.route}`; // 拼接当前页面路径
				uni.reLaunch({
					url: '/pages/login/index?pagePath=' + url
				})
			}, 1000)
			uni.login({
				provider: 'weixin',
				success: (res) => {

					/*login({
						code: res.code
					}).then(res => {
						store.dispatch('setToken', res.data.result.token)
						console.log(store.state.token)
					});*/
				}
			});
		} else {
			uni.showToast({
				title: data.error.message,
				icon: 'none'
			})
		}
		console.log('status', status);
		console.log('data', data)
	},
);

export default fly;
