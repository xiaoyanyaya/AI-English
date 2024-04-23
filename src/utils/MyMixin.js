// MyMixin.js
import {getPhone, login} from "@/api/user";
import store from "@/store";

export default {
	data() {
		return {
			// 系统信息
			systemInfo: {},
			imageBaseUrl: "https://aien.xiaolixb.com/assets"
		};
	},
	onLoad() {
		this.getSystemInfo()
		// this.login();
	},
	methods: {
		getSystemInfo() {
			uni.getSystemInfo({
				success: (res) => {
					this.systemInfo = res;
					console.log('状态栏高度:', res.statusBarHeight);
				}
			});
		},
		login() {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					login({
						code: res.code
					}).then(res => {
						console.log('登录成功:', res.data.result.token);
						// store.dispatch('generateContent', text)
						this.$store.dispatch('setToken', res.data.result.token)
					});
				}
			});
		},
		getPhone(res) {
			console.log('getPhone:', res);
			var code = res.detail.code;
			var iv = res.detail.iv;
			var encryptedData = res.detail.encryptedData;
			getPhone({
				code,
			}).then(res => {
				console.log('获取手机号成功:', res);
			});
		}
	}
};
