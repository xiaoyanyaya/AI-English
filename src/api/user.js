import fly from '@/jslibs/dk-flyio'

// 小程序用户登录
export const login = params => fly.get('/weixin/getWxLoginInfo', params)

// 小程序用户手机信息
export const getPhone = params => fly.get('/weixin/getWxPhoneInfo', params)
