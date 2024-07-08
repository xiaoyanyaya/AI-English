const devDomain = 'https://wapi-dev.aien.xiaolixb.com/v1' // 测试环境
const proDomain = 'https://wapi.aien.xiaolixb.com/v1' // 生产环境

const ENV = 'pro' // dev -测试 pro -生产

// #ifdef MP-WEIXIN
let path = "";
// ---------------- 根据微信开发环境配置请求地址 --------------------
// 获取当前帐号信息
const accountInfo = wx.getAccountInfoSync();
console.log("accountInfo", accountInfo)
// env类型 develop:开发版、trial:体验版、release:正式版
const envWx = accountInfo.miniProgram.envVersion;
if(envWx === 'release'){
	path = proDomain
}else{
	path = devDomain
}
// #endif

const apiDomain = path
export {
  ENV,
  apiDomain,
}
