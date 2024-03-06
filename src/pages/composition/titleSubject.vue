<template>
  <view>

  </view>
</template>

<script>
import {apiDomain} from '@/configs/env';
import {
  getCompositionDictList,
  addCompositionCollect,
  addCompositionExercise,
  getAIGCComposition,
  getAIGCCorrection,
  getAIGCComment,
  getAIGCWrite,
  getPhotoRecognition
} from '@/api/composition';

export default {
  onLoad() {
    this.testRequestTask()
  },
  methods: {
    getAIGCComposition: async () => {
      let params = {
        info_keyword: "四级,英语",
        info_word_nums: 200,
        info_grade: "七年级"
      }
      var data = await getAIGCComposition(params);
      console.log(data)
    },
    getCompositionDictList: async () => {
      /**
       * 1、年级列表：dictCode='grade'
       * 2、作文分类：dictCode='composition_type'，当前返回五个下拉选项。
       * 3、作文分类-作文训练页面下拉框：dictCode='composition_type_select_component'，当前返回四个下拉选项。
       * 4、作文内容来源：dictCode='composition_text_source'
       * 5、是否有效状态：dictCode='status'
       */
      let params = {
        type: "grade"
      }
      let data = await getCompositionDictList(params);
      console.log(data)
    },
    addCompositionCollect: async () => {
      let params = {
        "compositionTitleId": "string",
        "compositionTitleText": "string",
        "compositionTitleImage": "string",
        "compositionType": "string",
        "compositionText": "string",
        "compositionCorrect": "string",
        "compositionTextSource": "string"
      }
      let data = await addCompositionCollect(params);
      console.log(data)
    },
    addCompositionExercise: async () => {
      let params = {
        "id": "string",
        "compositionTitleText": "string",
        "compositionTitleImage": "string",
        "compositionType": "string",
        "compositionText": "string",
        "compositionCorrect": "string",
        "titleImageOcrId": "string",
        "infoGrade": "string",
        "infoWordNums": "string",
        "infoKeyword": "string",
        "status": 0,
        "note": "string"
      }
      let data = await addCompositionExercise(params);
      console.log(data)
    },
    getAIGCCorrection: async () => {
      let params = {
        "composition_title_text": "string",
        "composition_title_image": "string",
        "composition_text": "string"
      }
      let data = await getAIGCCorrection(params);
      console.log(data)
    },
    getAIGCComment: async () => {
      let params = {
        "composition_title_text": "string",
        "composition_title_image": "string",
        "composition_text": "string"
      }
      let data = await getAIGCComment(params);
      console.log(data)
    },
    getAIGCWrite: async () => {
      let params = {
        "composition_title_text": "string",
        "composition_title_image": "string",
        "info_grade": "string"
      }
      let data = await getAIGCWrite(params);
      console.log(data)
    },
    getPhotoRecognition: async () => {
      let params = {
        "image_info": "string"
      }
      let data = await getPhotoRecognition(params);
      console.log(data)
    },
    testRequestTask() {
      const requestTask = uni.request({
        url: `${apiDomain}composition/aigc/sse`,
        timeout: 15000,
        responseType: 'text',
        method: 'get',
        enableChunked: true,  //配置这里
        header: {
          'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDk3NDIyNDUsInVzZXJuYW1lIjoiYWRtaW4ifQ.037WbDif1XuGvXAzZA8QtJpxFm346_5ItFRotjpG2wI'
        },
        success: response => {
        },
        fail: error => {
          console.log("fail", error)
        }
      })
      requestTask.onHeadersReceived(function(res) {
      });
      // 这里监听消息
      requestTask.onChunkReceived((res) => {
        let decoder = new TextDecoder('utf-8');
        let text = decoder.decode(new Uint8Array(res.data));
        console.log("onChunkReceived", text)
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
