import fly from "@/jslibs/dk-flyio";

// 小程序用户登录
export const login = (params) => fly.post("/weixin/getWxLoginInfo", params);

// 小程序用户手机信息
export const getPhone = (params) => fly.get("/weixin/getWxPhoneInfo", params);

//基础能力 - 微信OAuth2.0登录回调
export const getSourceCB = (params) =>
  fly.get(`/weixin/oauth2/callback`, params);
