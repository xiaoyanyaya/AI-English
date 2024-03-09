import {apiDomain} from '@/configs/env';
import state from "@/store/state";
import store from "@/store";

export function sseRequestTask({url, data, method = 'POST'}) {
	return new Promise((resolve, reject) => {
		const requestTask = uni.request({
			url: `${apiDomain}${url}`,
			timeout: 15000,
			responseType: 'text',
			method,
			enableChunked: true,
			data,
			header: {
				'X-Access-Token': state.token,
			},
			success: response => {
			},
			fail: error => {
				console.log("fail", error)
			}
		});
		requestTask.onHeadersReceived(function (res) {
		});
		requestTask.onChunkReceived(function (res) {
			const uint8Array = new Uint8Array(res.data);
			let text = String.fromCharCode.apply(null, uint8Array);
			text = decodeURIComponent(escape(text));
			let arr = text.split('\n')
			arr.forEach((item) => {
				if (item.includes('data:') && !item.includes('[DONE]')) {
					let text = item.replace('data:', '')
					resolve(text)
					store.dispatch('generateContent', text)
				} else {
					requestTask.abort
				}
			})
		})
	})
}
