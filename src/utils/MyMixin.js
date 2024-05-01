// MyMixin.js
import {getPhone, login} from "@/api/user";
import store from "@/store";
import { apiDomain } from "@/configs/env";
import {baseInfo} from "@/api/me";

export default {
	data() {
		return {
			// 系统信息
			systemInfo: {},
			imageBaseUrl: "https://aien.xiaolixb.com/assets",
			isAuthPhone: false,
		};
	},
	onLoad() {
		this.getSystemInfo()
		// 是否授权获取了手机号
		this.isAuthPhone = uni.getStorageSync("isAuthPhone")
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
			return new Promise((resolve, reject) => {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						login({
							code: res.code
						}).then(res => {
							// store.dispatch('generateContent', text)
							resolve(res);
							this.$store.dispatch('setToken', res.data.result.token)
						});
					}
				});
			});
		},
		getPhone(res, toPageUr) {
			if (res.detail.errMsg !== 'getPhoneNumber:ok') {
				/*uni.showToast({
					title: '授权失败',
					icon: 'none',
					duration: 1000
				})*/
				return
			}

			uni.showLoading({
				title: '登录中...',
				mask: true
			})
			console.log(res)

			return new Promise((resolve, reject) => {
				var code = res.detail.code;
				var iv = res.detail.iv;
				var encryptedData = res.detail.encryptedData;
				getPhone({
					code,
				}).then(res => {
					if  (res.data.code === 200) {
						uni.showToast({
							title: '授权成功',
							icon: 'success',
							duration: 1000
						})
						uni.setStorageSync("isAuthPhone", true)
						this.isAuthPhone = true
						resolve(res)
						if (toPageUr) {
							setTimeout(() => {
								this.$navigateTo(toPageUr);
							}, 1000)
						}
					}
				});
			})
		},
		getUserInfo() {
			return new Promise((resolve, reject) => {
				baseInfo().then(res => {
					this.$store.dispatch('userInfo', res.data.result)
					resolve(res.data.result)
				})
			})
		},
		unploadFile(tempFilePath, url) {
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url,
					filePath: tempFilePath,
					name: 'avatar',
					header: {
						'X-Access-Token': store.state.token,
					},
					success: (uploadFileRes) => {
						var data = JSON.parse(uploadFileRes.data)
						uni.showToast({
							title: '上传成功',
							icon: 'success',
							duration: 1000
						})
						this.$store.dispatch('userInfo', data.result)
						resolve(data.result)
					},
					fail: (err) => {
						console.log("上传失败", err)
						uni.showToast({
							title: '上传失败',
							icon: 'none',
							duration: 1000
						})
					}
				})
			})
		},
		utils() {
			return {
				$toast: (title, icon = 'none') => {
					uni.showToast({
						title,
						icon
					})
				},
			}
		}
	}
};
