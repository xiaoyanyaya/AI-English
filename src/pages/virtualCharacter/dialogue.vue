<template>
  <view class="main-body">
    <cy-navbar showBack isAbsolute>
      <view class="t-size-30">虚拟人对练</view>
    </cy-navbar>
<!--    <button @click.stop="test" style="position: absolute; top: 200rpx;z-index: 10001">test</button>-->
    <view class="content-box" :style="contentBoxStyle">
      <view class="mark-bg"></view>
      <view class="flex align-item-center justify-content-center">
        <image :src="personInfo.avatarLarge" class="scene-img"></image>
      </view>

      <view class="translate-btn pl-4">
<!--        <image :src="`${imageBaseUrl}/s1.png`"/>-->
      </view>

      <view class="dialogue-content flex flex-direction-column pl-4">
        <scroll-view :scroll-top="scrollTop" scroll-y="true"
                     @scroll="scroll"
                     upper-threshold="0"
                     lower-threshold="0"
                     @scrolltoupper="scrollToUpper"
                     @scrolltolower="scrollToLower"
                     ref="scrollViewRef"
                     class="content">
          <view v-for="(item, index) in dialogueContent" :key="index" class="content-item">
            <view class="flex mt-3" v-if="!item.noShow">
              <view :class="item.isSelf ? 'self-icon' : 'no-self-icon'"></view>
              <view style="width: 650rpx;" :class="item.isSelf ? 'self-color' : 'no-self-color'">
                <view>
                  <rich-text v-if="item.content" :nodes="item.content"></rich-text>
                  <image v-else :src="`${imageBaseUrl}/5-10-1.gif`" mode="widthFix" class="waitImage"></image>
                </view>
                <view class="mt-1 flex" @click.native.stop="playVoice(item.mp3Url, index, item)">
                  <view style="margin-top: 8rpx" class="mr-2">{{ item.translate }}</view>
                  <view v-if="item.mp3Url" class="paly-btn">
                    <image v-if="!item.isPlay" :src="`${imageBaseUrl}/5-19-03.png`"></image>
                    <image v-else :src="`${imageBaseUrl}/5-19-02.gif`"></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view style="height: 20rpx; width: 100%"></view>
        </scroll-view>

        <view class="speck-btn">
          <image
            @longpress="onLongPress"
            @touchend="onTouchEnd"
            v-if="!isTlaking" :src="`${imageBaseUrl}/speak.png`" class="speck-icon"></image>
          <image
            @longpress="onLongPress"
            @touchend="onTouchEnd"
            v-else :src="`${imageBaseUrl}/5-10-2.gif`" class="speck-icon2"></image>
        </view>
        <view class="btns-box-mp3">

        </view>

      </view>
    </view>

    <view v-if="isInit" class="t-size-40 t-color-1a9bff init-box">
      <view>虚拟人连接中...</view>
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
  </view>
</template>

<script>
import cyNavbar from "@/components/cy-navbar.vue";
import cyTabbar from "@/components/cy-tabbar.vue";
import {getAiVoiceResult, getChatInit, saveVoiceText} from "@/api/aiDialogue";
import {apiDomain} from "@/configs/env";
import store from '@/store/';
import {defaultVirtual} from "@/api/aiFriend";
import MyMixin from "@/utils/MyMixin";

const recorderManager = uni.getRecorderManager();

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()

