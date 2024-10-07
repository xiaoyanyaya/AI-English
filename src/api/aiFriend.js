import fly from '@/jslibs/dk-flyio'

// AI好友-查询列表
export const getAIFriendList = params => fly.get('/digitalhuman/image/list', params)

// 切换虚拟人
export const switchVirtual = params => fly.post('/digitalhuman/image/switch', params)

// 默认虚拟人
export const defaultVirtual = params => fly.get('/digitalhuman/image/default', params)

// 场景分类 /digitalhuman/scene/category/list
export const sceneCategoryList = params => fly.get('/digitalhuman/scene/category/list', params)

// 可选场景 /digitalhuman/scene/list
export const sceneList = params => fly.get('/digitalhuman/scene/list', params)

// 切换场景 /digitalhuman/scene/switch
export const sceneSwitch = params => fly.post('/digitalhuman/scene/switch', params)

// 自定义场景-生成随机话题 /digitalhuman/scene/randomSceneName
export const randomSceneName = params => fly.get('/digitalhuman/scene/randomSceneName', params)

// 自定义场景-确定随机话题 /digitalhuman/scene/customScene
export const customScene = params => fly.post('/digitalhuman/scene/customScene', params)


// 定时心跳验证 https://dev-wapi.aien.xiaolixb.com/v1/socket/connect/verify/{sessionId}
export const connectVerify = params => fly.get(`/socket/connect/verify/${params.sessionId}`)

// 手动清除socket连接 https://dev-wapi.aien.xiaolixb.com/v1/socket/connect/closeSocket/{socketId}
export const closeSocket = params => fly.get(`/socket/connect/closeSocket/${params.socketId}`)
