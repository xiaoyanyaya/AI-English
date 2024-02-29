<template>
  <view class="pb-5 main-bg">
    <cy-navbar showBack>
      <view class="t-size-30">{{ pageTitle }}</view>
    </cy-navbar>

    <view class="px-4">
      <view v-if="pageIndex<3"
            class="mt-4 desc-box flex align-item-center justify-content-between pr-1 border-box t-size-26">
        <view v-for="(item, index) in descData" :key="index" class="ml-2">
          <text class="t-color-3D3D3D">{{ item.title }}:</text>
          <text class="t-color-8A8A8A" style="margin-left: 10rpx;">{{ item.value }}</text>
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
<!--        <view v-if="pageIndex==3" class="flex align-item-center">
          <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
          <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
          <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
        </view>-->
      </view>
      <view class="ai-title-box mt-2">
        <u-input v-model="essayData.title"
                 placeholder="请输入作文题目"
                 :type="'textarea'" :border="false"
                 :height="500" :auto-height="false"/>
      </view>

      <view class="mt-5 font-weight-bold t-size-36 flex align-item-center justify-content-between">
        <view class="flex">
          <view class="font-weight-bold t-size-36">
            {{ pageIndex==5 ? 'AI作文范文' : '作文内容' }}
          </view>
          <view v-if="pageIndex<4" class="flex align-item-center">
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
          </view>
        </view>
        <view class="t-color-8A8A8A t-size-24">
          已输入20个单词
        </view>
      </view>
      <view class="ai-title-box mt-2">
        <u-input v-model="essayData.title"
                 placeholder="请输入/拍照/导入/粘贴作文内容"
                 :type="'textarea'" :border="false"
                 :height="500" :auto-height="false"/>
      </view>

      <view v-if="pageIndex > 3">
        <view class="mt-5 font-weight-bold t-size-36 flex align-item-center">
          <view class="font-weight-bold t-size-36">
            {{ pageIndex==5 ? 'AI作文评审' : 'AI作文批改' }}
          </view>
          <view v-if="pageIndex==6" class="flex align-item-center">
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
            <view class="iconfont t-color-1863E5 essay-title-icon">&#xe63e;</view>
          </view>
        </view>
        <view class="ai-review-box mt-2">
          <u-input v-model="essayData.title"
                   placeholder="请输入作文题目"
                   :type="'textarea'" :border="false"
                   :height="700" :auto-height="false"/>
        </view>
      </view>

      <view class="btns-box flex justify-content-around mt-5" v-if="pageIndex<4">
        <view class="ai-item-1 flex align-item-center justify-content-center" @click="toPage(4)">
          AI作文批改
        </view>
        <view class="ai-item-2 flex align-item-center justify-content-center" @click="toPage(4)">
          AI作文帮写
        </view>
      </view>
      <view class="collect-btn mt-5 flex align-item-center justify-content-center" v-if="pageIndex>3">
        <text class="t-color-fff">收藏</text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 0,
      pageTitle: 'AI英语中考作文-作文题目',
      descData: [],

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
      }
    };
  },
  onLoad({index}) {
    this.pageIndex = index;
    if (index == 0 || index == 1) {
      this.pageTitle = 'AI英语中考作文-作文题目';
      this.descData = [{
        title: '年份',
        value: '2023年'
      }, {
        title: '年级',
        value: '初三'
      }, {
        title: '省份',
        value: '广东省'
      }, {
        title: '城市',
        value: '中山市'
      }]
      if (index == 0) {
        this.pageTitle = 'AI英语中考作文-作文题目';
      } else if (index == 1) {
        this.pageTitle = 'AI英语高考作文-作文题目';
      }
    } else if (index == 2) {
      this.pageTitle = 'AI英语教材作文-作文题目';
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
      this.pageTitle = 'AI英语作文训练-作文题目';
    } else if (index == 4) {
      this.pageTitle = 'AI英语作文-AI作文批改';
    } else if (index == 5) {
      this.pageTitle = 'AI英语作文-AI作文帮写';
    }
  },
  methods: {
    toPage(index) {
      this.$navigateTo(`/pages/composition/titleSubject?index=${index}`);
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
}

.grade {
  width: 150rpx;
  height: 70rpx;
  border-radius: 10rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 2rpx solid #AAC9FF;
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
</style>
