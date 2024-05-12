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
                <view class="mt-1">
                  <rich-text>{{ item.translate }}</rich-text>
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
import {getChatInit, saveVoiceText} from "@/api/aiDialogue";
import {apiDomain} from "@/configs/env";
import store from '@/store/';
import {defaultVirtual} from "@/api/aiFriend";
import MyMixin from "@/utils/MyMixin";

const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;

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
      chatInit: {}
    }
  },
  onLoad() {

    this.network().defaultVirtual();
    this.initRecord()
    this.network().getChatInit();

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

      uni.getFileSystemManager().getFileInfo({
        filePath: tempFilePath,
        success: (res) => {
          var size = res.size;

          /*uni.getFileSystemManager().readFile({
            filePath: tempFilePath,
            success: (data) => {
              var arrayBuffer = data.data;
              self.network().getAiDialogue(uni.arrayBufferToBase64(arrayBuffer), arrayBuffer.byteLength);
            }
          });*/
          /*uni.getFileSystemManager().readFile({
            filePath: tempFilePath,
            encoding: 'base64',
            success: (res) => {
              self.network().getAiDialogue(res.data, size);
            }
          });*/
        }
      })
    });
  },
  computed: {
    contentBoxStyle() {
      return `height: calc(100vh - ${this.otherHeight.statusBarHeight + this.otherHeight.navContentHeiht}px);`
    }
  },
  methods: {
    test() {
      console.log(this.dialogueContent)
      this.dialogueContent.push({
        content: "yes, I am fine, how are you?e, how are you?e, how are you?e, how are you?e, how are you?",
        icon: "",
        isSelf: true,
        translate: "嗨，嗨，你吗嗨，你好吗嗨，你好吗嗨，你好吗嗨，你好吗嗨，你好吗嗨，你好吗嗨，你好吗嗨，你好吗嗨，你好吗你好吗？" +  this.dialogueContent.length
      })
    },
    toScrollerViewBottom() {
      const query = uni.createSelectorQuery().in(this);
      query.selectAll('.content-item').boundingClientRect(data => {
        if (data && data.length) {
          console.log(data, 'data')
          console.log(data.length, 'data.length')
          let height = 0;
          data.forEach(rect => {
            height += rect.height;
          });
          this.scrollTop = height + 10;
          console.log(height, 'height')
        }
      }).exec();
    },
    scroll(e) {
    },
    scrollToUpper(e) {
      console.log('到顶部了')
    },
    scrollToLower(e) {
      console.log('到底部了')
    },
    initRecord: function(){
      manager.onRecognize = (res) => {
        console.log("res1", res)
        console.log("this.currentText1", this.currentText)
      }
      // 识别结束事件
      manager.onStop = (res) => {
        let text = res.result
        if(text == '') {
          console.log('没有说话')
          return
        }
        this.currentText = text
        this.voicePath = res.tempFilePath;
        console.log("res2", res)
        console.log("this.currentText2", this.currentText)

        // 保存发送的数据 英文转换成中文
        this.translateUsToCn(res, text);
      }
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
          console.log(this.sendData)

          this.dialogueContent.push({
            icon: '',
            content: this.sendData.voiceResultText,
            translate: this.sendData.voiceResultTextCn,
            isSelf: true
          })
          this.toScrollerViewBottom()
          this.network().saveVoiceText()

          // 初始化
          this.dialogueContent.push({
            icon: '',
            content: '',
            translate: '',
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
          console.log("翻译失败", err)
        }
      })
    },
    onLongPress() {
      console.log('长按')
      this.isTlaking = true
      uni.vibrateShort({
        success: function () {
          console.log('success');
        }
      });
      this.clickOptions(1)
    },
    onTouchEnd() {
      console.log('结束')
      this.isTlaking = false
      this.clickOptions(1)
    },
    clickOptions(index) {
      if (index === 1) {
        console.log('开始录音');
        this.isStartRecord = !this.isStartRecord
        if (this.isStartRecord) {
          console.log('=======开始====')
          manager.start({
            lang: this.sendData.lang,
          })
        } else {
          console.log('=======结束====')
          manager.stop()
        }
      }
      if (index === 3) {
        this.isShowPopup = true;
      }
    },
    playVoice(voicePath) {
      uni.downloadFile({
        url: voicePath,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('下载成功', res.tempFilePath)
            innerAudioContext.src = res.tempFilePath;
            innerAudioContext.obeyMuteSwitch = false;
            innerAudioContext.play();
          }
        }
      })
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
    pushAiDialog(enText, cnText) {
      this.dialogueContent.push({
        icon: '',
        content: enText,
        translate: cnText,
        isSelf: false
      })
    },
    network() {
      return {
        getChatInit: async () => {
          const res = await getChatInit();
          this.chatInit = res.data.result
          this.playVoice(this.chatInit.welcome_speech_voice_file)
          this.pushAiDialog(this.chatInit.welcome_speech_en, this.chatInit.welcome_speech_cn)
        },
        sseRequestTask: async ({url, data, method = 'POST', type}) => {
          console.log("store.state.token", store.state.token)
          return new Promise((resolve, reject) => {
            const requestTask = uni.request({
              url: `${apiDomain}${url}`,
              timeout: 15000,
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
                if (item.includes('data:') && !item.includes('[DONE]')) {
                  let text = item.replace('data:', '')
                  text = text.replaceAll("「`」", " ").replaceAll("「·」", "<p></p>").replaceAll("「~」", "<p></p>")
                  console.log(text, 'text')
                  console.log("this.dialogueContent.length - 1this.dialogueContent.length - 1", this.dialogueContent.length - 1)
                  this.dialogueContent[this.dialogueContent.length - 1].content += text
                  this.toScrollerViewBottom()

                } else if (item.includes('data:[DONE]')) {
                  this.dialogueContent.push({
                    content: "",
                    icon: "",
                    noShow: true,
                    isSelf: true,
                    translate: ""
                  })
                  // 结束
                  console.log('结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束结束')
                  // 关闭请求
                  requestTask.abort()
                } else {
                  requestTask.abort
                }
              })
            })
          })
        },
        defaultVirtual: async (isRefresh) => {
          const res = await defaultVirtual();
          this.personInfo = res.data.result;
          console.log(this.personInfo, 'personInfo')
        },
        getAiDialogue: async (base64, length) => {
          console.log(base64, 'base64')
          console.log(length, 'length')
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
        saveVoiceText: async () => {
          console.log(this.sendData, 'this.sendData')
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
              console.log('uploadFileRes', uploadFileRes)
            },
            fail: (error) => {
              console.log('error', error)
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
</style>
