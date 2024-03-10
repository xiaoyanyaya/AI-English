<template>
  <view class="pb-5 main-bg">
    <cy-navbar showBack>
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">
      <view v-if="pageIndex==1">
        <view class="mt-4 desc-box flex align-item-center justify-content-between pr-1 border-box t-size-22">
          <view v-for="(item, index) in descData" :key="index" class="ml-2">
            <text class="t-color-3D3D3D">{{ item.title }}:</text>
            <text class="t-color-8A8A8A" style="margin-left: 10rpx;">{{ item.value }}</text>
          </view>
        </view>
        <view class="flex justify-content-between align-item-center">
          <view class="mt-2 desc-box-two flex align-item-center  pr-1 border-box t-size-22">
            <view v-for="(item, index) in descDataTwo" :key="index" class="ml-2">
              <text class="t-color-3D3D3D">{{ item.title }}:</text>
              <text class="t-color-8A8A8A" style="margin-left: 10rpx;">{{ item.value }}</text>
            </view>
          </view>
          <view @click="$navigateTo(`/pages/composition/englishLibrary?type=1`)"
                class="select-title mt-2 flex align-item-center justify-content-center">
            <text class="t-size-22">选择作文题目</text>
          </view>
        </view>
      </view>
      <view v-if="pageIndex==3">
        <view class="flex mt-4">
          <view class="grade flex align-item-center border-box px-1 justify-content-around mr-3"
                @click="selectContent[0].show = true">
            <text class="t-size-24 t-color-8A8A8A">{{ selectContent[0].value }}</text>
            <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
          </view>

          <view class="grade flex align-item-center border-box px-1 justify-content-around"
                @click="selectContent[1].show = true">
            <text class="t-size-24 t-color-8A8A8A">{{ selectContent[1].value }}</text>
            <u-icon name="arrow-down" color="#8A8A8A" size="28"></u-icon>
          </view>

          <u-picker mode="selector" v-model="selectContent[0].show"
                    @confirm="selectConfirm($event, 0)"
                    :title="selectContent[0].title"
                    :default-selector="[selectContent[0].index]" :range="selectContent[0].content"></u-picker>

          <u-picker mode="selector" v-model="selectContent[1].show"
                    @confirm="selectConfirm($event, 1)"
                    :title="selectContent[1].title"
                    :default-selector="[selectContent[1].index]" :range="selectContent[1].content"></u-picker>
        </view>

        <view class="generate-title mt-2 flex border-box pl-1">
          <view style="width: 70%">
            <u-input placeholder="请输入题目关键词" :border="false"/>
          </view>
          <view style="width: 30%" class="generate-title-btn flex align-item-center justify-content-center">
            <text class="">生成题目</text>
          </view>
        </view>
      </view>

      <view class="mt-5 font-weight-bold t-size-36 flex align-item-center">
        <view class="font-weight-bold t-size-36">
          作文题目
        </view>
        <view v-if="pageIndex==0" class="flex align-item-center">
          <view class="iconfont t-color-1863E5 essay-title-icon" @click="photograph('title')">&#xe663;</view>
        </view>
      </view>
      <view class="ai-title-box mt-2">
        <u-input v-model="essayData.title"
                 placeholder="请输入作文题目"
                 :clearable="false"
                 :type="'textarea'" :border="false"
                 :height="500" :auto-height="false"/>
      </view>

      <view class="mt-5 font-weight-bold t-size-36 flex align-item-center justify-content-between">
        <view class="flex">
          <view class="font-weight-bold t-size-36">
            {{ pageIndex == 4 || pageIndex == 2 ? 'AI作文范文' : '作文内容' }}
          </view>
          <view v-if="pageIndex<4 && pageIndex!=2" class="flex align-item-center">
            <view class="iconfont t-color-1863E5 essay-title-icon" @click="photograph('content')">&#xe663;</view>
            <!--            <view class="iconfont t-color-1863E5 essay-title-icon">&#xed64;</view>-->
            <!--            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe8b0;</view>-->
          </view>
        </view>
        <view v-if="pageIndex==2" class="compose-box flex align-item-center justify-content-center"
              @click="network().compositionAiWrite('content')">
          撰写范文
        </view>
        <view v-else class="t-color-8A8A8A t-size-24">
          已输入{{ essayData.content.length }}个单词
        </view>
      </view>
      <view class="ai-title-box mt-2">
        <u-input v-model="essayData.content"
                 placeholder="请输入/拍照/粘贴作文内容"
                 :type="'textarea'" :border="false"
                 :clearable="false"
                 :maxlength="0"
                 :height="460" :auto-height="false"/>
      </view>

      <view v-if="pageIndex > 3 || pageIndex==2">
        <view class="mt-5 font-weight-bold t-size-36 flex align-item-center">
          <view class="font-weight-bold t-size-36">
            {{ pageIndex == 4 || pageIndex == 2 ? 'AI作文点评' : 'AI作文批改' }}
          </view>
          <view v-if="pageIndex==6" class="flex align-item-center" @click="photograph('generateContent')">
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
          </view>
        </view>
        <view class="ai-review-box mt-2">
          <u-input v-model="generateContent"
                   placeholder=" "
                   :clearable="false"
                   :maxlength="0"
                   :type="'textarea'" :border="false"
                   :height="700" :auto-height="false"/>
        </view>
      </view>

      <view class="btns-box flex justify-content-around mt-5" v-if="pageIndex<4 && pageIndex !=2">
        <view class="ai-item-1 flex align-item-center justify-content-center" @click="toAiPage(5,'AI作文批改')">
          AI作文批改
        </view>
        <view class="ai-item-2 flex align-item-center justify-content-center" @click="toAiPage(4,'AI作文帮写')">
          AI作文帮写
        </view>
      </view>
      <view class="collect-btn mt-5 flex align-item-center justify-content-center" v-if="pageIndex>3 || pageIndex == 2"
            @click="network().collection()">
        <text class="t-color-fff">收藏</text>
      </view>
    </view>

  </view>
