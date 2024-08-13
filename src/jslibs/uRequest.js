import {apiDomain} from '@/configs/env';

export function requestApi(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiDomain + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header || {'content-type': 'application/json'},
			success: function (res) {
				resolve(res.data)
			},
			fail: function (err) {
				reject(err)
			}
		})
	})
}
