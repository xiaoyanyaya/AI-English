<template>
  <view class="pb-5 body">
    <cy-navbar showBack>
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">
      <view v-if="title.isShowTitle">
        <view class="mt-5 flex align-item-center justify-content-between top-content" v-if="title.isShowTitle">
          <view class="flex align-item-center">
            <view class="font-weight-bold t-size-28 ml-3 font-weight-bold">
              作文题目
            </view>
            <view v-if="title.isShowPhoto" class="flex align-item-end ml-5" @click="photograph('title')">
              <view class="iconfont t-color-1863E5 essay-title-icon">&#xe663;</view>
              <view class="t-size-22 t-color-1863E5 ml-1">拍照识别</view>
            </view>
          </view>
          <view class="show-more-box flex align-item-center" v-if="title.isShowMore"
                @click="showMorePopupup = true">
            <view class="t-size-22 title mr-1" @click="title.isShowTitle = true">显示更多</view>
            <u-icon name="arrow-right-double" color="#1863E5" size="24"></u-icon>
          </view>
        </view>
        <view class="ai-title-box mt-2">
          <view v-if="title.isDisabled" class="t-size-26">
            <rich-text :nodes="essayData.title"></rich-text>
          </view>
          <view v-else>
            <textarea class="t-size-26"
                      style="height: 100%; width: 100%;"
                      :disabled="title.isDisabled"
                      :value="essayDataShow.title"
                      @input="inputTitle"
                      :maxlength="0"
                      auto-height
                      placeholder="请输入作文题目"></textarea>
          </view>
        </view>
      </view>

      <view v-if="content.isShowContent">
        <view class="mt-5 flex align-item-center justify-content-between top-content">
          <view class="flex align-item-end">
            <view class="font-weight-bold t-size-28 ml-3 font-weight-bold">
              作文内容
            </view>
            <view v-if="content.isShowPhoto" class="flex align-item-end ml-5" @click="photograph('content')">
              <view class="iconfont t-color-1863E5 essay-title-icon">&#xe663;</view>
              <view class="t-size-22 t-color-1863E5 ml-1">拍照识别</view>
            </view>
          </view>
          <view class="note flex align-item-center" v-if="content.isShowAddTilte">
            <view class="t-size-22 title mr-1" @click="clickAddTitle">添加题目</view>
            <view class="iconfont" @click="content.isShowTips =! content.isShowTips">&#xe657;</view>
          </view>

          <view v-if="content.isShowTips"
                class="tips-box t-size-20 flex align-item-center justify-content-center">
            温馨提示：添加作文题目或作文要求，进行更专业的批改。可以不填。
          </view>
        </view>
        <view class="ai-content-box mt-2">
          <view v-if="content.isDisabled" class="t-size-26 pb-3">
            <rich-text :nodes="essayData.content"></rich-text>
          </view>
          <view v-else>
            <textarea class="t-size-26"
                      :disabled="content.isDisabled"
                      :value="essayDataShow.content"
                      @input="inputContent"
                      :maxlength="0"
                      auto-height
                      placeholder="请输入作文内容"></textarea>
          </view>
          <view class="t-color-8A8A8A t-size-22 numberlenth">
            已输入{{ contentLength }}个单词
          </view>
        </view>
      </view>

      <view v-if="otherContent.show">
        <view class="mt-5 flex align-item-center justify-content-between top-content">
          <view class="flex align-item-end">
            <view class="font-weight-bold t-size-28 ml-3 font-weight-bold">
              {{ otherContent.title }}
            </view>
          </view>
        </view>
        <view class="ai-content-box mt-2">
          <view v-if="otherContent.isDisabled" class="t-size-26">
            <rich-text :nodes="generateContent"></rich-text>
          </view>
          <view v-else>
            <textarea class="t-size-26"
                      style="height: 100%; width: 100%;"
                      :disabled="otherContent.isDisabled"
                      :maxlength="0"
                      auto-height
                      v-model="generateContent"
                      :placeholder="otherContent.placeholder"></textarea>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 100rpx"></view>
    <view class="flex align-item-center justify-content-center">
      <view class="flex align-item-center t-color-fff justify-content-center btn-box" @click.stop.native="clickBtn">
        <view class="mr-2" v-if="btnTitle == '分享'">
          <u-icon name="share" color="#FFFFFF" size="30"></u-icon>
        </view>
        {{ btnTitle }}
      </view>
    </view>

    <u-popup v-model="showMorePopupup" mode="bottom" border-radius="20">
      <view class="more-requirements-box pb-5">
        <view class="flex align-item-center justify-content-center mt-5">
          <text class="font-weight-bold t-size-28">更多要求</text>
        </view>

        <view class="px-4 t-size-28">
          <view v-for="(item, index) in popupContnet" :key="index">
            <view class="mt-5 mb-3 font-weight-bold">{{ item.title }}</view>
            <view class="grip-3">
              <view class="grip-item flex align-item-center justify-content-center"
                    v-for="(content, contentIndex) in item.content" :key="contentIndex"
                    @click="clickPopupContent(index, contentIndex)"
                    :class="{active: item.activeIndex == contentIndex}">
                {{ content }}
              </view>
            </view>
          </view>
        </view>

      </view>
    </u-popup>

    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import {getCompositionDictList, getPhotoRecognition} from "@/api/composition";
