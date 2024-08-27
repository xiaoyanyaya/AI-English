<template>
  <view class="pb-5 body">
    <cy-navbar showBack :isReturnHome="isReturnHome">
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">

      <view class="mt-5" v-if="(pageIndex==4 && pageTitle=='作文挑战进行时') || pageIndex == 7  || pageIndex == 6">
        <view class="challenge-title px-3 pt-3 pb-5">
          <view class="flex justify-content-center align-item-center">
            <image :src="`${imageBaseUrl}/4-14-02.png`" mode="widthFix"/>
            <view class="t-color-E0672F t-size-32 font-weight-bold ml-1">挑战题目</view>
          </view>

          <view class="t-size-26 mt-3">
            <rich-text :nodes="essayData.title"></rich-text>
          </view>
        </view>
      </view>
      <view v-else-if="title.isShowTitle">
        <view class="mt-5 flex align-item-center justify-content-between top-content" v-if="title.isShowTitle">
          <view class="flex align-item-center">
            <view class="font-weight-bold t-size-28 ml-3 font-weight-bold">
              作文题目
            </view>
            <view v-if="title.isShowPhoto" class="flex align-item-center ml-5" @click="photograph('title')">
              <view class="iconfont t-color-1863E5 essay-title-icon">&#xe663;</view>
              <view class="t-size-22 t-color-1863E5 ml-1">拍照识别</view>
            </view>
            <view v-if="title.isDisabled" @click="copyContent(essayData.title)" class="flex ml-3 align-item-center" style="margin-top: 2rpx">
              <view class="iconfont t-color-1863E5 essay-title-icon">&#xe8b0;</view>
              <view class="t-size-22 t-color-1863E5" style="margin-left: 6rpx">复制</view>
            </view>
          </view>
          <view class="show-more-box flex align-item-center" v-if="title.isShowMore"
                @click="showMorePopupup = true">
            <view class="t-size-22 title mr-1" @click="title.isShowTitle = true">更多要求</view>
            <u-icon name="arrow-right-double" color="#1863E5" size="24"></u-icon>
          </view>
        </view>
        <view class="ai-title-box mt-2" @click.stop="click_input('title')">
          <view v-if="title.isDisabled" class="t-size-26">
            <rich-text :nodes="essayData.title"></rich-text>
          </view>
          <view v-else>
            <textarea class="t-size-26"
                      style="height: 100%; width: 100%;"
                      :disabled="title.isDisabled"
                      :value="essayDataShow.title"
                      :focus="title.isFocus"
                      @focus.stop="focus_input('title')"
                      @blur="blur_input('title')"
                      @input="inputTextarea('title', $event)"
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
            <view v-if="content.isShowPhoto" class="flex align-item-center ml-5" @click="photograph('content')">
              <view class="iconfont t-color-1863E5 essay-title-icon">&#xe663;</view>
              <view class="t-size-22 t-color-1863E5 ml-1">拍照识别</view>
            </view>
            <view v-if="content.isDisabled" @click="copyContent(essayData.originContent)" class="flex ml-3 align-item-center" style="margin-top: 2rpx">
              <view class="iconfont t-color-1863E5 essay-title-icon">&#xe8b0;</view>
              <view class="t-size-22 t-color-1863E5" style="margin-left: 6rpx">复制</view>
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
        <view class="ai-content-box mt-2" @click.stop="click_input('content')">
          <view v-if="content.isDisabled" class="t-size-28 pb-3" style="line-height: 24px;">
            <rich-text :nodes="essayData.content"></rich-text>
          </view>
          <view v-else>
            <textarea class="t-size-26"
                      :disabled="content.isDisabled"
                      :value="essayDataShow.content"
                      :focus="content.isFocus"
                      @focus.stop="focus_input('content')"
                      @blur="blur_input('content')"
                      @input="inputTextarea('content', $event)"
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
          <view class="flex align-item-end justify-content-between">
            <view class="flex align-item-end">
              <view class="font-weight-bold t-size-28 ml-3 font-weight-bold">
                <view v-if="otherContent.title == '作文点评'">
                  <text>作文</text>
                  <text class="t-color-FF0000">点评</text>
                </view>
                <view v-else>{{ otherContent.title }}</view>
              </view>
              <view v-if="otherContent.isDisabled" @click="copyContent(originGenerateContent)" class="flex ml-3 align-item-center" style="margin-top: 2rpx">
                <view class="iconfont t-color-1863E5 essay-title-icon">&#xe8b0;</view>
                <view class="t-size-22 t-color-1863E5" style="margin-left: 6rpx">复制</view>
              </view>
            </view>
          </view>
          <view class="t-size-24 t-color-8A8A8A flex align-item-center pr-2">
            <u-icon name="info-circle-fill" color="#8A8A8A" size="28"></u-icon>
            <view class="ml-1">AI批改仅供借鉴</view>
          </view>
        </view>
        <view class="ai-content-box mt-2">
          <view v-if="otherContent.isDisabled" class="t-size-28" style="line-height: 24px;">
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
      <view v-if="btnTitle != '分享'" class="flex align-item-center t-color-fff justify-content-center btn-box"
            :style="{background : disabledBtn ? '#D8D8D8' : 'linear-gradient(180deg, #5A95FB 0%, #1258D0 100%)'}"
            @click.stop.native="clickBtn">
        {{ btnTitle }}
      </view>
      <button
        v-else
        open-type="share"
        data-name="shareBtn"
        class="flex align-item-center t-color-fff justify-content-center btn-box pr-5"
        :style="{background : disabledBtn ? '#D8D8D8' : 'linear-gradient(180deg, #5A95FB 0%, #1258D0 100%)'}"
      >
        <view class="mr-2">
          <u-icon name="share" color="#FFFFFF" size="30"></u-icon>
        </view>
        {{ btnTitle }}
      </button>
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
import {
  addCompositionCollect,
  getCompositionCollectInfo,
  getCompositionDictList,
  getPhotoRecognition
} from "@/api/composition";
import {apiDomain} from "@/configs/env";
import store from '@/store/';
import {tr} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";
import MyMixin from "../../../utils/MyMixin";

