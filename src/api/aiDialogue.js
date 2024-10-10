import fly from '@/jslibs/dk-flyio'


// 语音识别文字
export const getAiDialogue = params => fly.post('/digitalhuman/asr/voiceToTextStream', params)

// 聊天会话列表
export const getAiDialogueList = params => fly.get('/digitalhuman/chat/session/list', params)

// 聊天记录列表
export const getAiDialogueRecordList = params => fly.get('/digitalhuman/chat/record/list', params)

// 保存语音转文字
export const saveVoiceText = params => fly.post('/digitalhuman/asr/saveVoiceText', params)

// 1.创建SSE连接 https://wapi-dev.aien.xiaolixb.com/v1/digitalhuman/v2/sse/connect
export const createSseConnect = params => fly.get('/digitalhuman/v2/chat/sse/connect', params)

// 虚拟人对话初始化 digitalhuman/chat/init
export const getChatInit = params => fly.get('/digitalhuman/v2/chat/init', params)

// 获取AI语音 /digitalhuman/chat/aiVoiceResult
export const getAiVoiceResult = params => fly.post('/digitalhuman/chat/aiVoiceResult', params)

// 虚拟人对话 https://wapi-dev.aien.xiaolixb.com/v1/digitalhuman/v2/chat/send
export const sendChat = params => fly.post('/digitalhuman/v2/chat/send', params)