export default {
  mixins: [MyMixin],
  components: {cyTabbar, cyNavbar},
  data() {
    return {
      otherHeight: {
        statusBarHeight: 0,
        navContentHeiht: 80,
        tabbarHeight: 110
      },
      //对话内容
      dialogueContent: [],
      //是否摁住说话
      isTlaking: false,

      isShowPopup: false,
      isStartRecord: false,
      currentText:"",
      sendData: {
        voiceDuration: 0,
        voiceFormat: 'mp3',
        voiceFile: '',
        voiceDataLen: '',
        voiceResultText: '',
        voiceResultTextCn: '',
        lang: 'en_US'
      },
      personInfo: {},
      scrollTop: 99999,
      chatInit: {},
      deviceBrand: 'android',
      palyIndex: 0,
      innerAudioContext: {},

      // 是否正在初始化
      isInit: true,
    }
  },
  // 页面销毁
  onUnload() {
    thi.innerAudioContext.stop()
  },
  onLoad(res) {
    this.innerAudioContext = uni.createInnerAudioContext();
    this.innerAudioContext.autoplay = true;
    this.network().defaultVirtual();
    this.initRecord()
    this.network().getChatInit(res.sceneId);
    // this.test()

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

      /*uni.getFileSystemManager().getFileInfo({
        filePath: tempFilePath,
        success: (res) => {
        }
      })*/
    });
    this.innerAudioContext.onEnded((res) => {
      this.dialogueContent.forEach(d => d.isPlay = false)
    })
  },
  computed: {
    contentBoxStyle() {
      return `height: calc(100vh - ${this.otherHeight.statusBarHeight + this.otherHeight.navContentHeiht}px);`
    }
  },
  methods: {
    test() {
      this.dialogueContent.push({
        content: "Hello, where are you from?",
        icon: "",
        isSelf: true,
        isPlay: false,
        mp3Url: "https://wapi-dev.aien.xiaolixb.com/v1/sys/common/static/digitalhuman/voice/tmp_1236bf6ffc82f634cfbf88a88d4de5197b759db275700abf_1716113891940.mp3",
        translate: "你好，你是哪里你是哪里人你是哪里人你是哪里人你是哪里人人"
      })
      this.toScrollerViewBottom()
    },
    initRecord: function(){
      manager.onRecognize = (res) => {
      }
      // 识别结束事件
      manager.onStop = (res) => {
        let text = res.result
        if(text == '') {
          return
        }
        this.currentText = text
        this.voicePath = res.tempFilePath;

        // 保存发送的数据 英文转换成中文
        this.translateUsToCn(res, text);
      }
    },
    toScrollerViewBottom() {
      const query = uni.createSelectorQuery().in(this);
      query.selectAll('.content-item').boundingClientRect(data => {
        if (data && data.length) {
          let height = 0;
          data.forEach(rect => {
            height += rect.height + 20;
          });
          this.scrollTop = height;
        }
      }).exec();
    },
    scroll(e) {
    },
    scrollToUpper(e) {
      console.log('顶部', e)
    },
    scrollToLower(e) {
      console.log('底部', e)
    },
    // 保存发送的数据
    translateUsToCn(res, text) {
      plugin.translate({
        lfrom: 'en_US',
        lto: 'zh_CN',
        content: text,
        success: (result) => {
          this.sendData.voiceDuration = parseInt(res.duration)
          this.sendData.voiceFile = res.tempFilePath;
          this.sendData.voiceDataLen = res.fileSize;
          this.sendData.voiceResultText = text;
          this.sendData.voiceResultTextCn = result.result;

          this.dialogueContent.push({
            icon: '',
            content: this.sendData.voiceResultText,
            translate: this.sendData.voiceResultTextCn,
            isPlay: false,
            isSelf: true
          })
          this.toScrollerViewBottom()
          this.network().saveVoiceText(this.dialogueContent.length - 1)

          // 初始化
          this.dialogueContent.push({
            icon: '',
            content: '',
            translate: '',
            isPlay: false,
            isSelf: false
          })
          this.network().sseRequestTask({
            url: '/digitalhuman/chat/streamSessionChat',
            method: 'post',
            data: {
              sessionId: this.chatInit.session_id,
              sseEmitterId: this.chatInit.sse_emitter_id,
              message: this.sendData.voiceResultText
            }
          })
        },
        fail: (err) => {
        }
      })
    },
    onLongPress() {
      this.isTlaking = true
      this.innerAudioContext.stop()
      uni.vibrateShort({
        success: function () {
        }
      });
      this.clickOptions(1)
    },
    onTouchEnd() {
      this.isTlaking = false
      this.clickOptions(1)
    },
    clickOptions(index) {
      if (index === 1) {
        this.isStartRecord = !this.isStartRecord
        if (this.isStartRecord) {
          manager.start({
            lang: this.sendData.lang,
          })
        } else {
          manager.stop()
        }
      }
      if (index === 3) {
        this.isShowPopup = true;
      }
    },
    playVoice(voicePath, index, item) {
      if (item && item.isPlay) {
        return
      }

      this.innerAudioContext = uni.createInnerAudioContext();
      this.innerAudioContext.autoplay = true;

      // 判断当前设备
      this.dialogueContent.forEach(d => d.isPlay = false)
      if (index !== undefined) {
        this.$set(this.dialogueContent[index], 'isPlay', true)
        this.palyIndex = index
      }

      if (this.deviceBrand === 'android') {
        uni.downloadFile({
          url: voicePath,
          timeout: 6000000,
          success: (res) => {
            if (res.statusCode === 200) {
              this.innerAudioContext.src = res.tempFilePath;
              this.innerAudioContext.onCanplay(() => {
                console.log(this.innerAudioContext, "音频信息显示")
                this.innerAudioContext.play();
              })
            }
          },
          fail: (error) => {
            console.log(error, 'error')
          }
        })
      } else {
        console.log("苹果播放文件")
        this.innerAudioContext.src = voicePath;
        this.innerAudioContext.obeyMuteSwitch = false;
        this.innerAudioContext.play();
      }

    },
    getSystemInfo() {
      uni.getSystemInfo({
        success: (res) => {
          this.deviceBrand = res.platform;
          this.otherHeight.statusBarHeight = res.statusBarHeight;
          // upx转px
          this.otherHeight.navContentHeiht = uni.upx2px(this.otherHeight.navContentHeiht);
        }
      });
    },
    pushAiDialog(enText, cnText, url) {
      this.dialogueContent.push({
        icon: '',
        content: enText,
        translate: cnText,
        mp3Url: url,
        isPlay: false,
        isSelf: false
      })
    },
    network() {
      return {
        getChatInit: async (sceneId) => {
          let res;
          if (sceneId) {
            res = await getChatInit({
              sceneId: sceneId
            });
          } else {
            res = await getChatInit();
          }
          if (res.data.code === 200) this.isInit = false
          this.chatInit = res.data.result
          this.playVoice(this.chatInit.welcome_speech_voice_file)
          this.pushAiDialog(this.chatInit.welcome_speech_en, this.chatInit.welcome_speech_cn, this.chatInit.welcome_speech_voice_file)
        },
        getAiVoiceResult: async () => {
          const res = await getAiVoiceResult({
            sessionId: this.chatInit.session_id
          });
          console.log(res.data.result, 'res.data.result')
          this.dialogueContent[this.dialogueContent.length - 1].translate = res.data.result.messageTextCn
          this.dialogueContent[this.dialogueContent.length - 1].mp3Url = res.data.result.voiceFile
          setTimeout(() => {
            this.toScrollerViewBottom()
          }, 300)

          setTimeout(() => {
            this.playVoice(res.data.result.voiceFile)
          }, 2000)
        },
        sseRequestTask: async ({url, data, method = 'POST', type}) => {
          return new Promise((resolve, reject) => {
            const requestTask = uni.request({
              url: `${apiDomain}${url}`,
              timeout: 35000,
              responseType: 'text',
              method,
              enableChunked: true,
              data,
              header: {
                'X-Access-Token': store.state.token,
              },
              success: response => {
              },
              fail: error => {
              }
            });
            requestTask.onHeadersReceived(function (res) {

            });
            requestTask.onChunkReceived((res) => {
              const uint8Array = new Uint8Array(res.data);
              let text = String.fromCharCode.apply(null, uint8Array);
              text = decodeURIComponent(escape(text));
              if (!text.startsWith('data:')) {
                text = 'data:' + text
              }
              let arr = text.split('\n')
              arr.forEach((item) => {
                if (item.includes('data:') && !item.includes('[DONE]') && !item.includes('[END]')) {
                  let text = item.replace('data:', '')
                  text = text.replaceAll("「`」", " ").replaceAll("「·」", "<p></p>").replaceAll("「~」", "<p></p>")
                  this.dialogueContent[this.dialogueContent.length - 1].content += text
                  this.toScrollerViewBottom()

                } else if (item.includes('[END]')) {
                  // 关闭请求
                  console.log("关闭请求")
                  requestTask.abort()
                  this.network().getAiVoiceResult()
                } else {
                  /*console.log("关闭请求 else")
                  requestTask.abort()
                  setTimeout(() => {
                    this.network().getAiVoiceResult()
                  }, 2000)*/
                }
              })
            })
          })
        },
        defaultVirtual: async (isRefresh) => {
          const res = await defaultVirtual();
          this.personInfo = res.data.result;
        },
        getAiDialogue: async (base64, length) => {
          this.network().sseRequestTask({
            url: '/digitalhuman/asr/voiceToTextStream',
            method: 'post',
            data: {
              voiceFormat: 'pcm',
              voiceData: base64,
              voiceDataLen: length
            }
          })
        },
        saveVoiceText: async (index) => {
          this.sendData.sessionId = this.chatInit.session_id;
          uni.uploadFile({
            url: `https://wapi-dev.aien.xiaolixb.com/v1/digitalhuman/asr/saveVoiceText`,
            filePath: this.sendData.voiceFile,
            name: 'file',
            formData: this.sendData,
            header: {
              'X-Access-Token': store.state.token,
              'content-type': 'multipart/form-data'
            },
            success: (uploadFileRes) => {
              var data = JSON.parse(uploadFileRes.data)
              this.dialogueContent[index].mp3Url = data.message
              console.log(this.dialogueContent, 'this.dialogueContent')
            },
            fail: (error) => {
            }
          })

        },
      }
    }
  },
}
</script>

