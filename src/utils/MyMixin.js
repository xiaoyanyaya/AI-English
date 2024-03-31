// MyMixin.js
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
