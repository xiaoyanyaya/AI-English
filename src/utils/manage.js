import signMd5Utils from './signMd5Utils'
import requestApi from '@/common/api/api';

export function getAction(url, parameter) {
	console.log('getAction', url, parameter)
	let sign = signMd5Utils.getSign(url, parameter);
	console.log('manage', parameter)
	//将签名和时间戳，添加在请求接口 Header
	let signHeader = {
		"X-Sign": sign,
		"X-TIMESTAMP": signMd5Utils.getDateTimeToString()
	};

	return requestApi({
		url: url,
		data: parameter,
		header: signHeader
	})
}