import {apiDomain} from "@/configs/env";
import state from "@/store/state";
import {tr} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";

export default {
  data() {
    return {
      pageTitle: '作文批改',
      pageIndex: 0,
      btnTitle: '',
      title: {
        isShowTitle: false,
        isShowMore: false,
        isShowPhoto: true,
        isDisabled: false,
      },
      content: {
        isShowContent: true,
        isShowTips: false,
        isShowAddTilte: false,
        isShowPhoto: true,
        isDisabled: false,
      },
      otherContent: {
        show: false,
        title: '范文及点评',
        placeholder: '纠错/作文/范文及翻译',
        isDisabled: false,
      },
      // 作文
      essayData: {
        title: '',
        content: ''
      },
      essayDataShow: {
        title: '',
        content: ''
      },
      contentLength: 0,
      generateContent: '',

      showMorePopupup: false,
      popupContnet: [{
        title: '学生类别',
        content: [],
        val: [],
        activeIndex: 0,
      }, {
        title: '作文字数',
        content: [],
        val: [],
        activeIndex: 0,
      }, {
        title: '作文类型',
        content: [],
        val: [],
        activeIndex: 0,
      }],
      compositionType: '',
      infoWordNums: '',
      infoWriteType: '',
      isGenerateContent: false,
    };
  },
  onLoad({title, content, generateContent, pageIndex, pageTitle, compositionType, infoWordNums, infoWriteType}) {
    this.pageTitle = pageTitle;
    this.pageIndex = pageIndex;
    console.log('title', title, 'content', content, 'generateContent', generateContent, 'pageIndex', pageIndex, 'pageTitle', pageTitle)
    if (pageIndex == 0) {
      if (pageTitle === '作文批改') {
        this.title.isShowTitle = false;
        this.content.isShowContent = true;
        this.content.isShowAddTilte = true;
        this.otherContent.show = false;
        this.btnTitle = 'AI作文批改';
      } else if (pageTitle === 'AI作文批改') {
        this.title.isShowTitle = title != '';
        this.title.isShowPhoto = false;
        this.title.isDisabled = true;
        this.content.isShowContent = true;
        this.content.isShowPhoto = false;
        this.content.isDisabled = true;
        this.btnTitle = '分享';
        this.otherContent = {
          show: true,
          title: '作文点评',
          placeholder: ' ',
          isDisabled: true,
        }
        // 生成作文点评
        this.network().getAIGCCorrection('generateContent')
      } else if (pageTitle === '疯狂挑战') {
        this.title.isShowTitle = true;
        this.content.isShowContent = true;
        this.otherContent.show = true;
      }
    } else if (pageIndex == 2) {
      if (pageTitle === '作文帮写') {
        this.title.isShowTitle = true;
        this.title.isShowMore = true;
        this.content.isShowContent = false;
        this.otherContent.show = false;
        this.btnTitle = "AI作文帮写"
      }
      if (pageTitle === 'AI作文帮写') {
        this.title.isShowTitle = false;
        this.title.isShowPhoto = false;
        this.content.isShowContent = true;
        this.content.isShowPhoto = false;
        this.content.isDisabled = true;
        this.otherContent.show = true;
        this.btnTitle = '分享';
        this.otherContent = {
          show: true,
          title: '范文及点评',
          placeholder: '纠错/作文/范文及翻译',
          isDisabled: true,
        }
        // 生成作文内容
        this.network().getAIGCWrite('content')
      }
    } else if (pageIndex == 4) {
      if (pageTitle === '作文内容输入页') {
        this.title.isShowTitle = true;
        this.title.isShowPhoto = false;
        this.title.isDisabled = true;
        this.content.isShowContent = true;
        this.btnTitle = 'AI作文批改';
      } else if (pageTitle === 'AI作文批改') {
        this.title.isShowTitle = false;
        this.title.isShowPhoto = false;
        this.content.isShowContent = true;
        this.content.isShowPhoto = false;
        this.content.isDisabled = true;
        this.btnTitle = '分享';
        this.otherContent = {
          show: true,
          title: '作文点评',
          placeholder: ' ',
          isDisabled: true,
        }
        // 生成作文点评
        this.network().getAIGCCorrection('generateContent')
      }
    } else if (pageIndex == 5) {
      this.title.isShowTitle = true;
      this.title.isShowPhoto = false;
      this.title.isDisabled = true;
      this.content.isShowContent = true;
      this.content.isShowPhoto = false;
      this.content.isDisabled = true;
      this.otherContent.show = true;
      this.otherContent.isDisabled = true;
      this.btnTitle = '分享';
    }

    this.essayData.title = title || '';
    this.essayDataShow.title = title || '';
    this.essayData.content = content || '';
    this.essayDataShow.content = content || '';
    this.generateContent = generateContent || '';
    this.compositionType = compositionType || '';
    this.infoWordNums = infoWordNums || '';
    this.infoWriteType = infoWriteType || '';

    this.network().getCompositionDictList('student_type')
    this.network().getCompositionDictList('composition_text_wordnum')
    this.network().getCompositionDictList('composition_context_type')
  },
  watch: {
    'essayData.content': {
      handler(val) {
        this.contentLength = val.match(/[a-zA-Z]+/g).length; // 计算单词数量并赋值给 contentLength
      },
      deep: true
    }
  },
  methods: {
    clickAddTitle() {
      this.title.isShowTitle = true
      this.content.isShowAddTilte = false
    },
    inputTitle(e) {
      this.essayData.title = e.detail.value
    },
    inputContent(e) {
      this.essayData.content = e.detail.value
    },
    clickPopupContent(parentIndex, index) {
      this.popupContnet[parentIndex].activeIndex = index;
    },
    clickBtn() {
      switch (this.pageIndex) {
        case '0':
          if (this.pageTitle == '作文批改') {
            /*if (this.title.isShowTitle && this.essayData.title == '') {
              uni.showToast({
                title: '请输入作文题目',
                mask: true,
                icon: 'none'
              })
              return;
            }*/
            if (this.essayData.content == '') {
              uni.showToast({
                title: '请输入作文内容',
                mask: true,
                icon: 'none'
              })
              return;
            }
          }
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=${this.pageIndex}&pageTitle=AI作文批改&title=${this.essayData.title}&content=${this.essayData.content}&generateContent=${this.generateContent}`);
          break;

        case "1":
          break;
        case "2":
          if (this.pageTitle == '作文帮写') {
            if (this.title.isShowTitle && this.essayData.title == '') {
              uni.showToast({
                title: '请输入作文题目',
                mask: true,
                icon: 'none'
              })
              return;
            }
          }
          let compositionType = this.popupContnet[0].val[this.popupContnet[0].activeIndex]
          let infoWordNums = this.popupContnet[1].val[this.popupContnet[1].activeIndex]
          let infoWriteType = this.popupContnet[2].val[this.popupContnet[2].activeIndex]
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=2&pageTitle=AI作文帮写&title=${this.essayData.title}&compositionType=${compositionType}&infoWordNums=${infoWordNums}&infoWriteType=${infoWriteType}`)
          break;
          case "4":
            if (this.pageTitle == '作文内容输入页') {
              if (this.essayData.content == '') {
                uni.showToast({
                  title: '请输入作文内容',
                  mask: true,
                  icon: 'none'
                })
                return;
              }
            }
            this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=4&pageTitle=AI作文批改&title=${this.essayData.title}&content=${this.essayData.content}&generateContent=${this.generateContent}`);
            break;
      }
    },
    chooseImage(){
      return new Promise(resolve=>{
        uni.chooseImage({
          count:1,
          success:(res)=> {
            resolve(res.tempFilePaths[0])
          }
        })
      })
    },
    photograph(type) {
      var _this = this;
      _this.chooseImage().then(src=>{
        console.log(src);
        uni.navigateTo({
          url:`/pages/full-screen/full-screen?src=${src}`
        })
      })
      /*var tempFilePaths = res.tempFilePaths;
          uni.getFileSystemManager().readFile({
            filePath: tempFilePaths[0],
            encoding: 'base64',
            success: function (data) {
              var base64Data = data.data;

              uni.showLoading({
                title: '上传中...'
              })
              getPhotoRecognition({
                imageBase64: base64Data,
                // imageUrl: tempFilePaths[0],
                ocrApiName: "accurateOCR",
                ocrServiceProvider: "tencent"
              }).then(res => {
                switch (type) {
                  case 'title':
                    _this.essayData.title = res.data.result.ocrText
                    _this.essayDataShow.title = res.data.result.ocrText
                    break;
                  case 'content':
                    _this.essayData.content += res.data.result.ocrText
                    _this.essayDataShow.content += res.data.result.ocrText
                    break;
                  case 'generateContent':
                    _this.generateContent += res.data.result.ocrText
                    break;
                }
                uni.hideLoading()
              })
            },
            fail: function (err) {
              console.log('读取文件失败：', err);
            }
          });*/
    },
    network() {
      return {
        getCompositionDictList: async (type) => {
          let params = {type}
          let data = await getCompositionDictList(params);
          var result = data.data.result
          console.log(result)

          switch (type) {
            case 'student_type':
              result.forEach(d => {
                this.popupContnet[0].content.push(d.text)
                this.popupContnet[0].val.push(d.value)
              })
              break;
            case 'composition_text_wordnum':
              result.forEach(d => {
                this.popupContnet[1].content.push(d.text)
                this.popupContnet[1].val.push(d.value)
              })
              break;
            case 'composition_context_type':
              result.forEach(d => {
                this.popupContnet[2].content.push(d.text)
                this.popupContnet[2].val.push(d.value)
              })
              break;
          }
        },
        sseRequestTask: async ({url, data, method = 'POST', type}) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              uni.showLoading({
                mask: true,
                title: '内容生成中...'
              })
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
              console.log(text)

              let arr = text.split('\n')
              arr.forEach((item) => {
                if (item.includes('data:') && !item.includes('[DONE]')) {
                  let text = item.replace('data:', '')
                  // console.log(text)
                  /*.replaceAll("「`」", " ").replaceAll("「·」", " ")*/
                  if (type == 'content') {
                    this.essayData.content += text
                  } else if (type == 'generateContent') {
                    this.generateContent += text
                  }
                } else if (item.includes('[DONE]')) {
                  /*var essayData = uni.getStorageSync("essayData")
                  essayData.content = this.essayData.content
                  uni.setStorageSync("essayData", essayData)*/

                  if (!this.generateSuccess && type == 'content') {
                    this.network().getAIGCComment('generateContent')
                    this.generateSuccess = true
                  }

                  if (this.pageTitle != 'AI作文帮写' || this.generateSuccess) {
                    uni.hideLoading()
                  }
                } else {
                  requestTask.abort
                }
              })
            })
          })
        },
        getAIGCCorrection: async (type) => {
          this.$nextTick(() => {
            var params = {
              "composition_title_text": this.essayData.title,
              "composition_text": this.essayData.content
            }
            this.network().sseRequestTask({
              url: 'composition/aigc/correct',
              method: 'post',
              data: params,
              type
            })
          })
        },
        getAIGCWrite: async (type) => {
          this.$nextTick(() => {
            var params = {
              "composition_title_text": this.essayData.title,
              "composition_type": this.compositionType,
              "info_word_num": this.infoWordNums,
              "info_write_type": this.infoWriteType
            }
            this.network().sseRequestTask({
              url: '/composition/aigc/text/',
              method: 'post',
              data: params,
              type
            })
          })
        },
        getAIGCComment: async (type) => {
          let params = {
            "composition_title_text": this.essayData.title,
            "composition_text": this.essayData.content
          }
          this.network().sseRequestTask({
            url: 'composition/aigc/review',
            method: 'post',
            data: params,
            type
          }).then(res => {
            console.log("生成点评")
            console.log(res)
            this.generateContent = res
            uni.hideLoading()
          })
        },
      }
    }
  },
}
</script>

