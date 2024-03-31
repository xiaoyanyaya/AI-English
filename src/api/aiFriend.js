import fly from '@/jslibs/dk-flyio'

// AI好友-查询列表
export const getAIFriendList = params => fly.get('/digitalhuman/image/list', params)

// 切换虚拟人
export const switchVirtual = params => fly.post('/digitalhuman/image/switch', params)

// 默认虚拟人
export const defaultVirtual = params => fly.get('/digitalhuman/image/default', params)