export default {
  mixins: [MyMixin],
  data() {
    return {
      mainId: '',
      pageTitle: '作文批改',
      pageIndex: 0,
      btnTitle: '',
      title: {
        isShowTitle: false,
        isShowMore: false,
        isShowPhoto: true,
        isDisabled: false,
        isFocus: false,
      },
      content: {
        isShowContent: true,
        isShowTips: false,
        isShowAddTilte: false,
        isShowPhoto: true,
        isDisabled: false,
        isFocus: false,
      },
      disabledBtn: false,
      otherContent: {
        show: false,
        title: '范文及点评',
        placeholder: '纠错/作文/范文及翻译',
        isDisabled: false,
      },
      // 作文
      essayData: {
        title: '',
        content: '',
        originContent: ``
      },
      essayDataShow: {
        title: '',
        content: `<dev style='line-height: 40px'>`,
      },
      contentLength: 0,
      generateContent: ``,
      originGenerateContent: ``,

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
        title: '',
        content: [],
        val: [],
        activeIndex: 0,
      }],
      compositionType: '',
      infoWordNums: '',
      infoWriteType: '',
      isGenerateContent: false,
      // 用于通过点击分享按钮分享
      shareDataId: '',
      collectionId: '',
      isReturnHome: 0,
    };
  },
  onLoad({title, content, btnTitle,
           generateContent, returnHome,
           pageIndex, pageTitle, compositionType,
           infoWordNums, infoWriteType, id, isShowTitle}) {
    uni.$on("cropImage", ({path, type}) => {
      this.getPhotoRecognition(path, type)
    })

    this.pageTitle = pageTitle;
    this.pageIndex = pageIndex;
    this.mainId = id;
    this.essayData.title = title || '';
    this.essayDataShow.title = title || '';
    this.essayData.content = content || '';
    this.essayData.originContent = content || '';
    this.essayDataShow.content = content || '';
    this.generateContent = generateContent || '';
    this.compositionType = compositionType || '';
    this.infoWordNums = infoWordNums || '';
    this.infoWriteType = infoWriteType || '';
    console.log('title', title, 'content', content, 'generateContent', generateContent, 'pageIndex', pageIndex, 'pageTitle', pageTitle)
    if (pageIndex == 0) {
      if (pageTitle === '作文批改') {
        this.title.isShowTitle = false;
        this.content.isShowContent = true;
        this.content.isShowAddTilte = true;
        this.otherContent.show = false;
        this.btnTitle = 'AI作文批改';
      } else if (pageTitle === 'AI作文批改') {
        var essayDataContent = uni.getStorageSync("essayDataContent")
        this.essayData.content = essayDataContent.replaceAll("\n", "<p></p>")
        this.essayData.originContent = essayDataContent || '';

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
        var essayDataTitle = uni.getStorageSync("essayDataTitle")
        this.essayData.title = essayDataTitle || ''

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
      this.$set(this.essayData, 'title', uni.getStorageSync("compositionTitleText"))
      if (pageTitle === '作文挑战进行时') {
        this.title.isShowTitle = true;
        this.title.isShowPhoto = false;
        this.title.isDisabled = true;
        this.content.isShowContent = true;
        if (btnTitle) {
          this.btnTitle = btnTitle
        } else {
          this.btnTitle = '智能批改';
        }
        this.isReturnHome = returnHome || 0;
      } else if (pageTitle === 'AI作文批改') {
        var essayDataContent = uni.getStorageSync("essayDataContent")
        this.essayData.content = essayDataContent || ''
        this.essayData.originContent = essayDataContent || '';

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
      this.title.isShowTitle = this.essayData.title != '';
      this.title.isShowPhoto = false;
      this.title.isDisabled = true;
      this.content.isShowContent = true;
      this.content.isShowPhoto = false;
      this.content.isDisabled = true;
      this.otherContent.show = true;
      this.otherContent.isDisabled = true;
      this.btnTitle = '分享';
      this.collectionId = id;
      var generateContent = uni.getStorageSync("compositionCorrect");
      this.originGenerateContent = generateContent
      this.generateContent = generateContent
    } else if (pageIndex == 6 || pageIndex == 7) {
      this.title.isShowTitle = isShowTitle == 1;
      this.title.isShowPhoto = false;
      this.title.isDisabled = true;
      this.content.isShowContent = true;
      this.content.isShowPhoto = false;
      this.content.isDisabled = true;
      this.otherContent.show = true;
      this.otherContent.isDisabled = true;
      this.pageTitle = pageTitle;
      this.btnTitle = '分享';
      this.collectionId = id;
      this.isReturnHome = pageIndex == 6 ? 1 : 0;
      this.network().getCompositionCollectInfo(id)
    }

    this.network().getCompositionDictList('student_type')
    this.network().getCompositionDictList('composition_text_wordnum')
    // this.network().getCompositionDictList('composition_context_type')
  },
  // 页面销毁
  onUnload() {
    uni.$off('cropImage')
  },
  watch: {
    'essayData.content': {
      handler(val) {
        if (val.match(/[a-zA-Z]+/g)) {
          this.contentLength = val.match(/[a-zA-Z]+/g).length; // 计算单词数量并赋值给 contentLength
        }
      },
      deep: true
    }
  },

  onShareAppMessage(res) {
    console.log(res)
    var isShowTitle = 0;
    if (this.pageIndex == 2 || this.pageIndex == 5 ) {
      isShowTitle = 1
    }
    if (res.from === "button") {
      const SRC = `pages/composition/new/titleSubject?`;
      const path = `pageIndex=6&id=${this.collectionId}&pageTilte=${this.pageTitle}&isShowTitle=${isShowTitle}`;
      // 来自页面内分享按钮
      return {
        title: this.pageTitle,
        path: `${SRC}${path}`,
        // imageUrl: `${this.imgDomain}wxapp/icon1.1/pic_visit.png`,
      };
    }
  },
  methods: {
    copyContent(content) {
      uni.setClipboardData({
        data: content,
        success: function () {
          uni.showToast({
            title: '复制成功',
            icon: 'none'
          })
        }
      })
    },
    focus_input(type) {
      setTimeout(() => {
        if (type == 'title') {
          this.title.isFocus = true
        } else if (type == 'content') {
          this.content.isFocus = true
        }
      }, 100)
    },
    blur_input(type) {
      setTimeout(() => {
        if (type == 'title') {
          this.title.isFocus = false
        } else if (type == 'content') {
          this.content.isFocus = false
        }
      }, 100)
    },
    click_input(type) {
      if (type == 'title') {
        this.title.isFocus = true
        console.log('title', this.title.isFocus)
      } else if (type == 'content') {
        this.content.isFocus = true
        console.log('content', this.content.isFocus)
      }
    },
    clickAddTitle() {
      this.title.isShowTitle = true
      this.content.isShowAddTilte = false
    },
    inputTextarea(type, e) {
      console.log(e)
      // 获取输入内容
      const inputValue = e.detail.value;
      // 判断是否含有换行符
      if (inputValue.includes('\n')) {
        // 执行换行相关的操作
        console.log('用户输入了换行');
      }
      if (type == 'title') {
        this.essayData.title = inputValue
      } else if (type == 'content') {
        this.essayData.content = inputValue
      }
      this.pageScrollTo()
    },
    pageScrollTo() {
      uni.createSelectorQuery().select('.body').boundingClientRect(data => {
        if (data) {
          uni.pageScrollTo({
            scrollTop: data.height
          })
        }
      }).exec();
    },
    clickPopupContent(parentIndex, index) {
      this.popupContnet[parentIndex].activeIndex = index;
    },
    clickBtn() {
      if (this.btnTitle == '分享') {
        uni.share
        return;
      }
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
          uni.setStorageSync("essayDataContent", this.essayData.content)
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=${this.pageIndex}&pageTitle=AI作文批改&title=${this.essayData.title}&generateContent=${this.generateContent}`);
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
          // let infoWriteType = this.popupContnet[2].val[this.popupContnet[2].activeIndex]
          let infoWriteType = "";
          uni.setStorageSync("essayDataTitle", this.essayData.title)
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=2&pageTitle=AI作文帮写&compositionType=${compositionType}&infoWordNums=${infoWordNums}&infoWriteType=${infoWriteType}`)
          break;
        case "4":
          if (this.pageTitle == '作文挑战进行时') {
            if (this.essayData.content == '') {
              uni.showToast({
                title: '请输入作文内容',
                mask: true,
                icon: 'none'
              })
              return;
            }
          }
          uni.setStorageSync("essayDataContent", this.essayData.content)
          this.$navigateTo(`/pages/composition/new/titleSubject?pageIndex=4&pageTitle=AI作文批改&title=${this.essayData.title}&generateContent=${this.generateContent}&id=${this.mainId}&compositionType=${this.compositionType}`);
          break;
      }
    },
    chooseImage() {
      return new Promise(resolve => {
        uni.chooseMedia({
          count: 1,
          mediaType: ['image'],
          success: (res) => {
            console.log(res)
            resolve(res.tempFiles[0].tempFilePath)
          }
        })
      })
    },
    photograph(type) {
      uni.navigateTo({
        url: `/pages/scan-frame/scan-frame?type=${type}`
      })
    },
    getPhotoRecognition(tempFilePath, type) {
      var _this = this;
      uni.uploadFile({
        url: `https://wapi-dev.aien.xiaolixb.com/v1/ocr/record/serviceByFile`,
        filePath: tempFilePath,
        name: 'imageFile',
        header: {
          'X-Access-Token': store.state.token,
        },
        success: (uploadFileRes) => {
          var data = JSON.parse(uploadFileRes.data)
          console.log(data)
          switch (type) {
            case 'title':
              _this.essayData.title = data.result
              _this.essayDataShow.title = data.result
              break;
            case 'content':
              _this.essayData.content = data.result
              _this.essayDataShow.content = data.result
              break;
            case 'generateContent':
              _this.generateContent = data.result
              break;
          }
        },
        fail: (err) => {
        }
      })
    },
    network() {
      return {
        getCompositionCollectInfo: async (id) => {
          let data = await getCompositionCollectInfo({id});
          console.log("查看详情", data.data.result)
          this.essayData.title = data.data.result.compositionTitleText.replaceAll("\n", "<p></p>")
          this.essayData.content = data.data.result.compositionText.replaceAll("\n", "<p></p>")
          this.originGenerateContent = data.data.result.compositionCorrect
          var generateContent = data.data.result.compositionCorrect.replaceAll("\n", "<p></p>")
            /*.replaceAll("(1)、精美句子","<span style='color: #317cf2;line-height: 28px;'>(1)、精美句子</span>")
            .replaceAll("(2)、句型学习","<span style='color: #317cf2;line-height: 28px;'>(2)、句型学习</span>")
            .replaceAll("(3)、总结和评分","<span style='color: #317cf2;line-height: 28px;'>(3)、总结和评分</span>")
            .replaceAll("(4)、范文翻译","<span style='color: #317cf2;line-height: 28px;'>(4)、范文翻译</span>")
            .replaceAll("(1)、单词纠错","<span style='color: #317cf2;line-height: 28px;'>(1)、单词纠错</span>")
        .replaceAll("(2)、句子纠错","<span style='color: #317cf2;line-height: 28px;'>(2)、句子纠错</span>")
        .replaceAll("(3)、范文翻译","<span style='color: #317cf2;line-height: 28px;'>(3)、范文翻译</span>")
        .replaceAll("(4)、作文优点","<span style='color: #317cf2;line-height: 28px;'>(4)、作文优点</span>")
        .replaceAll("(5)、作文不足","<span style='color: #317cf2;line-height: 28px;'>(5)、作文不足</span>")
        .replaceAll("(6)、总结和评分","<span style='color: #317cf2;line-height: 28px;'>(6)、总结和评分</span>")
        .replaceAll("(7)、改进建议","<span style='color: #317cf2;line-height: 28px;'>(7)、改进建议</span>")
        .replaceAll("(8)、开放性思考","<span style='color: #317cf2;line-height: 28px;'>(8)、开放性思考</span>")
        .replaceAll("(9)、参考范文","<span style='color: #317cf2;line-height: 28px;'>(9)、参考范文</span>")
        .replaceAll("(10)、范文翻译","<span style='color: #317cf2;line-height: 28px;'>(10)、范文翻译</span>")*/
          this.generateContent = generateContent

        },
        addCompositionCollect: async (params) => {
          if (!params.compositionType) {
            params.compositionType = 501
          }
          let data = await addCompositionCollect(params);
          this.collectionId = data.data.result.id
        },
        getCompositionDictList: async (type) => {
          var result = uni.getStorageSync("basicData").dictCodeList;

          switch (type) {
            case 'student_type':
              result.student_type.forEach(d => {
                this.popupContnet[0].content.push(d.text)
                this.popupContnet[0].val.push(d.value)
              })
              break;
            case 'composition_text_wordnum':
              result.composition_text_wordnum.forEach(d => {
                this.popupContnet[1].content.push(d.text)
                this.popupContnet[1].val.push(d.value)
              })
              break;
            case 'composition_context_type':
              result.composition_context_type.forEach(d => {
                this.popupContnet[2].content.push(d.text)
                this.popupContnet[2].val.push(d.value)
              })
              break;
          }
        },
        sseRequestTask: async ({url, data, method = 'POST', type}) => {
          console.log("store.state.token", store.state.token)
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
              // text = text.replaceAll("data:\n", "data:")
              let arr = text.split('\n')
              arr.forEach((item) => {

                if (item.includes('data:') && !item.includes('[DONE]')) {
                  let text = item.replace('data:', '')
                  console.log(text)
                  text = text.replaceAll("「`」", " ").replaceAll("「·」", "<p></p>").replaceAll("「~」", "<p></p>")

                  if (type == 'content') {
                    this.essayData.content += text
                  } else if (type == 'generateContent') {
                    this.generateContent += text
                  }
                  this.pageScrollTo()
                } else if (item.includes('data:[DONE]')) {
                  this.essayData.originContent = this.essayData.content.replaceAll("<p></p>", "\n")

                  if (!this.generateSuccess && type == 'content') {
                    this.network().getAIGCComment('generateContent')
                    this.generateSuccess = true
                  }

                  if (this.pageTitle != 'AI作文帮写' || this.generateSuccess) {
                    uni.hideLoading()
                    if (this.pageTitle != 'AI作文帮写') {
                      this.disabledBtn = false
                    }
                  }
                  if (type == 'generateContent') {
                    this.disabledBtn = false
                    // 收藏
                    this.$nextTick(() => {
                      // 保留原始，未加html标签的内容
                      this.originGenerateContent = this.generateContent.replaceAll("<p></p>", "\n")

                      var params = {
                        "compositionLibraryId": this.mainId,
                        "compositionTitleText": this.essayData.title || '',
                        "compositionText": this.essayData.originContent,
                        // "compositionType": "501",
                        "compositionCorrect": this.originGenerateContent
                      }
                      if (this.pageTitle === 'AI作文批改') {
                        params.compositionFavoritesSource = 2
                        if (this.pageIndex == 4) {
                          params.compositionFavoritesSource = 3
                          params.compositionType = this.compositionType
                        }
                      } else if (this.pageTitle === 'AI作文帮写') {
                        params.compositionFavoritesSource = 1
                      }
                      this.network().addCompositionCollect(params)

                      /*this.generateContent = this.generateContent
                        .replaceAll("(1)、精美句子","<span style='color: #317cf2;line-height: 28px;'>(1)、精美句子</span>")
                        .replaceAll("(2)、句型学习","<span style='color: #317cf2;line-height: 28px;'>(2)、句型学习</span>")
                        .replaceAll("(3)、总结和评分","<span style='color: #317cf2;line-height: 28px;'>(3)、总结和评分</span>")
                        .replaceAll("(4)、范文翻译","<span style='color: #317cf2;line-height: 28px;'>(4)、范文翻译</span>")
                        .replaceAll("(1)、单词纠错","<span style='color: #317cf2;line-height: 28px;'>(1)、单词纠错</span>")
        .replaceAll("(2)、句子纠错","<span style='color: #317cf2;line-height: 28px;'>(2)、句子纠错</span>")
        .replaceAll("(3)、范文翻译","<span style='color: #317cf2;line-height: 28px;'>(3)、范文翻译</span>")
        .replaceAll("(4)、作文优点","<span style='color: #317cf2;line-height: 28px;'>(4)、作文优点</span>")
        .replaceAll("(5)、作文不足","<span style='color: #317cf2;line-height: 28px;'>(5)、作文不足</span>")
        .replaceAll("(6)、总结和评分","<span style='color: #317cf2;line-height: 28px;'>(6)、总结和评分</span>")
        .replaceAll("(7)、改进建议","<span style='color: #317cf2;line-height: 28px;'>(7)、改进建议</span>")
        .replaceAll("(8)、开放性思考","<span style='color: #317cf2;line-height: 28px;'>(8)、开放性思考</span>")
        .replaceAll("(9)、参考范文","<span style='color: #317cf2;line-height: 28px;'>(9)、参考范文</span>")
        .replaceAll("(10)、范文翻译","<span style='color: #317cf2;line-height: 28px;'>(10)、范文翻译</span>")*/

                      this.generateContent = `<span style=''>` + this.generateContent + `</span>`
                      console.log(this.generateContent)
                    })

                  }

                  // 关闭请求
                  requestTask.abort()
                } else {
                  requestTask.abort
                }
              })
            })
          })
        },
        getAIGCCorrection: async (type) => {
          this.$nextTick(() => {
            // 作文批改
            var params = {
              "compositionTitleText": this.essayData.title,
              "compositionText": this.essayData.content
            }
            this.network().sseRequestTask({
              url: '/composition/aigc/correct',
              method: 'post',
              data: params,
              type
            })
          })
        },
        getAIGCWrite: async (type) => {
          this.$nextTick(() => {
            var params = {
              "compositionTitleText": this.essayData.title,
              "compositionType": this.compositionType,
              "infoWordNum": this.infoWordNums/*,
              "infoWriteType": this.infoWriteType*/
            }
            this.network().sseRequestTask({
              url: '/composition/aigc/text',
              method: 'post',
              data: params,
              type
            })
          })
        },
        getAIGCComment: async (type) => {
          let params = {
            "compositionTitleText": this.essayData.title,
            "compositionText": this.essayData.content
          }
          this.network().sseRequestTask({
            url: '/composition/aigc/review',
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

.challenge-title {
  width: 670rpx;
  border-radius: 20rpx;
  background: #FAF1EC;

  image {
    width: 70rpx;
  }
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
  height: 700rpx;
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
}

</style>
