// MyMixin.js
import { getPhone, login } from "@/api/user";
import store from "@/store";
import { apiDomain } from "@/configs/env";
import { baseInfo, basicData } from "@/api/me";

import md5 from 'md5'

//签名密钥串(前后端要一致，正式发布请自行修改)
const signatureSecret = "dd05f1c54d63749eda95f9fa6d49v442a";

export default {
  data() {
    return {
      // 系统信息
      systemInfo: {},
      imageBaseUrl: "https://aien.xiaolixb.com/assets/6-30-06_01.png",
      isAuthPhone: false,
	    // 提交表单--节流
	    lastTimestamp: 0,
    };
  },
	onShareAppMessage() {
		return {
			title: "小礼AI极简英语",
			path: "pages/index/index?promoCode=" + this.$store.state.userInfo.promoCode,
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
	  /**
	   * 节流处理（time秒内点击只有一次生效，点击提交按钮可用）
	   * @param time 毫秒
	   */
	  throttle(time = 2000) {
		  const nowTime = new Date().getTime();
		  const lastTime = this.lastTimestamp;
		  if (nowTime - lastTime > time) {
			  this.lastTimestamp = nowTime;
			  return true;
		  }
		  return false;
	  },
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
						let data = {
							code: res.code,
						}
						var promoCode = uni.getStorageSync("promoCode")
						if (promoCode) {
							data.inviteePromoCode = promoCode
						}
            login(data).then((res) => {
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
						// 更新手机号
	          uni.setStorageSync("userPhone", res.data.result)
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
	  /**
	   * json参数升序
	   * @param jsonObj 发送参数
	   */
	  sortAsc(jsonObj) {
		  let arr = new Array();
		  let num = 0;
		  for (let i in jsonObj) {
			  arr[num] = i;
			  num++;
		  }
		  let sortArr = arr.sort();
		  let sortObj = {};
		  for (let i in sortArr) {
			  sortObj[sortArr[i]] = jsonObj[sortArr[i]];
		  }
		  return sortObj;
	  },

	  /**
	   * @param url 请求的url,应该包含请求参数(url的?后面的参数)
	   * @param requestParams 请求参数(POST的JSON参数)
	   * @returns {string} 获取签名
	   */
	  getSign(url, requestParams) {
		  console.log("sign url: ", url);
		  console.log("sign requestParams: ", requestParams);
		  let urlParams = this.parseQueryString(url);
		  let jsonObj = this.mergeObject(urlParams, requestParams);
		  let requestBody = this.sortAsc(jsonObj); //排序后加签
		  let doStringBody = JSON.stringify(requestBody);
		  let noMassData = doStringBody.replace(/"/g, "");
		  console.log("sign的加密入参为: ", noMassData);
		  let value = md5(noMassData + signatureSecret).toUpperCase();
		  console.log("sign的加密结1果为: ", value);
		  return value;
	  },

	  /**
	   * @param url 请求的url
	   * @returns {{}} 将url中请求参数组装成json对象(url的?后面的参数)
	   */
	  parseQueryString(url) {
		  let urlReg = /^[^\?]+\?([\w\W]+)$/,
			  paramReg = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
			  urlArray = urlReg.exec(url),
			  result = {};

		  // 获取URL上最后带逗号的参数变量 sys/dict/getDictItems/sys_user,realname,username
		  //【这边条件没有encode】带条件参数例子：/sys/dict/getDictItems/sys_user,realname,id,username!='admin'%20order%20by%20create_time

		  let lastpathVariable = url.substring(url.lastIndexOf("/") + 1);
		  if (lastpathVariable.includes(",")) {
			  if (lastpathVariable.includes("?")) {
				  lastpathVariable = lastpathVariable.substring(
					  0,
					  lastpathVariable.indexOf("?")
				  );
			  }
			  // console.log("=========decodeURI(lastpathVariable)====" + decodeURI(lastpathVariable))
			  //解决Sign 签名校验失败 #2728
			  result["x-path-variable"] = decodeURI(lastpathVariable);
		  }
		  if (urlArray && urlArray[1]) {
			  let paramString = urlArray[1],
				  paramResult;
			  while ((paramResult = paramReg.exec(paramString)) != null) {
				  //数字值转为string类型，前后端加密规则保持一致
				  if (this.myIsNaN(paramResult[2])) {
					  paramResult[2] = paramResult[2].toString();
				  }
				  result[paramResult[1]] = paramResult[2];
			  }
		  }
		  return result;
	  },

	  /**
	   * @returns {*} 将两个对象合并成一个
	   */
	  mergeObject(objectOne, objectTwo) {
		  if (objectTwo && Object.keys(objectTwo).length > 0) {
			  for (let key in objectTwo) {
				  if (objectTwo.hasOwnProperty(key) === true) {
					  //数字值转为string类型，前后端加密规则保持一致
					  if (this.myIsNaN(objectTwo[key])) {
						  objectTwo[key] = objectTwo[key].toString();
					  }
					  objectOne[key] = objectTwo[key];
				  }
			  }
		  }
		  return objectOne;
	  },

	  urlEncode(param, key, encode) {
		  if (param == null) return "";
		  let paramStr = "";
		  let t = typeof param;
		  if (t == "string" || t == "number" || t == "boolean") {
			  paramStr +=
				  "&" +
				  key +
				  "=" +
				  (encode == null || encode ? encodeURIComponent(param) : param);
		  } else {
			  for (let i in param) {
				  let k =
					  key == null
						  ? i
						  : key + (param instanceof Array ? "[" + i + "]" : "." + i);
				  paramStr += this.urlEncode(param[i], k, encode);
			  }
		  }
		  return paramStr;
	  },

	  getDateTimeToString() {
		  const date_ = new Date();
		  const year = date_.getFullYear();
		  let month = date_.getMonth() + 1;
		  let day = date_.getDate();
		  if (month < 10) month = "0" + month;
		  if (day < 10) day = "0" + day;
		  let hours = date_.getHours();
		  let mins = date_.getMinutes();
		  let secs = date_.getSeconds();
		  const msecs = date_.getMilliseconds();
		  if (hours < 10) hours = "0" + hours;
		  if (mins < 10) mins = "0" + mins;
		  if (secs < 10) secs = "0" + secs;
		  if (msecs < 10) secs = "0" + msecs;
		  return year + "" + month + "" + day + "" + hours + "" + mins + "" + secs;
	  },

	  myIsNaN(value) {
		  return typeof value === "number" && !isNaN(value);
	  }
  },
};