<style lang="scss">
.body {
  min-height: 100vh;
  background: linear-gradient(180deg, #C8E2F8 0%, rgba(230, 242, 251, 0.5) 100%);
}

.ai-title-box, .ai-content-box, .ai-review-box {
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 20rpx;
  border-radius: 20rpx;
}

.ai-title-box {
  min-height: 260rpx;
  position: relative;
}

.ai-content-box {
  min-height: 500rpx;
  position: relative;
}

.numberlenth {
  position: absolute;
  right: 30rpx;
  bottom: 10rpx;
}

.note {
  .title {
    color: #E86608;
    border-bottom: 1px solid #E86608;
  }

  .iconfont {
    font-size: 24rpx;
  }
}

.show-more-box {
  color: #1863E5;
  border-bottom: 1px solid #1863E5;
}

.top-content {
  position: relative;

  .tips-box {
    width: 325rpx;
    border-radius: 10rpx;
    background: #FFFFFF;
    padding: 20rpx 20rpx;
    box-shadow: 0 0 10rpx 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    right: 0;
    top: 40rpx;
    z-index: 9;
  }
}

.more-requirements-box {
  height: 1000rpx;
  border-radius: 20rpx;
}

.grip-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30rpx;

  .grip-item {
    height: 70rpx;
    border-radius: 10rpx;
    background: #F4F4F4;

    &.active {
      background: #E5F1FF;
      box-sizing: border-box;
      border: 2px solid #1863E5;
    }
  }
}

.btn-box {
  position: fixed;
  bottom: 30rpx;
  width: 400rpx;
  height: 80rpx;
  border-radius: 163rpx;
  background: linear-gradient(180deg, #5A95FB 0%, #1258D0 100%);
}

</style>
