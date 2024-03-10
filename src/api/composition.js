import fly from '@/jslibs/dk-flyio'

// 作文题库-查询列表
export const getCompositionList = params => fly.get('/composition/library/list', params)

// 作文收藏-查询列表
export const getCompositionCollectList = params => fly.get('/composition/favorites/list', params)

// 作文模块-字典配置列表查询
export const getCompositionDictList = params => fly.get(`/composition/config/query/${params.type}`)

// 作文收藏-添加
export const addCompositionCollect = params => fly.post('/composition/favorites/add', params)

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