<style lang="scss" >
.content-box {
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.translate-btn {
  position: absolute;
  top: 560rpx;
  z-index: 100;
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
  z-index: 999;
  background: linear-gradient(180deg, rgba(232, 242, 255, 0) 0%, rgba(228, 240, 255, 0.77) 38%, #B8D8FF 66%);

  .content {
    position: absolute;
    bottom: 180rpx;
    height: 560rpx;
  }
}
.self-icon, .no-self-icon {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  margin-right: 15rpx;
  margin-top: 12rpx;
}
.self-icon {
  background: #11D051;
}
.no-self-icon {
  background: #3a73d9;
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


.scene-img {
  height: 820rpx;
  width: 750rpx;
  position: absolute;
  bottom: 300rpx;
  z-index: 99;
}

.btns-box-mp3 {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 750rpx;
  height: 150rpx;
  background: linear-gradient(180deg, #FFFFFF 0%, #E7F0FF 100%);
}

.self-color {
  color: #7C7C7C;
}

.no-self-icon {
  color: #3D3D3D;
}

.speck-btn {
  position: fixed;
  bottom: 80rpx;
  left: 0;
  z-index: 1001;
  width: 100%;
  display: flex;
  justify-content: center;

  .speck-icon {
    width: 150rpx;
    height: 150rpx;
  }

  .speck-icon2 {
    position: fixed;
    bottom: 40rpx;
    width: 220rpx;
    height: 220rpx;
  }
}

.waitImage {
  width: 50rpx;
}

.paly-btn {
  display: flex;
  justify-content: flex-end;
  color: #1863E5;
  font-size: 28rpx;
  margin-top: 10rpx;

  image {
    width: 40rpx;
    height: 30rpx;
  }
}

.init-box {
  position: absolute;
  z-index: 9999;
  text-align: center;
  width: 750rpx;
  bottom: 500rpx;
}
</style>