</template>

<script>

import {
  addCompositionCollect,
  addCompositionExercise,
  getAIGCComment,
  getAIGCCorrection,
  getPhotoRecognition
} from "@/api/composition";
import state from "@/store/state";
import {apiDomain} from "@/configs/env";
import store from "@/store";

export default {
  data() {
    return {
      pageIndex: 0,
      pageTitle: '',
      descData: [],
      descDataTwo: [],

      selectContent: [{
        title: '年级',
        content: ['一年级', '二年级', '三年级'],
        show: false,
        value: '一年级',
        index: 0,
      }, {
        title: '字数',
        content: ['100字', '200字', '300字'],
        show: false,
        value: '100字',
        index: 0,
      }],

      // 作文
      essayData: {
        title: '',
        content: ''
      },
      compositionData: {},
      generateContent: '',
      generateSuccess: false
    };
  },
  onLoad({index, title}) {
    this.init(index, title)
    uni.$on('compositionCollect', (data) => {
      this.essayData = data
    })
  },
  watch: {
    'store.generateContent': {
      handler(newValue, oldValue) {
        console.log('generateContent changed:', newValue);
        // 在状态变化时执行一些操作
      },
      deep: true
    }
  },
  mounted() {
    console.log(state.generateContent)
    uni.$on('compositionData', (data) => {
      console.log(data)
      this.descData = [{
        title: '类型',
        value: `${data.compositionType_dictText}`
      }, {
        title: '年份',
        value: `${data.infoYear}`
      }, {
        title: '年级',
        value: `${data.infoGrade_dictText}`
      }, {
        title: '字数',
        value: '-'
      }]

      this.descDataTwo = [{
        title: '省份',
        value: `${data.infoProvince}`
      }, {
        title: '城市',
        value: `${data.infoCity}`
      }]
      this.essayData.title = data.compositionTitleText
      this.essayData.infoGrade_dictText = data.infoGrade_dictText
      this.compositionData = data
      uni.setStorageSync("compositionData", data)
    })
  },
  onShow() {
  },
  methods: {
    photograph(type) {
      var _this = this;
      uni.chooseImage({
        count: 1,
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;
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
                ocrServiceProvider:"tencent"
              }).then(res => {
                switch (type) {
                  case 'title':
                    _this.essayData.title = res.data.result.ocrText
                    break;
                  case 'content':
                    _this.essayData.content += res.data.result.ocrText
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
          });
        },
        fail: function (err) {
          console.log('选择图片失败：', err);
        }
      });

    },
    init(index, title) {
      this.pageIndex = index;
      if (index == 0) {
        this.pageTitle = '作文批改'
        uni.removeStorageSync('compositionData')
      }
      if (index == 1) {
        this.pageTitle = '作文训练';
        this.descData = [{
          title: '类型',
          value: ''
        }, {
          title: '年份',
          value: ''
        }, {
          title: '年级',
          value: ''
        }, {
          title: '字数',
          value: '-'
        }]

        this.descDataTwo = [{
          title: '省份',
          value: ''
        }, {
          title: '城市',
          value: ''
        }]
      } else if (index == 2) {
        this.pageTitle = '作文批改';
        this.descData = [{
          title: '年份',
          value: '2023年'
        }, {
          title: '年级',
          value: '初三'
        }, {
          title: '出版社',
          value: '人教社'
        }]
      } else if (index == 3) {
        this.pageTitle = '我的作文库';
      } else if (index == 4 || index == 5) {
        this.pageTitle = title;
        uni.showLoading({
          title: '编写中...'
        })

        var essayData = uni.getStorageSync('essayData')
        if (essayData) {
          this.essayData = essayData
        }
        switch (title) {
          case 'AI作文批改':
            this.network().getAIGCCorrection('generateContent')
            break;
          case 'AI作文帮写':
            this.network().compositionAiWrite('content')
            break;
        }
      }
    },
    toPage(index, title) {
      this.$navigateTo(`/pages/composition/titleSubject?index=${index}&title=${title}`);
    },
    toAiPage(index, title) {
      if (this.essayData.title == '') {
        uni.showToast({
          title: '请输入作文题目',
          icon: 'none'
        })
        return;
      }
      if (title == 'AI作文批改' && this.essayData.content == '') {
        uni.showToast({
          title: '请输入作文内容',
          icon: 'none'
        })
        return;
      }
      this.network().addCompositionExercise(index, title);
    },
    clickSelect(index) {
      this.selectContent.forEach((item, i) => {
        if (i !== index) {
          item.show = false;
        }
      });
      this.selectContent[index].show = true;
    },
    selectConfirm(e, index) {
      this.selectContent[index].value = this.selectContent[index].content[e[0]];
      this.selectContent[index].index = e[0];
    },
    network() {
      return {
        sseRequestTask: async ({url, data, method = 'POST', type}) => {
          return new Promise((resolve, reject) => {
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
                console.log("fail", error)
              }
            });
            requestTask.onHeadersReceived(function (res) {
            });
            requestTask.onChunkReceived((res) => {
              const uint8Array = new Uint8Array(res.data);
              let text = String.fromCharCode.apply(null, uint8Array);
              text = decodeURIComponent(escape(text));
              let arr = text.split('\n')
              arr.forEach((item) => {
                if (item.includes('data:') && !item.includes('[DONE]')) {
                  let text = item.replace('data:', '')
                  resolve(text)
                  if (type == 'content') {
                    this.essayData.content += text.replaceAll("「`」", " ").replaceAll("「·」", " ")
                    console.log(this.essayData.content)
                  } else if (type == 'generateContent') {
                    this.generateContent += text.replaceAll("「`」", " ").replaceAll("「·」", " ")
                  }
                } else if (item.includes('[DONE]')) {
                  var essayData = uni.getStorageSync("essayData")
                  essayData.content = this.essayData.content
                  uni.setStorageSync("essayData", essayData)

                  if (!this.generateSuccess && type == 'content') {
                    this.network().getAIGCComment('generateContent')
                    this.generateSuccess = true
                  }
                } else {

                  requestTask.abort
                }
              })
            })
          })
        },
        addCompositionExercise: async (index, title) => {
          console.log(this.pageIndex)
          let params = {}
          if (this.pageIndex == 0) {
            params = {
              "compositionTitleText": this.essayData.title,
              "compositionType": "user_submit",
            }
          } else {
            params = {
              "compositionTitleText": this.essayData.title,
              "compositionTitleImage": this.compositionData.compositionTitleImage ? this.compositionData.compositionTitleImage : "",
              "compositionType": this.compositionData.compositionType ? this.compositionData.compositionType : "",
              "titleImageOcrId": this.compositionData.compositionType.titleImageOcrId ? this.compositionData.compositionType.titleImageOcrId : "",
              "infoGrade": this.compositionData.infoGrade ? this.compositionData.infoGrade : "",
              "infoWordNums": this.compositionData.infoWordNums ? this.compositionData.infoWordNums : "",
              "infoKeyword": this.compositionData.infoKeyword ? this.compositionData.infoKeyword : "",
              "status": this.compositionData.status ? this.compositionData.status : "",
              "note": this.compositionData.note ? this.compositionData.note : "",
            }
          }
          let data = await addCompositionExercise(params);
          if (data.status == 200) {
            if (title == 'AI作文帮写') this.essayData.content = '';
            this.essayData.uuid = data.data.result
            uni.setStorageSync("essayData", this.essayData);
            this.toPage(index, title)
          }
        },
        compositionAiWrite: async (type) => {
          this.network().sseRequestTask({
            url: 'composition/aigc/text',
            method: 'post',
            data: {
              "composition_title_text": this.essayData.title,
              "info_grade": this.essayData.infoGrade_dictText ? this.essayData.infoGrade_dictText : "",
            },
            type
          }).then(res => {

          })
        },
        getAIGCCorrection: async (type) => {
          let params = {
            "composition_title_text": this.essayData.title,
            "composition_text": this.essayData.content
          }
          this.network().sseRequestTask({
            url: 'composition/aigc/correct',
            method: 'post',
            data: params,
            type
          }).then(res => {
            console.log("生成批改")
            console.log(res)
            this.generateContent = res
            uni.hideLoading()
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
        collection: async () => {
          let param = {}
          if (this.pageIndex == 0) {
            param = {
              compositionTitleText: this.essayData.title,
              compositionText: this.essayData.content,
              compositionCorrect: this.generateContent,
              compositionTextSource: this.pageTitle == 'AI作文帮写' ? 'aigc_text' : 'user_text',
            }
          } else {
            var compositionData = uni.getStorageSync("compositionData")
            param = {
              compositionTitleId: compositionData.id,
              compositionTitleText: this.essayData.title,
              compositionTitleImage: '',
              compositionType: compositionData.compositionType ? compositionData.compositionType : 'user_submit',
              compositionText: this.essayData.content,
              compositionCorrect: this.generateContent,
              compositionTextSource: this.pageTitle == 'AI作文帮写' ? 'aigc_text' : 'user_text',
            }
          }

          if (!param.compositionTitleId) {
            var essayData = uni.getStorageSync("essayData");
            param.compositionTitleId = essayData.uuid
          }

          let data = await addCompositionCollect(param);
          console.log(data)
          if (data.status === 200) {
            uni.$emit('compositionCollect', this.essayData)
            uni.showToast({
              title: '收藏成功',
              icon: 'none'
            })
            // 延时300ms跳转
            setTimeout(() => {
              uni.navigateBack(1)
            }, 300)
          }
        }
      }
    }
  },
}
</script>

