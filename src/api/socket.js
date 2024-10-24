import fly from '@/jslibs/dk-flyio'

var baseUrl = 'wss://wapi-dev.aien.xiaolixb.com/v1/';

// 1.初始化Websocket wss://wapi-dev.aien.xiaolixb.com/v1/socket/member/{memberNo}
export const initWebsocket = baseUrl + "socket/member/"


// 2.创建Websocket连接 wss://wapi-dev.aien.xiaolixb.com/v1/socket/chat
export const createWebsocket = baseUrl + "socket/chat"

// 3.获取对话语音文件URI【Websocket】 wss://wapi-dev.aien.xiaolixb.com/v1/socket/file/{connectId}
export const getVoiceFile = baseUrl + "socket/file/"

