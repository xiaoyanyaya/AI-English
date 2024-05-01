import fly from '@/jslibs/dk-flyio'

// 作文题库-查询列表
export const getCompositionList = params => fly.get('/composition/library/list', params)

// 作文模块-字典配置列表查询
export const getCompositionDictList = params => fly.get(`/composition/config/query/${params.type}`)

// 作文习题-添加或修改
export const addCompositionExercise = params => fly.post('/composition/exercise/addOrEdit', params)

// AIGC-作文题目的生成
export const getAIGCComposition = params => fly.post('/composition/aigc/title', params)

// AIGC-作文批改内容的生成
export const getAIGCCorrection = params => fly.post('/composition/aigc/correct', params)

// AIGC-AI范文点评内容的生成
export const getAIGCComment = params => fly.post('/composition/aigc/review', params)

// AIGC-作文帮写范文的生成
export const getAIGCWrite = params => fly.post('/composition/aigc/text', params)

// 拍照识别接口
export const getPhotoRecognition = params => fly.post('/ocr/record/service', params)


// 疯狂挑战 -> 作文题目 -> 本周必战题目接口
export const getChallengeCompositionWeek = params => fly.get('/composition/library/challenge', params)
// 疯狂挑战 -> 作文题目 -> 题目挑战次数统计
export const getChallengeCompositionCount = params => fly.get('/composition/favorites/countChallenge', params)
// 疯狂挑战 -> 作文题目 -> 题目挑战者列表
export const getChallengeCompositionList = params => fly.get('/composition/favorites/queryChallengeList', params)
// 疯狂挑战 -> 作文题目 -> 总排行榜
export const getChallengeCompositionRank = params => fly.get('/composition/favorites/countChallengeTop', params)
// 疯狂挑战 -> 作文题目 -> 本人排行榜信息
export const getChallengeCompositionSelf = params => fly.get('/composition/favorites/countChallengeMyself', params)



// 作文收藏-查询列表
export const getCompositionCollectList = params => fly.get('/composition/favorites/list', params)
// 作文收藏-添加
export const addCompositionCollect = params => fly.post('/composition/favorites/add', params)
// 我的作文库 -> 删除收藏（将记录设置为失效）
export const deleteCompositionCollect = params => fly.post('/composition/favorites/updateStatus', params)



// 我的作文库 -> 查询收藏的作文
export const getCompositionCollect = params => fly.get('/composition/collect/list', params)
// 我的作文库 -> 收藏他人作文
export const addCompositionCollectOther = params => fly.post('/composition/collect/add', params)

// 我的作文库 -> 取消收藏（将记录设置为失效）
export const deleteCompositionCollectOther = params => fly.post('/composition/collect/cancel', params)

// 我的作文库 -> 删除收藏（将记录设置为失效）
export const deleteCancelCompositionCollectOther = params => fly.post('/composition/collect/updateStatus', params)



// 我的作文库 -> 查询收藏记录的信息
export const getCompositionCollectInfo = params => fly.get('/composition/favorites/queryById', params)
