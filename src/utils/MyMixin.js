// MyMixin.js
export default {
	data() {
		return {
			// 系统信息
			systemInfo: {},
			imageBaseUrl: "http://www.xliai.com/assets"
		};
	},
	onLoad() {
		this.getSystemInfo()
	},
	methods: {
		getSystemInfo() {
			uni.getSystemInfo({
				success: (res) => {
					this.systemInfo = res;
					console.log('状态栏高度:', res.statusBarHeight);
				}
			});
		}
	}
};
