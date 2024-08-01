// MyMixin.js
import { getPhone, login } from "@/api/user";
import store from "@/store";
import { apiDomain } from "@/configs/env";
import { baseInfo, basicData } from "@/api/me";

export default {
  data() {
    return {
      // 系统信息
      systemInfo: {},
      imageBaseUrl: "https://aien.xiaolixb.com/assets",
      isAuthPhone: false,
    };
  },
	onShareAppMessage() {
		return {
			title: "小礼AI极简英语",
			path: "pages/index/index"
		}
	},
	created() {
		// #ifdef MP-WEIXIN
		// 判断开发环境
		const accountInfo = wx.getAccountInfoSync();
		// env类型 develop:开发版、trial:体验版、release:正式版
		const envWx = accountInfo.miniProgram.envVersion;
		console.log("MyMixin111 envWx", envWx)
		if(envWx === 'release'){
			this.imageBaseUrl = "https://cdn.xiaolixb.com/assets"
		}else{
			this.imageBaseUrl = "https://aien.xiaolixb.com/assets"
		}
		// #endif
	},
  onLoad() {
    this.getSystemInfo();
    // 是否授权获取了手机号
    this.isAuthPhone = uni.getStorageSync("isAuthPhone");
    // this.login();
  },
  methods: {
    // 根据需求截取字符串
    getNameWithEllipsis(name, maxLength) {
      if (name.length > maxLength) {
        return name.slice(0, maxLength) + "...";
      } else {
        return name;
      }
    },
    // 字母乱序
    shuffleString(str) {
      console.log("str", str);
      // 转换为字符数组
      let chars = str.split("");
      // 打乱数组顺序
      // 随机排序数组
      chars.sort(() => Math.random() - 0.5);
      return chars;
    },
    // 时间格式化
    formatTime(seconds) {
      // 格式化时间
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      let displayTime = "";
      if (hours > 0) {
        displayTime += `${hours}小时`;
      }
      if (minutes > 0) {
        displayTime += `${minutes % 60}分`;
      }
      displayTime += `${seconds % 60}秒`;
      return displayTime;
    },
	  // 播放音频文件
	  publicPlayAudio(url) {
		  const innerAudioContext = uni.createInnerAudioContext();

		  console.log("this.systemInfo.platform", this.systemInfo.platform)
		  if (this.systemInfo.platform === "android") {
			  uni.downloadFile({
				  url: url,
				  success: (res) => {
					  if (res.statusCode === 200) {
						  console.log("下载成功", res.tempFilePath)
						  innerAudioContext.src = res.tempFilePath;
						  innerAudioContext.play();
						  innerAudioContext.onPlay(() => {
							  console.log('开始播放')
						  })
					  }
				  },
			  });
		  } else {
			  innerAudioContext.obeyMuteSwitch = false;
			  innerAudioContext.src = url;
			  innerAudioContext.play();
			  innerAudioContext.onPlay(() => {
				  console.log('开始播放')
			  })
		  }


		  innerAudioContext.onError((res) => {
			  console.log("播放失败", res.errMsg)
		  })
	  },
	  // 获取系统信息
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.systemInfo = res;
          console.log("设备信息:", res);
          console.log("状态栏高度:", res.statusBarHeight);
        },
      });
    },
	  // 登录账号
    login() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: (res) => {
            login({
              code: res.code,
            }).then((res) => {
              // store.dispatch('generateContent', text)
              resolve(res);
              this.$store.dispatch("setToken", res.data.result.token);
              this.getBasicData(res.data.result.isNew);
            });
          },
        });
      });
    },
	  // 获取基本信息
    getBasicData(isNew = false) {
      basicData().then((data) => {
        console.log(data, "基础数据");
        uni.setStorageSync("basicData", data.data.result);
        setTimeout(() => {
          if (isNew) {
            this.$navigateTo("/pages/me/selectLevel?pageForm=login");
          }
        }, 500);
      });
    },
	  // 获取手机号
    getPhone(res, toPageUr) {
      if (res.detail.errMsg !== "getPhoneNumber:ok") {
        return;
      }

      uni.showLoading({
        title: "登录中...",
        mask: true,
      });
      console.log(res);

      return new Promise((resolve, reject) => {
        var code = res.detail.code;
        var iv = res.detail.iv;
        var encryptedData = res.detail.encryptedData;
        getPhone({
          code,
        }).then((res) => {
          if (res.data.code === 200) {
            uni.showToast({
              title: "授权成功",
              icon: "success",
              duration: 1000,
            });
            uni.setStorageSync("isAuthPhone", true);
            this.isAuthPhone = true;
            resolve(res);
            if (toPageUr) {
              setTimeout(() => {
                this.$navigateTo(toPageUr);
              }, 1000);
            }
            if (toPageUr === "back") {
              setTimeout(() => {
                uni.navigateBack();
              }, 1000);
            }
          }
        });
      });
    },
	  // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        baseInfo().then((res) => {
          this.$store.dispatch("userInfo", res.data.result);
          resolve(res.data.result);
        });
      });
    },
	  // 上传文件
    unploadFile(tempFilePath, url) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url,
          filePath: tempFilePath,
          name: "avatar",
          header: {
            "X-Access-Token": store.state.token,
          },
          success: (uploadFileRes) => {
            var data = JSON.parse(uploadFileRes.data);
            uni.showToast({
              title: "上传成功",
              icon: "success",
              duration: 1000,
            });
            this.$store.dispatch("userInfo", data.result);
            resolve(data.result);
          },
          fail: (err) => {
            console.log("上传失败", err);
            uni.showToast({
              title: "上传失败",
              icon: "none",
              duration: 1000,
            });
          },
        });
      });
    },
    utils() {
      return {
        $toast: (title, icon = "none") => {
          uni.showToast({
            title,
            icon,
          });
        },
      };
    },
  },
};
