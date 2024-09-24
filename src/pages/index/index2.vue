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
export default {
  data() {
    return {
      webSocketConnected: false,
      webSocketInstance: null,
      message: ''
    }
  },
  methods: {
    connectWebSocket() {
      this.webSocketInstance = uni.connectSocket({
        // url: 'ws://124.222.224.186:8800',
        url: 'wss://demoapi.xiaolixb.com/api/socket/user/1731834944937824257',
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