<style lang="scss">
.desc-box {
  height: 80rpx;
  border-radius: 30rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2px solid #E6EFFF;

  view {
    flex: 1;
  }
}

.desc-box-two {
  height: 80rpx;
  width: 350rpx;
  border-radius: 30rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2px solid #E6EFFF;

  view {
    flex: 1;
  }
}

.grade {
  width: 150rpx;
  height: 70rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
}

.select-title {
  width: 200rpx;
  height: 70rpx;
  border-radius: 20rpx;
  background: linear-gradient(180deg, #7FADFF 0%, #1863E5 100%);
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
  color: #FFFFFF;
  float: right;
}

.select-subject-btn {
  margin-top: 20rpx;
  width: 270rpx;
  height: 70rpx;
  border-radius: 20rpx;
  background: linear-gradient(180deg, #7FADFF 0%, #1863E5 100%);
  box-sizing: border-box;
  border: 1rpx solid #AAC9FF;
}

.ai-title-box, .ai-review-box {
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1rpx solid #8A8A8A;
  box-sizing: border-box;
  padding: 20rpx;
}

.ai-title-box {
  height: 500rpx;
}

.ai-review-box {
  height: 750rpx;
}

.essay-title-icon {
  font-size: 40rpx;
  margin-top: 6rpx;
  margin-left: 30rpx;
}

.btns-box {

  .ai-item-1, .ai-item-2 {
    width: 320rpx;
    height: 80rpx;
    border-radius: 50rpx;
    opacity: 1;
    box-sizing: border-box;
    color: #FFFFFF;
  }

  .ai-item-1 {
    background: linear-gradient(180deg, #7EEA5A 0%, #3C9B05 100%);
    border: 2px solid #3C9B05;
  }

  .ai-item-2 {
    background: linear-gradient(180deg, #FCBC9A 0%, #EA7902 100%);
    border: 2px solid #B66107;
  }
}

.generate-title {
  height: 70rpx;
  border-radius: 16rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
  overflow: hidden;

  .generate-title-btn {
    background: #2A67D2;
    color: #FFFFFF;
  }
}

.collect-btn {
  height: 80rpx;
  border-radius: 50rpx;
  background: #FFA646;
  box-sizing: border-box;
  border: 1px solid #B94700;
}

.compose-box {
  width: 160rpx;
  height: 60rpx;
  border-radius: 20rpx;
  opacity: 1;
  background: linear-gradient(180deg, #7FADFF 0%, #1863E5 100%);
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
  font-size: 24rpx;
  color: #FFFFFF;
}
</style>
