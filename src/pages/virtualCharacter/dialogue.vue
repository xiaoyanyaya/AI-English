<template>
  <view>
    <cy-navbar showBack>
      <view class="t-size-30">虚拟人对练</view>
    </cy-navbar>

    <view class="content-box" :style="contentBoxStyle">
      <view class="translate-btn pl-4">
        <image src="/static/logo.png"/>
      </view>

      <view class="dialogue-content flex flex-direction-column pl-4">
        <view v-for="(item, index) in dialogueContent" :key="index">
          <view class="flex mt-3">
            <view :class="item.isSelf ? 'self-icon' : 'no-self-icon'"></view>
            <view>
              <view>
                <text>{{ item.content }}</text>
              </view>
              <view class="mt-1">
                <text>{{ item.translate }}</text>
              </view>
            </view>
          </view>
        </view>

        <view class="options-btns-box flex align-item-center justify-content-around">
          <view v-for="(item, index) in optionsList" :key="index" @click="clickOptions(index)">
            <view class="iconfont btn-icon">{{item.icon}}</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="isShowPopup">
      <view class="popup-mask" @click="isShowPopup = false"></view>
      <view class="popup-content flex flex-direction-column justify-content-around align-item-center">
        <view>
          <text class="font-weight-bold">是否确认结束当前对话？</text>
        </view>
        <view class="flex align-item-center justify-content-center end-view-report"  @click="$navigateTo('/pages/virtualCharacter/resultReport')">
          <view class="mr-2 iconfont">&#xe63e;</view>
          <view>
            <text>结束并查看对话报告</text>
          </view>
        </view>
        <view class="flex align-item-center justify-content-center end-report">
          <view class="mr-2 iconfont">&#xe632;</view>
          <view>
            <text>直接结束对话</text>
          </view>
        </view>
      </view>
    </view>
    <button @click="playVoice">播放</button>
  </view>
</template>

