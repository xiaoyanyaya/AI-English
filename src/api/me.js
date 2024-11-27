import fly from "@/jslibs/dk-flyio";

// 会员基本信息 /member/baseinfo
export const baseInfo = (params) => fly.get("/member/baseinfo", params);

// 会员修改头像 /member/saveAvatar
export const saveAvatar = (params) => fly.post("/member/saveAvatar", params);

//会员修改昵称 /member/saveNickname
export const saveNickname = (params) =>
  fly.post("/member/saveNickname", params);

//VIP会员套餐 /operation/charge/vip/package
export const vipPackage = (params) =>
  fly.get("/operation/charge/vip/package", params);

//开通VIP会员 /vip/order/buy
export const vipBuy = (params) => fly.post("/vip/order/buy", params);

//卡密兑换 /member/card/exchange
export const cardExchange = (params) =>
  fly.post("/member/card/exchange", params);

//首页 /distribution/commission/summary/index
export const commissionIndex = (params) =>
  fly.get("/distribution/commission/summary/index", params);
//佣金提现列表 /distribution/commission/withdraw/list
export const withdrawList = (params) =>
  fly.get("/distribution/commission/withdraw/list", params);
//佣金提现申请 /distribution/commission/withdraw/apply
export const withdrawApply = (params) =>
  fly.post("/distribution/commission/withdraw/apply", params);
//佣金明细列表 /distribution/commission/detail/list
export const detailList = (params) =>
  fly.get("/distribution/commission/detail/list", params);
//下级推广员   /distribution/promotion/partner/directPartners
export const directPromoters = (params) =>
  fly.get("/distribution/promotion/partner/directPartners", params);
//推广订单 /distribution/promotion/order/list
export const orderList = (params) =>
  fly.get("/distribution/promotion/order/list", params);
//直推用户 /distribution/promotion/partner/directReferrals
export const directReferrals = (params) =>
  fly.get("/distribution/promotion/partner/directReferrals", params);

// 用户协议 /article/userAgreement/detail
export const userAgreement = (params) =>
  fly.get("/article/userAgreement/detail", params);
// 隐私政策 /article/privacyPolicy/detail
export const privacyPolicy = (params) =>
  fly.get("/article/privacyPolicy/detail", params);
// 使用帮助 /article/userGuide/detail
export const userGuide = (params) =>
  fly.get("/article/userGuide/detail", params);
// 关于 /article/aboutUs/detail
export const aboutUs = (params) => fly.get("/article/aboutUs/detail", params);
// 推广协议 /article/promoAgreement/detail
export const promoAgreement = (params) =>
  fly.get("/article/promoAgreement/detail", params);

// 购买协议 /article/payAgreement/detail
export const payAgreement = (params) =>
  fly.get("/article/payAgreement/detail", params);

// 基础数据 /app/common/basicData get
export const basicData = (params) => fly.get("/app/common/basicData", params);
// 会员修改英语水平 /member/modifyEnglishLevel post
export const modifyEnglishLevel = (params) =>
  fly.post("/member/modifyEnglishLevel", params);
// 会员修改年级 /member/modifyGrade post
export const modifyGrade = (params) => fly.post("/member/modifyGrade", params);
// 会员修改兴趣爱好 /member/modifyTags post
export const modifyTags = (params) => fly.post("/member/modifyTags", params);

// 小程序发起支付前需要准备的请求参数 /weixin/getPrepayPaymentResponse post
export const getPrepayPaymentResponse = (params) =>
  fly.post("/weixin/getPrepayPaymentResponse", params);

// APP发起支付前需要准备的请求参数 /weixin/getAppNeedParam post
export const getAppNeedParam = (params) =>
  fly.post("/weixin/getAppNeedParam", params);

// 申请合作商 /distribution/promotion/partner/apply post
export const partnerApply = (params) =>
  fly.post("/distribution/promotion/partner/apply", params);

//小程序客服接入消息
export const sendCustomMessage = () => fly.get("/weixin/sendCustomMessage");

// 会员推广码 /weixin/promoQRCode
export const promoQRCode = (params) => fly.get("/weixin/promoQRCode", params);
