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
import {closeSocket, connectVerify} from "../../api/aiFriend";

export default {
  data() {
    return {
      webSocketConnected: false,
      webSocketInstance: null,
      message: '',
      userUuid: "1782439167786565634"
    }
  },
  methods: {
    connectWebSocket() {
      console.log(this.userUuid, "userUuid")
      this.webSocketInstance = uni.connectSocket({
        // url: 'ws://124.222.224.186:8800',
        url: 'wss://wapi-dev.aien.xiaolixb.com/v1/socket/member/' + this.userUuid,
        success: () => {
          console.log('WebSocket connected success')
          this.webSocketConnected = true
        },
        fail: (err) => {
          console.log("WebSocket连接失败")
          console.log('Error connecting to WebSocket:', err)
        }
      })

      this.webSocketInstance.onMessage((res) => {
        console.log('Received WebSocket message:', res.data)
      })

      this.webSocketInstance.onClose((res) => {
        console.log('WebSocket connection closed:', res)
        this.webSocketConnected = false
      })
    },
    sendMessage() {
      this.webSocketInstance.send({
        data: this.message
      })
      this.message = ''
    },
    // 定时心跳验证
    heartCheck() {
      connectVerify().then(res => {
        console.log(res, "心跳验证")
      })
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
