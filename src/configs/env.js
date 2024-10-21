const devApiDomain = "https://wapi-dev.aien.xiaolixb.com/v1"; // API测试环境
const prodApiDomain = "https://wapi.aien.xiaolixb.com/v1"; // API生产环境

const devH5Domain = "https://wapi-dev.aien.xiaolixb.com/h5"; // H5测试环境
const prodH5Domain = "https://wapi.aien.xiaolixb.com/h5"; //H5生产环境

const ENV = "dev"; // dev -测试 pro -生产

// #ifdef MP-WEIXIN
let apiPath = "";
let h5path = "";
// ---------------- 根据微信开发环境配置请求地址  --------------------
// 获取当前帐号信息
const accountInfo = wx.getAccountInfoSync();
console.log("accountInfo", accountInfo);
// env类型 develop:开发版、trial:体验版、release:正式版
const envWx = accountInfo.miniProgram.envVersion;
if (envWx === "release") {
  apiPath = prodApiDomain;
  h5path = prodH5Domain;
} else {
  apiPath = devApiDomain;
  h5path = devH5Domain;
}
// #endif

const apiDomain = apiPath;
const h5Domain = h5path;

export { ENV, apiDomain, h5Domain };