<script>
import cyNavbar from "@/components/cy-navbar.vue";
import cyTabbar from "@/components/cy-tabbar.vue";
import {getAiDialogue} from "@/api/aiDialogue";
import {apiDomain} from "@/configs/env";
import state from "@/store/state";

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;
export default {
  components: {cyTabbar, cyNavbar},
  data() {
    return {
      otherHeight: {
        statusBarHeight: 0,
        navContentHeiht: 80,
        tabbarHeight: 110
      },
      //对话内容
      dialogueContent: [
        {
          icon: '',
          content: 'Hey，how are you doing?',
          translate: '嘿，你好吗？',
          isSelf: true
        }, {
          icon: '',
          content: 'Not very well. I\'m feeling upset today.',
          translate: '不太好。我今天心情不好。',
          isSelf: false
        }, {
          icon: '',
          content: 'I\'m sorry to hear that.Have you ever experienced something like this',
          translate: '听到这个我很难过。你有没有经历过这样的事情？',
          isSelf: true
        }
      ],

      optionsList: [
        {title: '', icon: '\ue73c', path: ''},
        {title: '', icon: '\ue6e1', path: ''},
        {title: '', icon: '\ueac2', path: ''},
        {title: '', icon: '\ue640', path: ''},
      ],

      isShowPopup: false,
      isStartRecord: false,
    }
  },
  onLoad() {
    this.getSystemInfo();
    let self = this;

    // 授权录音
    uni.authorize({
      scope: 'scope.record',
      success() {
        console.log('录音授权成功');
      },
      fail() {
        console.log('录音授权失败');
      }
    });
    // 录音结束事件
    recorderManager.onStop((res) => {
      self.voicePath = res.tempFilePath;
      const tempFilePath = res.tempFilePath;
      console.log('tempFilePath', tempFilePath)
      uni.getFileSystemManager().readFile({
        filePath: tempFilePath,
        encoding: 'base64',
        success: (res) => {
          self.network().getAiDialogue(res.data);
        }
      });

    });``
  },
  computed: {
    contentBoxStyle() {
      return `height: calc(100vh - ${this.otherHeight.statusBarHeight + this.otherHeight.navContentHeiht}px);`
    }
  },
  methods: {
    clickOptions(index) {
      if (index === 1) {
        console.log('开始录音');
        this.isStartRecord = !this.isStartRecord
        if (this.isStartRecord) {
          recorderManager.start({
            duration: 60000, // 录音的最大时长，单位 ms，最大值 600000（10 分钟）
            sampleRate: 16000, // 采样率
            numberOfChannels: 1, // 录音通道数
            encodeBitRate: 48000, // 编码码率
            format: 'aac' // 音频格式，支持 'aac' 或 'mp3'
          });
          this.optionsList[1].icon = '\ue676';
        } else {
          recorderManager.stop();
          this.optionsList[1].icon = '\ue6e1';
        }
      }
      if (index === 3) {
        this.isShowPopup = true;
      }
    },
    playVoice() {
      console.log('播放录音');
      console.log(this.voicePath)
      if (this.voicePath) {
        innerAudioContext.src = this.voicePath;
        innerAudioContext.play();
      }
    },
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.otherHeight.statusBarHeight = res.statusBarHeight;

          // upx转px
          this.otherHeight.navContentHeiht = uni.upx2px(this.otherHeight.navContentHeiht);
        }
      });
    },
    network() {
      return {
        getAiDialogue: async (base64) => {
          this.network().sseRequestTask({
            url: '/digitalhuman/asr/voiceToTextStream',
            method: 'post',
            data: {
              voiceFormat: 'm4a',
              voiceData: base64,
              voiceDataLen: base64.length
            }
          })
        },
        sseRequestTask: async ({url, data, method = 'POST'}) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              uni.showLoading({
                mask: true,
                title: '内容生成中...'
              })
              this.disabledBtn = true
            }, 500)
            const requestTask = uni.request({
              url: `${apiDomain}${url}`,
              timeout: 15000,
              responseType: 'text',
              method,
              enableChunked: true,
              data,
              header: {
                'X-Access-Token': state.token,
              },
              success: response => {
                console.log('response', response)
                resolve(response)
              },
              fail: error => {
                console.log('error', error)
              }
            });
            requestTask.onHeadersReceived(function (res) {
            });
            requestTask.onChunkReceived((res) => {
              console.log(res)

              /*const uint8Array = new Uint8Array(res.data);
              let text = String.fromCharCode.apply(null, uint8Array);
              text = decodeURIComponent(escape(text));
              if (!text.startsWith('data:')) {
                text = 'data:' + text
              }
              let arr = text.split('\n')
              arr.forEach((item) => {
                console.log(item," item")

                if (item.includes('data:') && !item.includes('[DONE]')) {
                  let text = item.replace('data:', '')
                  text = text.replaceAll("「`」", " ").replaceAll("「·」", "<p></p>").replaceAll("「~」", "<p></p>")

                  console.log(text, 'text')
                } else if (item.includes('data:[DONE]')) {
                  console.log('结束')


                  // 关闭请求
                  requestTask.abort()
                } else {
                  requestTask.abort
                }
              })*/
            })
          })
        },
      }
    }
  },
}
</script>

<style scoped>
.content-box {
  width: 100vw;
  overflow: hidden;
  background-image: url('https://c-ssl.dtstatic.com/uploads/item/202003/31/20200331123100_nBc5m.thumb.1000_0.jpeg');
  background-size: cover;
  position: relative;
}

.translate-btn {
  position: absolute;
  top: 560rpx;
}
.translate-btn image {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
}

.dialogue-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 630rpx;
  background: linear-gradient(180deg, rgba(232, 242, 255, 0) 0%, rgba(228, 240, 255, 0.77) 38%, #B8D8FF 66%);
}
.self-icon, .no-self-icon {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  margin-right: 15rpx;
  margin-top: 12rpx;
}
.self-icon {
  background: #3a73d9;
}
.no-self-icon {
  background: #11D051;
}

.options-btns-box {
  position: absolute;
  bottom: 50rpx;
  width: 670rpx;
  left: 45rpx;
  height: 110rpx;
  border-radius: 56px;
  opacity: 1;
  background: linear-gradient(180deg, #5D97FD 0%, #1157D0 100%);
  padding: 0 20rpx;
  box-sizing: border-box;
}
.btn-icon {
  color: #ffffff;
  font-size: 46rpx;
}

.popup-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.popup-content {
  position: absolute;
  width: 750rpx;
  height: 450rpx;
  bottom: 0;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 50rpx 0;
}
.end-view-report {
  width: 670rpx;
  height: 100rpx;
  border-radius: 50rpx;
  background: linear-gradient(180deg, #5D97FD 0%, #1157D0 100%);
  color: #ffffff;
}
.end-view-report .iconfont {
  font-size: 40rpx;
}
.end-report {
  font-size: 28rpx;
  color: #1863E5;
}
.end-report .iconfont {
  font-size: 30rpx;
}
</style>
