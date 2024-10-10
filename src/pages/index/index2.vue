<template>
  <view class="container">
    <button @click="connectWebSocket">Connect to WebSocket</button>
    <view v-if="webSocketConnected">
      <view>Connected to WebSocket!</view>
      <input v-model="message" placeholder="Enter message" />
      <button @click="sendMessage">Send Message</button>
    </view>
    <view v-else>
      <view>Not connected to WebSocket</view>
    </view>
  </view>
</template>

<script>
import store from '@/store/';
import {closeSocket, connectVerify} from "../../api/aiFriend";
import {initWebsocket, createWebsocket} from "../../api/socket";

export default {
  data() {
    return {
      webSocketConnected: false,
      webSocketInstance: null,
      message: '',
      sessionId: ''
    }
  },
  methods: {
    // 初始化
    connectWebSocket() {
      // 请求接口
      var memberNo = store.state.userInfo.memberNo
      this.webSocketInstance = uni.connectSocket({
        url: initWebsocket + memberNo,
        success: () => {
          this.createSocketTask()
        },
        fail: (err) => {
          console.log("WebSocket连接失败")
          console.log('Error connecting to WebSocket:', err)
        }
      })
    },
    // 创建socket连接
    createSocketTask() {
      this.webSocketInstance = uni.connectSocket({
        url: createWebsocket,
        success: (res) => {
          console.log("创建WebSocket连接成功", res)
          this.webSocketConnected = true
          this.heartCheck()
        },
        fail: (err) => {
          console.log("WebSocket连接失败")
          console.log('Error connecting to WebSocket:', err)
        }
      })

      this.webSocketInstance.onMessage((res) => {
        console.log("res")
        this.sessionId = res.data
      })

      this.webSocketInstance.onClose((res) => {
        console.log('WebSocket connection closed:', res)
        this.webSocketConnected = false
      })
    },
    // 发送消息
    sendMessage() {
      this.webSocketInstance.send({
        data: this.message
      })
      this.message = ''
    },
    // 定时心跳验证
    heartCheck() {
      // 每60s发送一次心跳验证
      setInterval(() => {
        connectVerify({sessionId: this.sessionId}).then(res => {
          console.log(res, "心跳验证")
        })
      }, 6000)
    },
    closeSocket() {
      closeSocket().then(res => {
        console.log(res, "关闭socket")
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
