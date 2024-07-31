import fly from '@/jslibs/dk-flyio'

// 会员基本信息 /member/baseinfo
export const baseInfo = params => fly.get('/member/baseinfo', params)

// 会员修改头像 /member/saveAvatar
export const saveAvatar = params => fly.post('/member/saveAvatar', params)

//会员修改昵称 /member/saveNickname
export const saveNickname = params => fly.post('/member/saveNickname', params)

//VIP会员套餐 /operation/charge/vip/package
export const vipPackage = params => fly.get('/operation/charge/vip/package', params)

//开通VIP会员 /member/vip/buy
export const vipBuy = params => fly.post('/member/vip/buy', params)

//卡密兑换 /member/card/exchange
export const cardExchange = params => fly.post('/member/card/exchange', params)

//首页 /member/commission/index
export const commissionIndex = params => fly.get('/member/commission/index', params)
//佣金提现列表 /distribution/commission/withdraw/list
export const withdrawList = params => fly.get('/distribution/commission/withdraw/list', params)
//佣金提现申请 /distribution/commission/withdraw/apply
export const withdrawApply = params => fly.post('/distribution/commission/withdraw/apply', params)
//佣金明细列表 /distribution/commission/detail/list
export const detailList = params => fly.get('/distribution/commission/detail/list', params)
//下级推广员   /distribution/promotion/referral/directPromoters
export const directPromoters = params => fly.get('/distribution/promotion/referral/directPromoters', params)
//推广订单 /distribution/promotion/order/list
export const orderList = params => fly.get('/distribution/promotion/order/list', params)
//直推用户 /distribution/promotion/referral/directReferrals
export const directReferrals = params => fly.get('/distribution/promotion/referral/directReferrals', params)


// 用户协议 /article/userAgreement/detail
export const userAgreement = params => fly.get('/article/userAgreement/detail', params)
// 隐私政策 /article/privacyPolicy/detail
export const privacyPolicy = params => fly.get('/article/privacyPolicy/detail', params)
// 使用帮助 /article/userGuide/detail
export const userGuide = params => fly.get('/article/userGuide/detail', params)
// 关于 /article/aboutUs/detail
export const aboutUs = params => fly.get('/article/aboutUs/detail', params)

// 基础数据 /app/common/basicData get
export const basicData = params => fly.get('/app/common/basicData', params)
// 会员修改英语水平 /member/modifyEnglishLevel post
export const modifyEnglishLevel = params => fly.post('/member/modifyEnglishLevel', params)
// 会员修改年级 /member/modifyGrade post
export const modifyGrade = params => fly.post('/member/modifyGrade', params)

